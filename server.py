import joblib
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from model import SGDLogisticRegression
# App creation and model loading
app = FastAPI()
LGRegCHD = joblib.load("./LGRegCHD.joblib")


class LGRegCHDSpecies(BaseModel):
    """
    Input features validation for the ML model
    """
    male: int
    age: int
    currentSmoker: int
    cigsPerDay: float
    BPMeds: float
    prevalentStroke: int
    prevalentHyp: int
    diabetes: int
    totChol: float
    sysBP: float
    diaBP: float
    BMI: float
    heartRate: float
    glucose: float


@app.post('/predict')
def predict(RegressorCHD: LGRegCHDSpecies):
    """
    :param RegressorCHD: input data from the post request
    :return: predicted iris type
    """
    features = [[
        RegressorCHD.male,
        RegressorCHD.age,
        RegressorCHD.currentSmoker,
        RegressorCHD.cigsPerDay,
        RegressorCHD.BPMeds,
        RegressorCHD.prevalentStroke,
        RegressorCHD.prevalentHyp,
        RegressorCHD.diabetes,
        RegressorCHD.totChol,
        RegressorCHD.sysBP,
        RegressorCHD.diaBP,
        RegressorCHD.BMI,
        RegressorCHD.heartRate,
        RegressorCHD.glucose
    ]]
    prediction = LGRegCHD.predict(features)
    return {
        "prediction": prediction
    }
