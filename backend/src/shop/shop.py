from typing import Annotated

from fastapi import APIRouter, Depends, Body
from sqlalchemy.ext.asyncio import AsyncSession
from auth import models
from auth.utils import get_current_user
from cat.schemas import UserClicks
from database import get_async_session

router = APIRouter(
    prefix="/shop",
    tags=["Shop"]
)


@router.get('/')
def get_skins(db: AsyncSession = Depends(get_async_session),
              user: models.User = Depends(get_current_user), ):
    pass
