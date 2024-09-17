from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Todo

from database import (
    fetch_all_todos,
    fetch_one_todo,
    create_todo,
    update_todo,
    delete_todo_db
)

app = FastAPI()

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=['*'],
    allow_headers=['*'],
    allow_credentials=True
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/api/todo")
def get_todos():
    response = fetch_all_todos()
    return response

@app.get("/api/todo/{title}", response_model=Todo)
def get_todo(title: str):
    response = fetch_one_todo(title)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot be found!")

@app.post("/api/todo", response_model=Todo)
def post_todo(todo: Todo):
    response = create_todo(todo.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong!")

@app.patch("/api/todo/{title}", response_model=Todo)
def patch_todo(title: str, desc: str):
    response = update_todo(title, desc)
    if response:
        return response
    else:
        raise HTTPException(404, "Cannot be found!")

@app.delete("/api/todo/{title}")
def delete_todo(title: str):
    response = delete_todo_db(title)
    if response:
        return {"message": "Deleted successfully!"}
    raise HTTPException(404, "Error occurred")


#uvicorn app:app --reload 
#This is the command to start the fast api server