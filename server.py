import joblib
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from model import SGDLogisticRegression
# App creation and model loading
app = FastAPI()
LogicRegressor = joblib.load("./LogicRegressor.joblib")


class RegressorSpecies(BaseModel):
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
def predict(Regressor: RegressorSpecies):
    """
    :param Regressor: input data from the post request
    :return: predicted iris type
    """
    features = [[
        Regressor.male,
        Regressor.age,
        Regressor.currentSmoker,
        Regressor.cigsPerDay,
        Regressor.BPMeds,
        Regressor.prevalentStroke,
        Regressor.prevalentHyp,
        Regressor.diabetes,
        Regressor.totChol,
        Regressor.sysBP,
        Regressor.diaBP,
        Regressor.BMI,
        Regressor.heartRate,
        Regressor.glucose
    ]]
    prediction = LogicRegressor.predict(features)
    return {
        "prediction": prediction
    }
