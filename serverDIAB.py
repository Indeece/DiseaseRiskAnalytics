import joblib
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
# App creation and model loading
app = FastAPI()
LGRegDIAB = joblib.load("./LGRegDIAB.joblib")


class LGRegDIABSpecies(BaseModel):
    """
    Input features validation for the ML model
    """
    Pregnancies: int  # Number of times the patient has been pregnant
    Glucose: float  # Plasma glucose concentration
    BloodPressure: int  # Diastolic blood pressure
    Insulin: float  # 2-hour serum insulin
    BMI: float  # Body Mass Index of the patient
    Age: int  # Age of the patient (years)


@app.post('/predictDIAB')
def predict(RegressorDIAB: LGRegDIABSpecies):
    """
    :param RegressorDIAB: input data from the post request
    :return: predicted probability of diabetes
    """
    features = [[
        RegressorDIAB.Pregnancies,
        RegressorDIAB.Glucose,
        RegressorDIAB.BloodPressure,
        RegressorDIAB.Insulin,
        RegressorDIAB.BMI,
        RegressorDIAB.Age
    ]]
    prediction = LGRegDIAB.predict(features)
    return {
        "prediction": prediction
    }
