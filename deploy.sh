#!/bin/bash

cd frontend
npm install
npm run build


cd backend


pip install -r backend/requirements.txt


uvicorn backend.main:app --host 0.0.0.0 --port $PORT
