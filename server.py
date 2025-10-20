import joblib
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

# App creation and model loading
app = FastAPI()
LogicRegressor = joblib.load("./LogicRegressor.joblib")


class RegressorSpecies(BaseModel):
    """
    Input features validation for the ML model
    """
    male: int
    age: int
    education: float
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
        Regressor.education,
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
    prediction = Regressor.predict(features).tolist()[0]
    return {
        "prediction": prediction
    }


if __name__ == '__main__':
    # Run server using given host and port
    uvicorn.run(app, host='127.0.0.1', port=80)
