from fastapi import APIRouter

router = APIRouter(
    prefix="/cat",
    tags=["Cat"]
)


@router.get('/')
async def get_clicks():
    return {'data': 'количество кликов'}


@router.post('/')
async def post_clicks():
    return {'data': 'новые клики отправлены в базу данных! (+10 кликов)'}
