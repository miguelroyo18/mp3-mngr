from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from downloader import Downloader
from invidious import Invidious

import os


app = Flask(__name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'media', 'tmp')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)


@app.route('/api/media/<path:filename>')
def serve_audio(filename):
    try:
        response = send_from_directory(app.config['UPLOAD_FOLDER'], filename)
        response.headers['Content-Type'] = 'audio/mpeg'
        response.headers['Content-Disposition'] = 'inline'
        response.headers['Content-Security-Policy'] = "default-src 'self'; media-src 'self';"
        return response
    except FileNotFoundError:
        abort(404)

@app.route('/api/search_track', methods=['GET'])
def search_track():
    search_query = request.args.get('query', '')
    try:
        results = invidious.search_track(search_query)
        return results
    except request.RequestException as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/download_track', methods=['POST'])
def download_track():
    data = request.get_json()
    track_id = data.get('track_id', '')
    downloader.download(track_id) # TODO: Catch possible exceptions here
    return jsonify({"message": "Download started"})


@app.route('/api/update_dir', methods=['POST'])
def update_dir():
    data = request.get_json()
    new_dir = data.get('dir', '')
    invidious.update_path(new_dir) # TODO: Catch possible exceptions here
    return jsonify({"message": "Directory updated"})


if __name__ == "__main__":
    downloader = Downloader()
    invidious = Invidious()
    app.run(host='0.0.0.0', port=5001, debug=True)
