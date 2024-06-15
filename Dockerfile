FROM python:3.12

RUN mkdir /fastapi_app

WORKDIR /fastapi_app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

WORKDIR /backend/src

CMD gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
