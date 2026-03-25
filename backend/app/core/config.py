# backend/app/core/config.py
import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Care Connect"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    
    # This automatically converts the comma-separated string from .env into a Python List
    CORS_ORIGINS: List[str] = []

    class Config:
        env_file = ".env"

settings = Settings()