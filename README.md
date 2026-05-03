# 🎧 Music AI Assistant

A modern **Mood-Based Music Recommendation System** built using **FastAPI + React + MySQL + Jamendo API**.

Users can sign up, log in, select their mood, and instantly get music recommendations with a built-in audio player.

---

## 🚀 Features

- 🔐 User Authentication (Signup & Login)
- 🎭 Mood-Based Music Recommendation
- 🎵 Built-in Music Player
- 📜 Listening History Tracking
- 🎨 Modern Responsive UI
- ⚡ FastAPI Backend + React Frontend

---

## 🧠 How It Works

1. User logs in  
2. Selects a mood (happy, sad, relax, etc.)  
3. Backend fetches music from Jamendo API  
4. Songs প্রদর্শিত হয় frontend-এ  
5. User music play করলে history save হয়  

---

## 🛠️ Tech Stack

### 🔹 Backend
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication

### 🔹 Frontend
- React (Vite)
- Axios
- CSS (Custom UI)

### 🔹 API
- Jamendo API (Music Source)

---

## 📂 Project Structure


music_ai_assistant/
│
├── backend/
│ ├── app/
│ ├── requirements.txt
│
├── frontend/
│ ├── src/
│ ├── public/
│
├── .gitignore
├── LICENSE
└── README.md


---

## ⚙️ Installation & Setup

### 🔹 1. Clone the repository

```bash
git clone https://github.com/sakib-foysal/music_ai_assistant.git
cd music_ai_assistant
🔹 2. Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

Create .env file:

DATABASE_URL=mysql+pymysql://root:@localhost/music_ai_assistant
SECRET_KEY=your_secret_key
JAMENDO_CLIENT_ID=your_client_id

Run backend:

uvicorn app.main:app --reload
🔹 3. Frontend Setup
cd frontend
npm install
npm run dev
🌐 API Endpoints
Method	Endpoint	Description
POST	/api/signup	Create user
POST	/api/login	Login
GET	/api/recommend	Get music
GET	/api/history	Get history
POST	/api/history	Save history
📸 Screenshots (Optional)

Add screenshots here later for better presentation

🔒 Environment Variables
DATABASE_URL=
SECRET_KEY=
JAMENDO_CLIENT_ID=
📌 Future Improvements
🤖 AI-based recommendation (Gemini / ML)
❤️ Favorite songs system
🎧 Playlist feature
🌍 Deploy to cloud
👨‍💻 Author

Sakib Foysal
📍 Bangladesh
🎓 CSE Student

📜 License

This project is licensed under the MIT License.
