import asyncio
from fastapi import FastAPI
from cat import cat
from auth import auth
from shop import shop
from challenge import challenge
from leaderboard import leaderboard
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Click-Cat")

origins = [
    "http://localhost:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT"],
    allow_headers=["Authorization", "Content-Type", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin"],
)

app.include_router(cat.router, prefix='/api')
app.include_router(auth.router, prefix='/api')
app.include_router(shop.router, prefix='/api')
app.include_router(leaderboard.router, prefix='/api')
app.include_router(challenge.router, prefix='/api')

app.mount("/api/static", StaticFiles(directory="static"), name="static")


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(background_task())


async def background_task():
    while True:
        await challenge.select_daily_quest()
        await asyncio.sleep(86400)
