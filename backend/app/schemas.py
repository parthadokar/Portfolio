from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class ArticleRequest(BaseModel):
    title: str
    content: str
    author: Optional[str] = None
    publishedDate: Optional[datetime] = None
    tags: Optional[List[str]] = []


class ArticleResponse(BaseModel):
    id: int
    title: str
    content: str
    author: Optional[str] = None
    publishedDate: Optional[datetime] = None
    tags: List[str] = []
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    token: str
