from fastapi import FastAPI
from cat import cat

app = FastAPI()

app.include_router(cat.router)


@app.get('/')
async def main():
    return {'data': 'HI!'}
