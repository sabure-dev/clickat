from fastapi import FastAPI
from cat import cat
from auth import auth

app = FastAPI()

app.include_router(cat.router, prefix='/api')
app.include_router(auth.router, prefix='/api')
