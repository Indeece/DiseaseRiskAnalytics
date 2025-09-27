# First model to predict coronary heart disease

import numpy as np
import pandas as pd

import matplotlib.pyplot as plt

from collections import Counter

pd.options.display.max_columns = None
raw_data = pd.read_csv("C:\\Users\\Solange\\Desktop\\Курсовая ML по определению рисков заболевания\\framingham.csv")

'''
Demographic:
 Sex: male or female(Nominal)
• Age: Age of the patient;(Continuous - Although the recorded ages have been truncated to whole numbers, the concept of age is continuous)

Behavioral
• Current Smoker: whether or not the patient is a current smoker (Nominal)
• Cigs Per Day: the number of cigarettes that the person smoked on average in one day.(can be considered continuous as one can have any number of cigarettes, even half a cigarette.)

Medical( history)
• BP Meds: whether or not the patient was on blood pressure medication (Nominal)
• Prevalent Stroke: whether or not the patient had previously had a stroke (Nominal)
• Prevalent Hyp: whether or not the patient was hypertensive (Nominal)
• Diabetes: whether or not the patient had diabetes (Nominal)

Medical(current)
• Tot Chol: total cholesterol level (Continuous)
• Sys BP: systolic blood pressure (Continuous)
• Dia BP: diastolic blood pressure (Continuous)
• BMI: Body Mass Index (Continuous)
• Heart Rate: heart rate (Continuous - In medical research, variables such as heart rate though in fact discrete, yet are considered continuous because of large number of possible values.)
• Glucose: glucose level (Continuous)

Predict variable (desired target)
• 10 year risk of coronary heart disease CHD (binary: “1”, means “Yes”, “0” means “No”)
'''

print(raw_data)

print(Counter(raw_data["education"].isna())) # Counter({False: 4133, True: 105})

for x in raw_data.columns:
    df_x = pd.DataFrame(raw_data[x])
    mediana = df_x.median()
    raw_data = raw_data.replace(np.nan, mediana)


print(raw_data)
print(Counter(raw_data["glucose"].isna()))

# plt.scatter(range(0, len(raw_data)), raw_data["BPMeds"])
# plt.scatter(range(0, len(raw_data)), raw_data["age"])
plt.hist(raw_data["education"])
plt.show()