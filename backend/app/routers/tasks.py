from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.task import Task, User
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse, UserCreate
from typing import List
import uuid

router = APIRouter(prefix="/tasks", tags=["tasks"])

# Helper - get or create user from Firebase UID
def get_or_create_user(firebase_uid: str, email: str, db: Session):
    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    if not user:
        user = User(firebase_uid=firebase_uid, email=email)
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

# GET all tasks for a user
@router.get("/", response_model=List[TaskResponse])
def get_tasks(firebase_uid: str, email: str, db: Session = Depends(get_db)):
    user = get_or_create_user(firebase_uid, email, db)
    return db.query(Task).filter(Task.user_id == user.id).all()

# POST create a new task
@router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, firebase_uid: str, email: str, db: Session = Depends(get_db)):
    user = get_or_create_user(firebase_uid, email, db)
    new_task = Task(**task.dict(), user_id=user.id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

# PUT update a task
@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: uuid.UUID, task: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in task.dict(exclude_unset=True).items():
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    return db_task

# DELETE a task
@router.delete("/{task_id}")
def delete_task(task_id: uuid.UUID, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}