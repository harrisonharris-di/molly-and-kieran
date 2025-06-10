# backend/app.py
from flask import Flask, request, jsonify
import redis

app = Flask(__name__)
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

@app.route('/api/search')
def search():
    name_query = request.args.get('name', '').lower()
    all_keys = r.keys('*')
    matches = [key for key in all_keys if name_query in key.lower()]
    return jsonify(matches)

@app.route('/api/rsvp', methods=['POST'])
def rsvp():
    data = request.get_json()
    name = data.get('name')
    if name and r.exists(name):
        r.hset(name, 'rsvp', 'yes')
        return '', 204
    return 'Name not found', 404
