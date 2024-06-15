from typing import Annotated

from fastapi import APIRouter, Depends, Body
from sqlalchemy.ext.asyncio import AsyncSession
from auth import models
from auth.utils import get_current_user
from cat.schemas import UserClicks, UserLvl
from database import get_async_session

router = APIRouter(
    prefix="/cat",
    tags=["Cat"]
)


@router.get('/')
async def get_user_data(user: models.User = Depends(get_current_user)):
    return {"user_clicks": user.clicks, "user_lvl": user.lvl, "user_required_clicks": user.required_clicks}


@router.put('/clicks')
async def update_clicks(
        current_data: Annotated[UserClicks, Body()],
        db: AsyncSession = Depends(get_async_session),
        user: models.User = Depends(get_current_user),
):
    user.clicks = current_data.clicks
    await db.commit()
    return user.clicks


@router.put('/lvl')
async def update_lvl(
        current_data: Annotated[UserLvl, Body()],
        db: AsyncSession = Depends(get_async_session),
        user: models.User = Depends(get_current_user),
):
    user.lvl = current_data.lvl
    user.required_clicks = current_data.required_clicks
    await db.commit()
    return user.lvl
