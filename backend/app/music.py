import requests
import os
from dotenv import load_dotenv

load_dotenv()

JAMENDO_CLIENT_ID = os.getenv("JAMENDO_CLIENT_ID")

MOOD_TAGS = {
    "happy": "pop",
    "sad": "acoustic",
    "relax": "chillout",
    "angry": "rock",
    "romantic": "love",
    "study": "instrumental",
    "party": "dance"
}


def get_music_by_mood(mood: str):
    tag = MOOD_TAGS.get(mood.lower(), "pop")

    print("Mood:", mood)
    print("Using tag:", tag)
    print("Jamendo Client ID:", JAMENDO_CLIENT_ID)

    url = "https://api.jamendo.com/v3.0/tracks/"

    params = {
        "client_id": JAMENDO_CLIENT_ID,
        "format": "json",
        "limit": 10,
        "fuzzytags": tag,
        "audioformat": "mp32",
        "order": "popularity_total"
    }

    response = requests.get(url, params=params)
    data = response.json()

    print("Jamendo Response:", data)

    tracks = []

    for item in data.get("results", []):
        if item.get("audio"):
            tracks.append({
                "track_name": item.get("name"),
                "artist_name": item.get("artist_name"),
                "audio_url": item.get("audio"),
                "image_url": item.get("album_image"),
                "tag_used": tag
            })

    return tracks