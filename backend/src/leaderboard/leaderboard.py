from fastapi import APIRouter, Depends
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from auth import models as auth_models
from auth.utils import get_current_user
from database import get_async_session
from . import schemas

router = APIRouter(
    prefix="/leaderboard",
    tags=["Leaderboard.jsx"]
)


@router.get('/', response_model=list[schemas.Leader])
async def get_best_users(db: AsyncSession = Depends(get_async_session),
                         user: auth_models.User = Depends(get_current_user)):
    query = select(auth_models.User).order_by(desc(auth_models.User.lvl)).limit(10)
    result = await db.execute(query)

    return result.scalars().all()
