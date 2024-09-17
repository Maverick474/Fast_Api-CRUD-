from model import Todo
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017')
database = client.TodoList
collection = database.todo

def fetch_one_todo(title):
    document = collection.find_one({"title": title})
    return document

def fetch_all_todos():
    todos = []
    cursor = collection.find()
    for document in cursor:
        document['description'] = str(document.get('description', ""))
        todos.append(Todo(**document))
    return todos


def create_todo(todo):
    document = todo
    result = collection.insert_one(document)
    return document

def update_todo(title, desc):
    collection.update_one({"title": title}, {"$set": {
        "description": desc
    }})
    document = collection.find_one({"title": title})
    return document

def delete_todo_db(title):
    collection.delete_one({"title": title})
    return True
