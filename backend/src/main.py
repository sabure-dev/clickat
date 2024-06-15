from fastapi import FastAPI
from cat import cat
from auth import auth
from shop import shop
from fastapi.middleware.cors import CORSMiddleware


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

