# Task Manager App 🚀

A full-stack task management application built with React, FastAPI, and PostgreSQL.

## Features
- 🔐 Authentication (Firebase Auth - Email/Password)
- 📋 Kanban Board (Todo, In Progress, Done)
- ✅ Full CRUD operations for tasks
- 🎨 Modern dark theme UI
- 💾 Persistent data with PostgreSQL
- 🔒 Protected routes
- 📱 Responsive design

## Tech Stack

### Frontend
- React (Vite)
- Firebase Authentication
- Axios
- React Router DOM

### Backend
- Python FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Pydantic
- Firebase Admin SDK

## Project Structure
task-manager/
├── frontend/          # React app
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── services/
└── backend/           # FastAPI app
└── app/
├── routers/
├── models/
├── schemas/
└── db/
## Getting Started

### Prerequisites
- Node.js
- Python 3.x
- PostgreSQL
- Firebase account

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Environment Variables

Frontend `.env`:
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
Backend `.env`:
DATABASE_URL=postgresql://user:password@localhost:5432/taskmanager
## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks/ | Get all tasks |
| POST | /tasks/ | Create a task |
| PUT | /tasks/{id} | Update a task |
| DELETE | /tasks/{id} | Delete a task |

## Screenshots
🖼️ Coming Soon

## Author
**Aarti** — Final year Software Development & Data Science student