# Csv Search Visualizer - Usage Guide

This guide provides instructions on how to set up and use application, which consists of a FastAPI backend and a React frontend.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)


## Prerequisites

Before you begin, make sure you have the following installed:

- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm)

## Backend Setup

1. Clone the repository:
 ```Bash
git clone https://github.com/Almightyluccas/csv-search-visualizer.git
cd csv-search-visualizer
```

2. Install Python dependencies:
 ```Bash
cd backend
pip install -r requirements.txt
```

3. Launch the FastAPI backend:

```Bash
uvicorn main:app --host 0.0.0.0 --port 8000
```
The backend will be accessible at `http://localhost:8000`.

## Frontend Setup

1. Navigate to the `frontend` directory from the root directory:
```Bash
cd frontend
```

2. Install npm packages:
```Bash
npm install
```


## Running the Application

1. Launch the React app:
```Bash
npm start
```
- The app will be accessible at `http://localhost:3000`.

2. Open your web browser and go to `http://localhost:3000` to interact with the application.



