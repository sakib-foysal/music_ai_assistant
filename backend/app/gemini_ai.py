import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

VALID_TAGS = ["pop", "acoustic", "chillout", "rock", "love", "instrumental", "dance"]

def get_music_tag_from_mood(mood: str):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")

        prompt = f"""
        User mood: {mood}
        Choose ONLY ONE tag from this list:
        {", ".join(VALID_TAGS)}
        Return only the tag name.
        """

        response = model.generate_content(prompt)
        tag = response.text.strip().lower()

        if tag not in VALID_TAGS:
            return "pop"

        return tag

    except Exception as e:
        print("Gemini Error:", e)
        return "pop"