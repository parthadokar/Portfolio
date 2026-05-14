from fastapi import APIRouter, HTTPException, status
from app.schemas import LoginRequest, LoginResponse
from app.auth import generate_token
import os

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest):
    if request.username != os.getenv("ADMIN_USERNAME") or request.password != os.getenv("ADMIN_PASSWORD"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return LoginResponse(token=generate_token(request.username))
