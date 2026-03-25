from fastapi import APIRouter

router = APIRouter()

@router.get("/login-test")
def login_test():
    return {"message": "Hello from the Auth Router!"}