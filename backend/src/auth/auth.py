from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from . import models, utils
from .schemas import Token, UserInDB, User
from .utils import authenticate_user, create_access_token
from config import ACCESS_TOKEN_EXPIRE_MINUTES
from database import get_async_session

router = APIRouter(
    prefix="/auth",
    tags=['Auth']
)


@router.post("/token")
async def login_for_access_token(
        db: Annotated[AsyncSession, Depends(get_async_session)],
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=float(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.post("/register", response_model=User)
async def register(
        db: Annotated[AsyncSession, Depends(get_async_session)],
        user: Annotated[UserInDB, Body()]
):
    hashed_password = utils.get_password_hash(user.hashed_password)
    user.hashed_password = hashed_password

    new_user = models.User(**user.model_dump(), lvl=0, clicks=0)

    db.add(new_user)
    await db.commit()

    return new_user
