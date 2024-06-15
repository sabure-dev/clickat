from typing import Annotated

from fastapi import APIRouter, Depends, Body
from sqlalchemy.ext.asyncio import AsyncSession
from auth import models
from auth.utils import get_current_user
from cat.schemas import UserData
from database import get_async_session

router = APIRouter(
    prefix="/cat",
    tags=["Cat"]
)


@router.get('/')
async def get_user_data(user: models.User = Depends(get_current_user)):
    return {"user_clicks": user.clicks, "user_lvl": user.lvl}


# @router.put('/')
# async def update_clicks(db: AsyncSession = Depends(get_async_session),
#                         user: models.User = Depends(get_current_user)):
#     user.clicks = user.clicks + 100
#     await db.commit()
#     return user.clicks


@router.put('/')
async def update_clicks(
        current_data: Annotated[UserData, Body()],
        db: AsyncSession = Depends(get_async_session),
        user: models.User = Depends(get_current_user),
        ):
    user.clicks = current_data.clicks
    user.lvl = current_data.lvl
    await db.commit()
    return user.clicks
