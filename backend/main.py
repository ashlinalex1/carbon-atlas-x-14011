from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json

app = FastAPI(title="CarbonIQ - Geo Emission Map API")

# ✅ Allow frontend requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:8080"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "🌍 CarbonIQ GeoMap API is running!"}

@app.get("/geo_emissions")
def get_geo_emissions():
    """Returns per-capita CO₂, CO, and CH₄ emissions per Indian state."""
    with open("state_emissions.json", "r") as f:
        data = json.load(f)
    return JSONResponse(content=data)
