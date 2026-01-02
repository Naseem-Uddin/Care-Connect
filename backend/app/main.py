#  Entry point for the backend application
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse

app = FastAPI()

@app.exception_handler(404)
async def custom_404_handler(request: Request, exc):
    return RedirectResponse(url="/login")

@app.get("/")
async def read_root():
    return RedirectResponse(url="/login")

@app.get("/login")
def login():
    return {"message": "Welcome to the login page!"}

@app.get("/signup")
def signup():
    return {"message": "Welcome to the signup page!"}