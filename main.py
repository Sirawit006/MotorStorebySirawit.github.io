from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Tell FastAPI where your templates are located
templates = Jinja2Templates(directory="templates")
app.mount("/css",StaticFiles(directory="css"), name="css")
app.mount("/photo", StaticFiles(directory="photo"), name="photo")
app.mount("/js", StaticFiles(directory="js"), name="js")

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    # Render the index.html template, passing in the required 'request' and a 'name' variable
    return templates.TemplateResponse("index.html", {"request": request, "name": "Developer"})

@app.get("/shop", response_class=HTMLResponse)
def home(request: Request):
    # Render the index.html template, passing in the required 'request' and a 'name' variable
    return templates.TemplateResponse("carpage.html", {"request": request, "name": "Developer"})

@app.get("/login", response_class=HTMLResponse)
def home(request: Request):
    # Render the index.html template, passing in the required 'request' and a 'name' variable
    return templates.TemplateResponse("login.html", {"request": request, "name": "Developer"})

@app.get("/register", response_class=HTMLResponse)
def home(request: Request):
    # Render the index.html template, passing in the required 'request' and a 'name' variable
    return templates.TemplateResponse("register.html", {"request": request, "name": "Developer"})

@app.get("/payment", response_class=HTMLResponse)
def home(request: Request):
    # Render the index.html template, passing in the required 'request' and a 'name' variable
    return templates.TemplateResponse("payment.html", {"request": request, "name": "Developer"})
