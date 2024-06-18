#!/bin/bash

alembic upgrade head

# shellcheck disable=SC2164
cd src

gunicorn main:app --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000
