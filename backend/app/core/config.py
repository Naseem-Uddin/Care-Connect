import os
from pydantic import field_validator
from pydantic_settings import BaseSettings
from typing import List, Union

class Settings(BaseSettings):
    PROJECT_NAME: str = "Care Connect"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    
    # We allow this to be a string (from .env) or a list
    CORS_ORIGINS: Union[List[str], str] = []

    # This "cleans" the string from your .env and turns it into a real Python list
    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    class Config:
        env_file = ".env"
        # This tells pydantic to ignore extra fields in .env
        extra = "ignore" 

settings = Settings()