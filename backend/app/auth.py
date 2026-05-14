from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
import os

ALGORITHM = "HS256"
EXPIRY_HOURS = 24


def generate_token(username: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=EXPIRY_HOURS)
    return jwt.encode({"sub": username, "exp": expire}, os.getenv("JWT_SECRET", ""), algorithm=ALGORITHM)


def validate_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, os.getenv("JWT_SECRET", ""), algorithms=[ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None
