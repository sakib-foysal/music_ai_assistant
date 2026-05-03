from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class SaveHistory(BaseModel):
    mood: str
    track_name: str
    artist_name: str
    audio_url: str
    image_url: str | None = None