from flask import Flask, jsonify, request, g
from flask import Flask, jsonify, g
from flask_cors import CORS
import os
import sqlite3

app = Flask(__name__)
CORS(app)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
print(BASE_DIR)
DATABASE = os.path.join(BASE_DIR, 'events.db')
print(DATABASE)

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Fetch individual event by ID
@app.route('/event/<string:event_id>', methods=['GET'])
def get_event(event_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    event = cursor.fetchone()
    
    if event:
        columns = [column[0] for column in cursor.description]
        event_data = dict(zip(columns, event))
        return jsonify(event_data)
    else:
        return jsonify({"error": "Event not found"}), 404

# Fetch JSON list of events for card view
@app.route('/event_search', defaults={'title': None}, methods=['GET'])
@app.route('/event_search/<string:title>', methods=['GET'])
def search_events_by_title(title):
    db = get_db()
    cursor = db.cursor()
    
    if title:
        query = "SELECT id, title, image_url, preview, date_time, tags FROM events WHERE title LIKE ?"
        cursor.execute(query, (f"%{title}%",))
    else:
        query = "SELECT id, title, image_url, preview, date_time, tags FROM events"
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


@app.route('/calendar_list/<string:ids>', methods=['GET'])
def get_calendar_list(ids):
    db = get_db()
    cursor = db.cursor()
    ids_list = ids.split('+')
    
    placeholders = ','.join('?' for _ in ids_list)
    query = f"SELECT id, title, date_time FROM events WHERE id IN ({placeholders})"
    
    cursor.execute(query, ids_list)
    events = cursor.fetchall()

    events_list = [
        {
            "id": event[0],        
            "title": event[1],
            "date_time": event[2],
        }
        for event in events
    ]
    return jsonify(events_list)


if __name__ == '__main__':
    app.run(debug=True)
