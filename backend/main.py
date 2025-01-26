from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

class TestData(BaseModel):
    message: str

class BlendshapeData(BaseModel):
    browDownLeft: float = 0.0
    browDownRight: float = 0.0
    browOuterUpLeft: float = 0.0
    browOuterUpRight: float = 0.0
    jawClench: float = 0.0
    mouthFrownLeft: float = 0.0
    mouthFrownRight: float = 0.0
    eyeSquintLeft: float = 0.0
    eyeSquintRight: float = 0.0
    eyeBlinkLeft: float = 0.0
    eyeBlinkRight: float = 0.0
    mouthPucker: float = 0.0
    browInnerUp: float = 0.0
    mouthShrugLower: float = 0.0
    mouthShrugUpper: float = 0.0
    jawOpen: float = 0.0

@app.post("/test")
async def test_endpoint(data: TestData):
    received_message = data.message

    return {"received_message": received_message}

@app.post("/predict")
async def predict_stress(data: BlendshapeData):
    weights = {
    "browDownLeft": 0.2,
    "browDownRight": 0.2,
    "browOuterUpLeft": 0.1,
    "browOuterUpRight": 0.1,
    "jawClench": 0.35,
    "mouthFrownLeft": 0.15,
    "mouthFrownRight": 0.15,
    "eyeSquintLeft": 0.15,
    "eyeSquintRight": 0.15,
    "eyeBlinkLeft": 0.1,
    "eyeBlinkRight": 0.1,
    "mouthPucker": 0.2,
    "browInnerUp": 0.1,
    "mouthShrugLower": 0.1,
    "mouthShrugUpper": 0.1,
    "jawOpen": 0.15,
    }

    stress_score = sum(weights[key] * getattr(data, key) for key in weights)
    stress_percentage = min(100, max(0, stress_score * 100))

    return {"stress_percentage": stress_percentage}