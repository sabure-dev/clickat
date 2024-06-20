from typing import Annotated

from fastapi import APIRouter, Depends, Body, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from auth import models as auth_models
from auth.utils import get_current_user
from cat.schemas import UserClicks
from database import get_async_session

from . import models

router = APIRouter(
    prefix="/skin",
    tags=["Shop"]
)


@router.get('/')
async def get_skins(db: AsyncSession = Depends(get_async_session),
                    user: auth_models.User = Depends(get_current_user)):
    query = select(models.Skin).order_by(models.Skin.price)
    result = await db.execute(query)

    return result.scalars().all()


@router.get('/my')
async def get_user_skins(db: AsyncSession = Depends(get_async_session),
                         user: auth_models.User = Depends(get_current_user)):
    query = select(auth_models.UserSkins.skin_name).where(auth_models.UserSkins.username == user.username)
    result = await db.execute(query)

    return result.scalars().all()


@router.post('/buy/{name}')
async def buy_skin(name: str,
                   db: AsyncSession = Depends(get_async_session),
                   user: auth_models.User = Depends(get_current_user)):
    query = select(models.Skin).where(models.Skin.name == name)
    res = await db.execute(query)
    skin = res.scalars().first()

    user_skins_res = await db.execute(select(auth_models.UserSkins).where(auth_models.UserSkins.username == user.username))

    user_skins = user_skins_res.scalars().all()
    user_skins = [s.skin_name for s in user_skins]

    if not (skin.name in user_skins):
        if user.clicks >= skin.price:
            new_skin = auth_models.UserSkins(username=user.username, skin_name=skin.name)
            db.add(new_skin)
            user.clicks = user.clicks - skin.price
            await db.commit()
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Not enough clicks!')

    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='You already have that skin!')

    return skin


@router.put('/{name}')
async def change_active_skin(name: str,
                             db: AsyncSession = Depends(get_async_session),
                             user: auth_models.User = Depends(get_current_user)):
    user_skins_res = await db.execute(select(auth_models.UserSkins).where(auth_models.UserSkins.username == user.username))

    user_skins = user_skins_res.scalars().all()
    user_skins = [s.skin_name for s in user_skins]

    if name in user_skins:
        print(name)

        user.active_skin = name
        await db.commit()
        return name
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='You don\'t have that skin!')


@router.get('/active')
async def get_active_skin(db: AsyncSession = Depends(get_async_session),
                          user: auth_models.User = Depends(get_current_user)):
    query = select(auth_models.User.active_skin).where(auth_models.User.username == user.username)
    result = await db.execute(query)

    return result.scalars().first()
