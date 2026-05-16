from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create the FastAPI app instance
app = FastAPI(
    title="Task Manager API",
    description="A professional task management API built with FastAPI",
    version="1.0.0"
)

# CORS - allows our React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite React runs on 5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test route - always build this first to confirm server works
@app.get("/")
def root():
    return {"message": "Task Manager API is running! "}

@app.get("/health")
def health_check():
    return {"status": "healthy"}