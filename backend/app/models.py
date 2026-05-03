from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(150), unique=True, index=True)
    password_hash = Column(String(255))

    histories = relationship("MoodHistory", back_populates="user")


class MoodHistory(Base):
    __tablename__ = "mood_history"

    id = Column(Integer, primary_key=True, index=True)
    mood = Column(String(50))
    track_name = Column(String(255))
    artist_name = Column(String(255))
    audio_url = Column(Text)
    image_url = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="histories")