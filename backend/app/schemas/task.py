from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

# Schema for creating a task
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "todo"
    priority: str = "medium"

# Schema for updating a task
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None

# Schema for returning a task (includes id, created_at)
class TaskResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: Optional[str]
    status: str
    priority: str
    created_at: datetime

    class Config:
        from_attributes = True

# Schema for user
class UserCreate(BaseModel):
    firebase_uid: str
    email: str