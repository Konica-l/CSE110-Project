from flask import Flask, jsonify, g
from flask_cors import CORS
import os
import sqlite3

app = Flask(__name__)
CORS(app)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EVENTS_DB = os.path.join(BASE_DIR, 'events.db')
CUSTOMERS_DB = os.path.join(BASE_DIR, 'customers.db')

# Database connection functions
def get_db_events():
    db = getattr(g, '_events_database', None)
    if db is None:
        db = g._events_database = sqlite3.connect(EVENTS_DB)
    return db

def get_db_customers():
    db = getattr(g, '_customers_database', None)
    if db is None:
        db = g._customers_database = sqlite3.connect(CUSTOMERS_DB)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connections(exception):
    events_db = getattr(g, '_events_database', None)
    customers_db = getattr(g, '_customers_database', None)
    if events_db is not None:
        events_db.close()
    if customers_db is not None:
        customers_db.close()

# Routes for events
@app.route('/event/<string:event_id>', methods=['GET'])
def get_event(event_id):
    db = get_db_events()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    event = cursor.fetchone()
    if event:
        columns = [column[0] for column in cursor.description]
        event_data = dict(zip(columns, event))
        return jsonify(event_data)
    else:
        return jsonify({"error": "Event not found"}), 404

@app.route('/event/search', defaults={'title': None}, methods=['GET'])
@app.route('/event/search/<string:title>', methods=['GET'])
def search_events_by_title(title):
    db = get_db_events()
    cursor = db.cursor()
    if title:
        query = "SELECT id, title, image_url, preview, date_time, tags FROM events WHERE title LIKE ? ORDER BY start_date"
        cursor.execute(query, (f"%{title}%",))
    else:
        query = "SELECT id, title, image_url, preview, date_time, tags FROM events ORDER BY start_date"
        cursor.execute(query)
    events = cursor.fetchall()
    events_list = [
        {
            "id": event[0],
            "title": event[1],
            "image": event[2],
            "preview": event[3],
            "date_time": event[4],
            "tags": event[5]
        }
        for event in events
    ]
    return jsonify(events_list)

# Routes for customers
@app.route('/customer/<string:customer_id>', methods=['GET'])
def create_customer(customer_id):
    db = get_db_customers()
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO customers (customer_id) VALUES (?)", (customer_id,))
        db.commit()
        return jsonify({"message": f"Customer {customer_id} added successfully"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": f"Customer ID {customer_id} already exists"}), 400

@app.route('/customer/subscribed/new/<string:customer_id>/<string:new_subscribed>', methods=['GET'])
def add_subscribed_event(customer_id, new_subscribed):
    db = get_db_customers()
    cursor = db.cursor()
    cursor.execute("SELECT subscribed_events FROM customers WHERE customer_id = ?", (customer_id,))
    result = cursor.fetchone()
    
    if not result:
        return jsonify({"error": f"Customer ID {customer_id} not found"}), 404
    
    current_events = result['subscribed_events'].split(',') if result['subscribed_events'] else []
    
    if new_subscribed in current_events:
        return jsonify({"message": f"Event {new_subscribed} is already in subscribed_events for customer {customer_id}"}), 200
    
    updated_events = ','.join(current_events + [new_subscribed])
    cursor.execute("UPDATE customers SET subscribed_events = ? WHERE customer_id = ?", (updated_events, customer_id))
    db.commit()
    return jsonify({"message": f"Event {new_subscribed} added to subscribed_events for customer {customer_id}"}), 200

@app.route('/customer/ignored/new/<string:customer_id>/<string:new_ignored>', methods=['GET'])
def add_ignored_event(customer_id, new_ignored):
    db = get_db_customers()
    cursor = db.cursor()
    cursor.execute("SELECT ignored_events FROM customers WHERE customer_id = ?", (customer_id,))
    result = cursor.fetchone()
    
    if not result:
        return jsonify({"error": f"Customer ID {customer_id} not found"}), 404
    
    current_events = result['ignored_events'].split(',') if result['ignored_events'] else []
    
    if new_ignored in current_events:
        return jsonify({"message": f"Event {new_ignored} is already in ignored_events for customer {customer_id}"}), 200
    
    updated_events = ','.join(current_events + [new_ignored])
    cursor.execute("UPDATE customers SET ignored_events = ? WHERE customer_id = ?", (updated_events, customer_id))
    db.commit()
    return jsonify({"message": f"Event {new_ignored} added to ignored_events for customer {customer_id}"}), 200

@app.route('/customer/conflicts/new/<string:customer_id>/<string:new_conflict>', methods=['GET'])
def add_time_conflict(customer_id, new_conflict):
    db = get_db_customers()
    cursor = db.cursor()
    cursor.execute("SELECT time_conflicts FROM customers WHERE customer_id = ?", (customer_id,))
    result = cursor.fetchone()
    
    if not result:
        return jsonify({"error": f"Customer ID {customer_id} not found"}), 404
    
    current_events = result['time_conflicts']
    updated_events = f"{current_events},{new_conflict}" if current_events else new_conflict
    cursor.execute("UPDATE customers SET time_conflicts = ? WHERE customer_id = ?", (updated_events, customer_id))
    db.commit()
    return jsonify({"message": f"Event {new_conflict} added to time_conflicts for customer {customer_id}"}), 200

@app.route('/customer/subscribed/delete/<string:customer_id>/<string:event_id>', methods=['GET'])
def delete_subscribed_event(customer_id, event_id):
    db = get_db_customers()
    cursor = db.cursor()
    cursor.execute("SELECT subscribed_events FROM customers WHERE customer_id = ?", (customer_id,))
    result = cursor.fetchone()
    
    if not result:
        return jsonify({"error": f"Customer ID {customer_id} not found"}), 404
    
    current_events = result['subscribed_events'].split(',') if result['subscribed_events'] else []
    
    if event_id not in current_events:
        return jsonify({"error": f"Event {event_id} not found in subscribed_events"}), 404
    
    updated_events = ','.join([e for e in current_events if e != event_id])
    cursor.execute("UPDATE customers SET subscribed_events = ? WHERE customer_id = ?", (updated_events, customer_id))
    db.commit()
    return jsonify({"message": f"Event {event_id} removed from subscribed_events for customer {customer_id}"}), 200

@app.route('/customer/ignored/delete/<string:customer_id>/<string:event_id>', methods=['GET'])
def delete_ignored_event(customer_id, event_id):
    db = get_db_customers()
    cursor = db.cursor()
    cursor.execute("SELECT ignored_events FROM customers WHERE customer_id = ?", (customer_id,))
    result = cursor.fetchone()
    
    if not result:
        return jsonify({"error": f"Customer ID {customer_id} not found"}), 404
    
    current_events = result['ignored_events'].split(',') if result['ignored_events'] else []
    
    if event_id not in current_events:
        return jsonify({"error": f"Event {event_id} not found in ignored_events"}), 404
    
    updated_events = ','.join([e for e in current_events if e != event_id])
    cursor.execute("UPDATE customers SET ignored_events = ? WHERE customer_id = ?", (updated_events, customer_id))
    db.commit()
    return jsonify({"message": f"Event {event_id} removed from ignored_events for customer {customer_id}"}), 200

@app.route('/customer/conflicts/clear/<string:customer_id>', methods=['GET'])
def clear_time_conflicts(customer_id):
    db = get_db_customers()
    cursor = db.cursor()
    cursor.execute("SELECT time_conflicts FROM customers WHERE customer_id = ?", (customer_id,))
    result = cursor.fetchone()
    
    if not result:
        return jsonify({"error": f"Customer ID {customer_id} not found"}), 404
    
    cursor.execute("UPDATE customers SET time_conflicts = '' WHERE customer_id = ?", (customer_id,))
    db.commit()
    return jsonify({"message": f"All time_conflicts cleared for customer {customer_id}"}), 200

#Combined functionality
@app.route('/customer/available_events/<string:customer_id>', methods=['GET'])
@app.route('/customer/available_events/', methods=['GET'])  # Handle route with no customer_id
def get_available_events(customer_id=None):
    db_customers = get_db_customers()
    db_events = get_db_events()

    if customer_id:
        # Fetch customer data
        cursor = db_customers.cursor()
        cursor.execute("SELECT subscribed_events, ignored_events, time_conflicts FROM customers WHERE customer_id = ?", (customer_id,))
        customer = cursor.fetchone()

        if not customer:
            return jsonify({"error": f"Customer ID {customer_id} not found"}), 404

        subscribed_events = customer['subscribed_events'].split(',') if customer['subscribed_events'] else []
        ignored_events = customer['ignored_events'].split(',') if customer['ignored_events'] else []
        time_conflicts = customer['time_conflicts'].split(',') if customer['time_conflicts'] else []
    else:
        # If no customer_id is provided, treat all filters as empty
        subscribed_events = []
        ignored_events = []
        time_conflicts = []

    # Fetch all events
    cursor = db_events.cursor()
    cursor.execute("SELECT id, title, image_url, preview, date_time, tags, start_minutes, end_minutes FROM events ORDER BY start_date")
    events = cursor.fetchall()

    # Filter events
    available_events = []
    for event in events:
        event_id, title, image_url, preview, date_time, tags, start_minutes, end_minutes = event

        # Skip events that are in subscribed or ignored lists
        if event_id in subscribed_events or event_id in ignored_events:
            continue

        # Skip events that conflict with time ranges
        if(start_minutes):
            event_start = int(start_minutes)
            event_end = int(end_minutes)
        else:
            event_start = -1
            event_end = -1

        conflict_found = False
        for conflict in time_conflicts:
            conflict_start, conflict_end = map(int, conflict.split('-'))
            if event_start < conflict_end and event_end > conflict_start:
                conflict_found = True
                break

        if not conflict_found:
            available_events.append({
                "id": event_id,
                "title": title,
                "image": image_url,
                "preview": preview,
                "date_time": date_time,
                "tags": tags,
                "start_minutes": event_start,
                "end_minutes": event_end
            })

    return jsonify(available_events)

@app.route('/customer/subscribed/<string:customer_id>', methods=['GET'])
def get_subscribed_events(customer_id):
    db_customers = get_db_customers()
    db_events = get_db_events()

    cursor = db_customers.cursor()
    cursor.execute("SELECT subscribed_events FROM customers WHERE customer_id = ?", (customer_id,))
    customer = cursor.fetchone()

    if not customer:
        return jsonify({"error": f"Customer ID {customer_id} not found"}), 404

    subscribed_events = customer['subscribed_events'].split(',') if customer['subscribed_events'] else []

    if not subscribed_events:
        return jsonify({}), 200

    placeholders = ','.join('?' for _ in subscribed_events)
    query = f"SELECT id, title, image_url, preview, date_time, tags FROM events WHERE id IN ({placeholders}) ORDER BY start_date"
    cursor = db_events.cursor()
    cursor.execute(query, subscribed_events)
    events = cursor.fetchall()

    subscribed_events_list = [
        {
            "id": event[0],
            "title": event[1],
            "image": event[2],
            "preview": event[3],
            "date_time": event[4],
            "tags": event[5]
        }
        for event in events
    ]

    return jsonify(subscribed_events_list)

if __name__ == '__main__':
    app.run(debug=True)
