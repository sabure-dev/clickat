import random

from fastapi import APIRouter, Depends
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from auth import models as auth_models
from auth.utils import get_current_user
from database import get_async_session
from . import models

router = APIRouter(
    prefix="/challenge",
    tags=["Challenge"]
)

DAILY_QUEST = None


@router.get('/')
async def get_daily_quest(db: AsyncSession = Depends(get_async_session),
                          user: auth_models.User = Depends(get_current_user)):
    query = select(models.Challenge).where(models.Challenge.active == True)

    result = await db.execute(query)

    return result.scalars().all()


async def select_daily_quest():
    async for session in get_async_session():
        active_q = await session.execute(select(models.Challenge).where(models.Challenge.active == True))
        active = active_q.scalars().first()

        active.active = False

        query = await session.execute(select(models.Challenge))
        result = query.scalars().all()

        quest = random.choice(result)
        quest.active = True
        global DAILY_QUEST
        DAILY_QUEST = quest

        print(DAILY_QUEST)

        await session.commit()
        return DAILY_QUEST
