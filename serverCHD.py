import joblib
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
# App creation and model loading
app = FastAPI()
LGRegCHD = joblib.load("./LGRegCHD.joblib")


class LGRegCHDSpecies(BaseModel):
    """
    Input features validation for the ML model
    """
    male: int  # whether patient is male or female (0 - male or 1 - female)
    age: int   # Age of the patient (years)
    currentSmoker: int  # whether the patient is a current smoker (0 or 1)
    cigsPerDay: float  # the number of cigarettes that the patient smoked on average in one day
    BPMeds: float  # whether the patient was on blood pressure medication (0 or 1)
    prevalentStroke: int  # whether the patient had previously had a stroke (0 or 1)
    prevalentHyp: int  # whether the patient was hypertensive (0 or 1)
    diabetes: int  # whether the patient had diabetes (0 or 1)
    totChol: float  # total cholesterol level of the patient
    sysBP: float  # systolic blood pressure of the patient
    diaBP: float  # diastolic blood pressure of the patient
    BMI: float  # Body Mass Index of the patient
    heartRate: float  # heart rate of the patient
    glucose: float  # glucose level of the patient


@app.post('/predictCHD')
def predict(RegressorCHD: LGRegCHDSpecies):
    """
    :param RegressorCHD: input data from the post request
    :return: predicted probability of coronary heart disease in ten years
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
