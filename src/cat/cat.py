from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from auth import models
from auth.utils import get_user, get_current_user
from database import get_async_session

router = APIRouter(
    prefix="/cat",
    tags=["Cat"]
)


@router.get('/')
async def get_user_data(user: models.User = Depends(get_current_user)):
    return user


@router.put('/')
async def update_clicks(db: AsyncSession = Depends(get_async_session),
                        user: models.User = Depends(get_current_user)):
    user.clicks = user.clicks + 100
    await db.commit()
    return user.clicks

# async def get_user_lvl(username: str, db: Annotated[AsyncSession, Depends(get_async_session)]):
#     user = await get_user(db, username)
#     print(user.lvl)
#     return user.lvl
