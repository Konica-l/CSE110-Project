import sqlite3
import hashlib
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException, StaleElementReferenceException
import time

# Function to generate a unique ID based on event title and date_time
def generate_event_id(title, date_time):
    unique_string = f"{title}_{date_time}"
    return hashlib.md5(unique_string.encode()).hexdigest()

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
        time.sleep(0.5)

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
        time.sleep(1)  # Wait for the main list to be visible again

    except (NoSuchElementException, TimeoutException, StaleElementReferenceException):
        print("No event details")

# Extract information for each event
for index in range(len(events)):
    extract(index)

# Delete events from the database that are no longer present on the website
cursor.execute("SELECT id FROM events")
db_events = {row[0] for row in cursor.fetchall()}

# Delete any event in the database not found in the current events on the website
for db_event_id in db_events - current_events:
    cursor.execute("DELETE FROM events WHERE id = ?", (db_event_id,))
conn.commit()

# Closing
driver.quit()
conn.close()
print("Data scraped")