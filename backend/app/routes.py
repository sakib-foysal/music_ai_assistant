from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import get_db
from .models import User, MoodHistory
from .schemas import UserCreate, UserLogin, SaveHistory
from .auth import hash_password, verify_password, create_access_token, get_current_user
from .music import get_music_by_mood

router = APIRouter(prefix="/api", tags=["Music AI Assistant"])


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Signup successful",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }
    }


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({
        "user_id": db_user.id,
        "email": db_user.email
    })

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email
        }
    }


@router.get("/recommend")
def recommend_music(
    mood: str,
    current_user: User = Depends(get_current_user)
):
    tracks = get_music_by_mood(mood)

    return {
        "mood": mood,
        "tracks": tracks
    }


@router.post("/history")
def save_history(
    history: SaveHistory,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_history = MoodHistory(
        user_id=current_user.id,
        mood=history.mood,
        track_name=history.track_name,
        artist_name=history.artist_name,
        audio_url=history.audio_url,
        image_url=history.image_url
    )

    db.add(new_history)
    db.commit()

    return {"message": "History saved successfully"}


@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    histories = db.query(MoodHistory).filter(
        MoodHistory.user_id == current_user.id
    ).order_by(MoodHistory.id.desc()).all()

    return histories