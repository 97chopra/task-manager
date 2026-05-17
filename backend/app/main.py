from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tasks
from app.db.database import engine
from app.models.task import Base

# Create all tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Manager API",
    description="A professional task management API built with FastAPI",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tasks.router)

@app.get("/")
def root():
    return {"message": "Task Manager API is running! 🚀"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
