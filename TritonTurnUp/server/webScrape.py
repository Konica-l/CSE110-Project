import sqlite3
import hashlib
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException, StaleElementReferenceException
import time
import re
from datetime import datetime
from datetime import datetime as dt, timedelta

# Function to generate a unique ID based on event title and date_time
def generate_event_id(title, date_time):
    unique_string = f"{title}_{date_time}"
    return hashlib.md5(unique_string.encode()).hexdigest()

def remove_ordinal_suffix(date_str):
    return re.sub(r'(\d+)(st|nd|rd|th)', r'\1', date_str)

# Create database
conn = sqlite3.connect('events.db')
cursor = conn.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT,
        date_time TEXT,
        preview TEXT,
        tags TEXT,
        location TEXT,
        description TEXT,
        image_url TEXT
    )
''')
conn.commit()

# Generate URL for tockify
current_timestamp_ms = int(time.time() * 1000)
url = f"https://tockify.com/ucenevents/pinboard?startms={current_timestamp_ms}"

driver = webdriver.Chrome()
driver.get(url)

# Wait for page load
try:
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "div.cardBoard__card"))
    )
except TimeoutException:
    driver.quit()
    conn.close()
    exit()

# Load all events on page
while True:
    try:
        load_button = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-loadMore"))
        )
        load_button.click()
        time.sleep(1)  # Allow time for new events to load
    except (TimeoutException, NoSuchElementException):
        break

# Create list of all events
events = driver.find_elements(By.CSS_SELECTOR, "div.cardBoard__card")

# Track events found on the website to compare with database records
current_events = set()

# Function to click on each card and extract details
def extract(event_index):
    try:
        # Locate event by index
        cards = driver.find_elements(By.CSS_SELECTOR, "div.cardBoard__card")
        card = cards[event_index]

        # Get preview text
        try:
            preview_element = card.find_element(By.CSS_SELECTOR, "div.d-text.d-text--preview.pincard__main__preview")
            preview = preview_element.text.strip()
        except NoSuchElementException:
            preview = "No preview available"

        # Click the card
        card.click()
        time.sleep(0.8)

        # Wait for expanded view to load
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.eventDetail"))
        )
        
        # Extract text
        title = driver.find_element(By.CSS_SELECTOR, "h1.d-headerText").text.strip()
        date_time = driver.find_element(By.CSS_SELECTOR, "div.d-when").text.strip()
        tags = ", ".join(tag.text for tag in driver.find_elements(By.CSS_SELECTOR, "span.eventTags__text"))
        location = driver.find_element(By.CSS_SELECTOR, "div.d-where").text.strip()
        description = driver.find_element(By.CSS_SELECTOR, "div.eventDetail__what__description").text.strip()
        
        # Generate a unique ID
        event_id = generate_event_id(title, date_time)

        # Track event by ID
        current_events.add(event_id)

        # Extract image URL
        try:
            image_element = driver.find_element(By.CSS_SELECTOR, "div.eventDetail img")
            image_url = (
                image_element.get_attribute("data-pin-media") or
                image_element.get_attribute("tk-src") or
                image_element.get_attribute("src")
            )

            # Add https: for convenience (Easier to input)
            if image_url and image_url.startswith("//"):
                image_url = "https:" + image_url

        except NoSuchElementException:
            image_url = None  # No image has null value

        # Make sure there's only one entry for each event
        cursor.execute("SELECT id FROM events WHERE id = ?", (event_id,))
        existing_event = cursor.fetchone() # Points towards row that has event_id (If it exists)
        
        if existing_event:
            # Update row
            cursor.execute('''
                UPDATE events SET title = ?, date_time = ?, preview = ?, tags = ?, location = ?, description = ?, image_url = ?
                WHERE id = ?
            ''', (title, date_time, preview, tags, location, description, image_url, event_id))
        else:
            # Insert new event record
            cursor.execute('''
                INSERT INTO events (id, title, date_time, preview, tags, location, description, image_url)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (event_id, title, date_time, preview, tags, location, description, image_url))
        conn.commit()

        # Return to the previous page
        driver.back()
        time.sleep(1.2)  # Wait for the main list to be visible again

    except (NoSuchElementException, TimeoutException, StaleElementReferenceException):
        print("No event details")

# Extract information for each event
for index in range(len(events)):
    extract(index)

# Delete events from the database that are no longer present on the website
cursor.execute("SELECT id FROM events")
db_events = {row[0] for row in cursor.fetchall()}

# Valid formats
valid_date_time_pattern = re.compile(
    r'^((Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+[A-Z][a-z]{2}\s+\d{1,2}(st|nd|rd|th)\s+\d{1,2}:\d{2}(am|pm)\s+-\s+\d{1,2}:\d{2}(am|pm))|'  # Format 1: Single day
    r'((Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+[A-Z][a-z]{2}\s+\d{1,2}(st|nd|rd|th)\s+\d{1,2}:\d{2}(am|pm)\s+-\s+(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\d{1,2}(st|nd|rd|th)\s+\d{1,2}:\d{2}(am|pm))$'  # Format 2: Multi-day
)

# Delete rows with invalid date_time format
cursor.execute("SELECT id, date_time FROM events")
events_to_check = cursor.fetchall()

for event_id, date_time in events_to_check:
    if not valid_date_time_pattern.match(date_time):
        cursor.execute("DELETE FROM events WHERE id = ?", (event_id,))
        print(f"Deleted event with invalid date_time: {event_id}, {date_time}")

# Ensure the database has the new columns
cursor.execute("ALTER TABLE events ADD COLUMN start_date INTEGER DEFAULT NULL")
cursor.execute("ALTER TABLE events ADD COLUMN end_date INTEGER DEFAULT NULL")
conn.commit()

# Process all rows to calculate and update start_date and end_date
cursor.execute("SELECT id, date_time FROM events")
rows = cursor.fetchall()

for row in rows:
    event_id, date_time = row
    try:
        current_year = datetime.now().year

        if " - " in date_time:
            start_date, end_date = map(str.strip, date_time.split(" - ", 1))

            month = start_date[4:7]
            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            current_month_index = months.index(month)

            if any(day in end_date for day in ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]):
                start_date_number = int(re.search(r'\d+', start_date).group())
                end_date_number = int(re.search(r'\d+', end_date).group())
                if end_date_number > start_date_number:
                    end_date = end_date[:4] + month + " " + end_date[4:]
                else:
                    next_month_index = (current_month_index + 1) % 12
                    next_month = months[next_month_index]
                    end_date = end_date[:4] + next_month + " " + end_date[4:]
            else:
                match = re.match(r'(.*?\d+(st|nd|rd|th))', start_date)
                if match:
                    base_date = match.group(1)
                    end_date = f"{base_date} {end_date}"
        else:
            start_date = date_time.strip() + ' 12:00am'
            end_date = date_time.strip() + ' 11:59pm'

        start_date = remove_ordinal_suffix(start_date)
        end_date = remove_ordinal_suffix(end_date)

        start_date = f"{start_date} {current_year}"
        end_date = f"{end_date} {current_year}"

        date_format = "%a %b %d %I:%M%p %Y"
        start_timestamp = int(datetime.strptime(start_date, date_format).timestamp())
        end_timestamp = int(datetime.strptime(end_date, date_format).timestamp())

        # Update the database with calculated timestamps
        cursor.execute("""
            UPDATE events SET start_date = ?, end_date = ? WHERE id = ?
        """, (start_timestamp, end_timestamp, event_id))
    except Exception as e:
        print(f"Error processing event {event_id}: {e}")

conn.commit()

# Add new columns for relative time in minutes from the start of the week
cursor.execute("ALTER TABLE events ADD COLUMN start_minutes INTEGER DEFAULT NULL")
cursor.execute("ALTER TABLE events ADD COLUMN end_minutes INTEGER DEFAULT NULL")
conn.commit()

# Function to calculate minutes from the start of the week
def calculate_minutes_from_week_start(unix_timestamp):
    event_time = dt.fromtimestamp(unix_timestamp)
    start_of_week = event_time - timedelta(days=event_time.weekday(), hours=event_time.hour, minutes=event_time.minute, seconds=event_time.second, microseconds=event_time.microsecond)
    minutes_from_start = int((event_time - start_of_week).total_seconds() / 60)
    return minutes_from_start

# Process all rows to calculate and update start_minutes and end_minutes
cursor.execute("SELECT id, start_date, end_date FROM events")
rows = cursor.fetchall()

for row in rows:
    event_id, start_date, end_date = row
    try:
        if start_date and end_date:
            start_minutes = calculate_minutes_from_week_start(start_date)
            end_minutes = calculate_minutes_from_week_start(end_date)

            # Update the database with calculated minutes
            cursor.execute("""
                UPDATE events SET start_minutes = ?, end_minutes = ? WHERE id = ?
            """, (start_minutes, end_minutes, event_id))
    except Exception as e:
        print(f"Error processing event {event_id}: {e}")

conn.commit()

# Closing
driver.quit()
conn.close()
print("Data scraped")
