import joblib
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
# App creation and model loading
app = FastAPI()
LGRegOS = joblib.load("./LGRegOS.joblib")


class LGRegOSSpecies(BaseModel):
    """
    Input features validation for the ML model
    """
    Age: int  # Age of the patient (years)
    Gender: int  # whether patient is male or female (0 or 1)
    HormonalChanges: int  # whether patient is at their postmenopausal period (0 - normal or 1 - postmenopausal)
    FamilyHistory: int  # whether someone in patient's family had osteoporosis (0 - no or 1 - yes)
    BodyWeight: int  # whether patient's weight is underweight (0 - no or 1 - yes)
    CalciumIntake: int  # whether patient takes enough calcium (0 - yes or 1 - no)
    VitaminDIntake: int  # whether patient takes enough vitamin D (0 - yes or 1 - no)
    PhysicalActivity: int  # whether patient leads an active lifestyle  (0 - active or 1 - sedentary)
    Smoking: int  # whether patient is a current smoker (0 or 1)
    AlcoholConsumption: int  # whether patient drinks alcohol from time to time (0 - no or 1 - yes)
    MedicalConditions: int  # whether patient has Hyperthyroidism - 1, Rheumatoid Arthritis - 2, nothing - 0
    Medications: int  # whether patient takes Corticosteroids (0 - no, 1 - yes)
    PriorFractures: int  # whether patient has prior fractures (broken bones before) (0 - no, 1 - yes)


@app.post('/predictOS')
def predict(RegressorOS: LGRegOSSpecies):
    """
    :param RegressorOS: input data from the post request
    :return: predicted probability of osteoporosis
    """
    features = [[
        RegressorOS.Age,
        RegressorOS.Gender,
        RegressorOS.HormonalChanges,
        RegressorOS.FamilyHistory,
        RegressorOS.BodyWeight,
        RegressorOS.CalciumIntake,
        RegressorOS.VitaminDIntake,
        RegressorOS.PhysicalActivity,
        RegressorOS.Smoking,
        RegressorOS.AlcoholConsumption,
        RegressorOS.MedicalConditions,
        RegressorOS.Medications,
        RegressorOS.PriorFractures,
    ]]
    prediction = LGRegOS.predict(features)
    return {
        "prediction": prediction
    }
