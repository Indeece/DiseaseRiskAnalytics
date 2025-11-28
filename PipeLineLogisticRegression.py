# First model to predict coronary heart disease

import joblib

from model import SGDLogisticRegression

import matplotlib.pyplot as plt

from collections import Counter

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

from sklearn.metrics import accuracy_score, balanced_accuracy_score

np.random.seed(42)
random_state = 42
pd.options.display.max_columns = None
pd.set_option('future.no_silent_downcasting', True)
#
# CORONARY HEART DISEASE PIPELINE
#

# raw_data_CHD = pd.read_csv("framingham.csv")

'''
Demographic:
 Sex: male or female(Nominal)
• Age: Age of the patient;(Continuous - Although the recorded ages have been truncated to whole numbers, the concept of
age is continuous)

Behavioral
• Current Smoker: whether or not the patient is a current smoker (Nominal)
• Cigs Per Day: the number of cigarettes that the person smoked on average in one day.(can be considered continuous as
one can have any number of cigarettes, even half a cigarette.)

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
• Heart Rate: heart rate (Continuous - In medical research, variables such as heart rate though in fact discrete, yet
are considered continuous because of large number of possible values.)
• Glucose: glucose level (Continuous)

Predict variable (desired target)
• 10 year risk of coronary heart disease CHD (binary: “1”, means “Yes”, “0” means “No”)
'''

# print(raw_data_CHD)
# #
# print(Counter(raw_data_CHD["education"].isna())) # Counter({False: 4133, True: 105})
#
# for x in raw_data_CHD.columns:
#     raw_data_CHD[x] = raw_data_CHD[x].fillna(raw_data_CHD[x].median())

# print(raw_data_CHD)
# print(Counter(raw_data["TenYearCHD"])) # classes are imbalanced
# print(Counter(raw_data["glucose"].isna())) # Counter({False: 4238})
# print(Counter(raw_data_CHD["education"].isna())) # Counter({False: 4238})
# print(len(raw_data))
# raw_data = raw_data.drop_duplicates() # there aren't any duplicates.
# print(len(raw_data))
# plt.scatter(range(0, len(raw_data)), raw_data["BPMeds"])
# plt.scatter(range(0, len(raw_data)), raw_data["age"])
# plt.hist(raw_data["education"])
# plt.show()
# raw_data_CHD = raw_data_CHD.drop("education", axis=1)
# data_CHD = raw_data_CHD.copy()

# print(data)
test_size = 0.3

# data_train_CHD, data_test_CHD, Y_train_CHD, Y_test_CHD = train_test_split(data_CHD.drop("TenYearCHD", axis=1),
#                                                                           np.array(data_CHD["TenYearCHD"]),
#                                                                           test_size=test_size,
#                                                                           random_state=random_state)
# LGRegCHD = SGDLogisticRegression()  # our logistic Regression
# LGRegCHD.fit(data_train_CHD, Y_train_CHD)
# #
# # joblib.dump(LGRegCHD, "./LGRegCHD.joblib")
# # print(data_test_CHD.head(1))
# ## print(data_test.iloc[0])
# # print(LGRegCHD.predict(np.array(data_test.iloc[0]).reshape(1, 14)))
# # print(LGRegCHD.predict(data_test_CHD.head(3)))
# '''
# The model with broken gradient:
# [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
# 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
#     1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1,
#     0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0,
#     0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1,
#     1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0,
#     0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0,
#     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0,
#     1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1,
#     0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0,
#     0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1,
#     0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1,
#     0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
#     0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0,
#     0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
#     1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1,
#     1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0,
#     1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1,
#     1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
#     0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1,
#     0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0,
#     0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1,
#     1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
#     0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0,
#     0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0,
#     0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0,
#     0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0,
#     1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
#     0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1,
#     0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1,
#     0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0,
#     0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0,
# 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0]
# '''
#
# '''
# The model with the correct gradient:
# [1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
# 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1,
# 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1,
#     1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0,
#     0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1,
#     1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0,
#     1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
#     0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1,
#     1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0,
#     1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1,
#     0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
#     1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0,
#     1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
#     0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1,
#     1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1,
#     0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0,
#     1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
#     0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0,
#     0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
#     1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0,
#     0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0,
#     1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0,
#     1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
#     0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1,
#     1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
#     1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1,
#     0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
#     1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1,
#     1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0,
#     1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
#     0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0,
#     1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
# 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0]
# '''

# print(Counter(Y_test)) # the classes are imbalanced
# # thresholds = [x/100 for x in range(1, 90)]
thresholds = np.arange(0.01, 0.9, step=0.01)
best_threshold_Acc = 0
best_result_Acc = 0
best_threshold_B_Acc = 0
best_result_B_Acc = 0
# # result_Acc = accuracy_score(Y_test_CHD, LGRegCHD.predict(data_test_CHD, threshold=0.5))  # see the metrics
# # result_B_Acc = balanced_accuracy_score(Y_test_CHD, LGRegCHD.predict(data_test_CHD, threshold=0.5))  # see the metrics
# # print(result_Acc)
# # print(result_B_Acc)

'''
The model with broken gradient:
0.6218553459119497
0.6462373400329748
'''

'''
The model with correct gradient:
0.6084905660377359
0.6581808903195414
'''

# for x in thresholds:
#     result_Acc = accuracy_score(Y_test_CHD, LGRegCHD.predict(data_test_CHD, threshold=x))  # see the metrics
#     if result_Acc > best_result_Acc:
#         best_result_Acc = result_Acc
#         best_threshold_Acc = x
#
# for x in thresholds:
#     result_B_Acc = balanced_accuracy_score(Y_test_CHD, LGRegCHD.predict(data_test_CHD, threshold=x))  # see the metrics
#     if result_B_Acc > best_result_B_Acc:
#         best_result_B_Acc = result_B_Acc
#         best_threshold_B_Acc = x
#
# print(f"The best accuracy is {best_result_Acc} using threshold {best_threshold_Acc}")
#
# # for the model with broken gradient:
#
# # The best accuracy is 0.7570754716981132 using threshold 0.89
# # it just very badly classifies the class 1 (that's  CHD), so because the classes are imbalanced, the metrics are better
# # when there are more zeroes, than ones, so the higher the threshold for the model, the better are metrics)
#
# # for the correct model:
#
# # The best accuracy is 0.8592767295597484 using threshold 0.75
# print(f"The best balanced accuracy is {best_result_B_Acc} using threshold {best_threshold_B_Acc}")
#
# # for the model with broken gradient:
#
# # The best balanced accuracy is 0.6480038470597472 using threshold 0.45
#
# # for the correct model:
#
# # The best balanced accuracy is 0.6650408259401743 using threshold 0.52
#
# # for the broken gradient:
# # result_Acc = accuracy_score(Y_test, LogicRegressor.predict(data_test, threshold=0.89))
# # print("accuracy_score:", result_Acc)
# # result_Acc = balanced_accuracy_score(Y_test, LogicRegressor.predict(data_test, threshold=0.45))
# # print("balanced_accuracy_score:", result_B_Acc)
#
# # for the correct gradient model:
#
# result_Acc = accuracy_score(Y_test_CHD, LGRegCHD.predict(data_test_CHD, threshold=0.75))
# print("accuracy_score:", result_Acc)
# result_B_Acc = balanced_accuracy_score(Y_test_CHD, LGRegCHD.predict(data_test_CHD, threshold=0.5))
# print("balanced_accuracy_score:", result_B_Acc)
#
# # straight correlations:
# # y1 = pd.Series(data["TenYearCHD"])
# # for x in data.columns:
# #     x1 = data[x]
# #     print(f"{x} and CHD: ", y1.corr(x1))


# #
# # DIABETES PIPELINE
# #
#
# '''
# Pregnancies: Number of times the patient has been pregnant.
#
# Glucose: Plasma glucose concentration after a 2-hour oral glucose tolerance test.
#
# BloodPressure: Diastolic blood pressure (mm Hg).
#
# SkinThickness: Triceps skinfold thickness (mm).
#
# Insulin: 2-hour serum insulin (mu U/ml).
#
# BMI: Body mass index (weight in kg/(height in m)^2).
#
# DiabetesPedigreeFunction: A function that represents the patient’s diabetes pedigree (i.e., likelihood of diabetes
# based on family history).
#
# Age: Age of the patient (years).
#
# Outcome: Binary outcome (0 or 1) where 1 indicates the presence of diabetes and 0 indicates the absence.
# '''
#
# raw_data_DIAB = pd.read_csv("diabetes_dataset.csv")
# # this is too much to ask from a client
# raw_data_DIAB = raw_data_DIAB.drop(columns=["DiabetesPedigreeFunction", "SkinThickness"])
#
# print(raw_data_DIAB)
#
# # see which variety of data there is
#
# # for x in raw_data_DIAB.columns:
# #     print("In %s there are " % x, Counter(raw_data_DIAB[x]))
# # for x in raw_data_DIAB.columns:
# #     plt.scatter(range(0, len(raw_data_DIAB[x])), raw_data_DIAB[x])
# #     plt.title(f"The variety of data from {x}")
# #     plt.xlabel("sample №")
# #     plt.ylabel(f"corresponding data of {x}")
# #     plt.show()
#
# # now we see, that some glucose, blood pressure, insulin, BMI levels are zero, that can't be right
# # the fix is to set them to median
#
# # see if there are Nones in dataset
#
# # for x in raw_data_DIAB.columns:
# #     print(Counter(raw_data_DIAB[x].isna()))
#
# # no, ironically, there are NONE, did you get it?
#
# # replace all zeros to the median of the corresponding column
# for x in raw_data_DIAB.drop(columns="Outcome").columns:
#     raw_data_DIAB[x] = raw_data_DIAB[x].replace(0, raw_data_DIAB[x].median())
#
# # watch again how they disappear
#
# # for x in raw_data_DIAB.columns:
# #     plt.scatter(range(0, len(raw_data_DIAB[x])), raw_data_DIAB[x])
# #     plt.title(f"The variety of data from {x}")
# #     plt.xlabel("sample №")
# #     plt.ylabel(f"corresponding data of {x}")
# #     plt.show()
# #
# # print(raw_data_DIAB.drop_duplicates())  # there are no any duplicates
#
# data_DIAB = raw_data_DIAB.copy()
#
# X_train_DIAB, X_test_DIAB, Y_train_DIAB, Y_test_DIAB = train_test_split(data_DIAB.drop("Outcome", axis=1),
#                                                                         np.array(data_DIAB["Outcome"]),
#                                                                         test_size=test_size, random_state=random_state)
# # train the new model
# LGRegDIAB = SGDLogisticRegression()
# LGRegDIAB.fit(X_train_DIAB, Y_train_DIAB)
#
# # see new metrics
# result_DIAB = LGRegDIAB.predict(X_test_DIAB, threshold=0.5)
# print("with 0.5 threshold Accuracy_score:", accuracy_score(Y_test_DIAB, result_DIAB))
# print("with 0.5 threshold Balanced Accuracy_score:", balanced_accuracy_score(Y_test_DIAB, result_DIAB))
#
# # 0.670995670995671
# # 0.6807533112582782
#
# best_threshold_Acc = 0
# best_result_Acc = 0
# best_threshold_B_Acc = 0
# best_result_B_Acc = 0
#
# # for best result Accuracy
# for x in thresholds:
#     result_Acc = accuracy_score(Y_test_DIAB, LGRegDIAB.predict(X_test_DIAB, threshold=x))
#     if result_Acc > best_result_Acc:
#         best_result_Acc = result_Acc
#         best_threshold_Acc = x
#
# # for best result balanced Accuracy
# for x in thresholds:
#     result_B_Acc = balanced_accuracy_score(Y_test_DIAB, LGRegDIAB.predict(X_test_DIAB, threshold=x))
#     if result_B_Acc > best_result_B_Acc:
#         best_result_B_Acc = result_B_Acc
#         best_threshold_B_Acc = x
#
# print(f"The best accuracy is {best_result_Acc} using threshold {best_threshold_Acc}")
#
# print(f"The best balanced accuracy is {best_result_B_Acc} using threshold {best_threshold_B_Acc}")
#
# # The best accuracy is 0.7705627705627706 using threshold 0.8400000000000001
#
# # The best balanced accuracy is 0.7230132450331126 using threshold 0.41000000000000003
#
# print(accuracy_score(Y_test_DIAB, LGRegDIAB.predict(X_test_DIAB, threshold=0.84)))  # 0.7705627705627706





#
# OSTEOPOROSIS PIPELINE
#

raw_data_OS = pd.read_csv("osteoporosis.csv")
print("---------------------------------------------------------")
print("before any cleaning:")
print(raw_data_OS)
raw_data_OS = raw_data_OS.drop(columns="Id")

raw_data_OS = raw_data_OS.drop(columns=["Race/Ethnicity"])

for x in raw_data_OS.columns:
    print("In %s there are " % x, Counter(raw_data_OS[x]))
# see the age distribution
# plt.scatter(np.arange(1, len(raw_data_OS["Age"]) + 1), raw_data_OS["Age"])
# plt.show()

# now we have to make all the categorical features numerical

# male - 0
raw_data_OS["Gender"] = raw_data_OS["Gender"].replace("Male", 0)
# female - 1
raw_data_OS["Gender"] = raw_data_OS["Gender"].replace("Female", 1)

# normal - 0
raw_data_OS["Hormonal Changes"] = raw_data_OS["Hormonal Changes"].replace("Normal", 0)
# Postmenopausal - 1
raw_data_OS["Hormonal Changes"] = raw_data_OS["Hormonal Changes"].replace("Postmenopausal", 1)

# No - 0
raw_data_OS["Family History"] = raw_data_OS["Family History"].replace("No", 0)
# Yes - 1
raw_data_OS["Family History"] = raw_data_OS["Family History"].replace("Yes", 1)

# No - 0
raw_data_OS["Family History"] = raw_data_OS["Family History"].replace("No", 0)
# Yes - 1
raw_data_OS["Family History"] = raw_data_OS["Family History"].replace("Yes", 1)

# Normal - 0
raw_data_OS["Body Weight"] = raw_data_OS["Body Weight"].replace("Normal", 0)
# Underweight - 1
raw_data_OS["Body Weight"] = raw_data_OS["Body Weight"].replace("Underweight", 1)

# Adequate - 0
raw_data_OS["Calcium Intake"] = raw_data_OS["Calcium Intake"].replace("Adequate", 0)
# Low - 1
raw_data_OS["Calcium Intake"] = raw_data_OS["Calcium Intake"].replace("Low", 1)

# Sufficient - 0
raw_data_OS["Vitamin D Intake"] = raw_data_OS["Vitamin D Intake"].replace("Sufficient", 0)
# Insufficient - 1
raw_data_OS["Vitamin D Intake"] = raw_data_OS["Vitamin D Intake"].replace("Insufficient", 1)

# Active - 0
raw_data_OS["Physical Activity"] = raw_data_OS["Physical Activity"].replace("Active", 0)
# Sedentary - 1
raw_data_OS["Physical Activity"] = raw_data_OS["Physical Activity"].replace("Sedentary", 1)

# No - 0
raw_data_OS["Smoking"] = raw_data_OS["Smoking"].replace("No", 0)
# Yes - 1
raw_data_OS["Smoking"] = raw_data_OS["Smoking"].replace("Yes", 1)

# nan - 0
raw_data_OS["Alcohol Consumption"] = raw_data_OS["Alcohol Consumption"].replace(np.nan, 0)
# Moderate - 1
raw_data_OS["Alcohol Consumption"] = raw_data_OS["Alcohol Consumption"].replace("Moderate", 1)

# nan - 0
raw_data_OS["Medical Conditions"] = raw_data_OS["Medical Conditions"].replace(np.nan, 0)
# Hyperthyroidism - 1
raw_data_OS["Medical Conditions"] = raw_data_OS["Medical Conditions"].replace("Hyperthyroidism", 1)
# Rheumatoid Arthritis - 2
raw_data_OS["Medical Conditions"] = raw_data_OS["Medical Conditions"].replace("Rheumatoid Arthritis", 2)

# nan - 0
raw_data_OS["Medications"] = raw_data_OS["Medications"].replace(np.nan, 0)
# Corticosteroids - 1
raw_data_OS["Medications"] = raw_data_OS["Medications"].replace("Corticosteroids", 1)

# No - 0
raw_data_OS["Prior Fractures"] = raw_data_OS["Prior Fractures"].replace("No", 0)
# Yes - 1
raw_data_OS["Prior Fractures"] = raw_data_OS["Prior Fractures"].replace("Yes", 1)

raw_data_OS = raw_data_OS.drop_duplicates()  # there are 10 duplicates

print("---------------------------------------------------------")
print("after:")

print(raw_data_OS)

for x in raw_data_OS.columns:
    print("In %s there are " % x, Counter(raw_data_OS[x]))

data_OS = raw_data_OS.copy()

X_train_OS, X_test_OS, Y_train_OS, Y_test_OS = train_test_split(data_OS.drop(columns="Osteoporosis"),
                                                                np.array(data_OS["Osteoporosis"]),
                                                                test_size=test_size, random_state=random_state)

LGRegOS = SGDLogisticRegression()
LGRegOS.fit(X_train_OS, Y_train_OS)

# see the metrics
#
# result_OS = LGRegOS.predict(X_test_OS, threshold=0.5)
# print("with 0.5 threshold Accuracy_score:", accuracy_score(Y_test_OS, result_OS))
# # with 0.5 threshold Accuracy_score: 0.8478632478632478
# print("with 0.5 threshold Balanced Accuracy_score:", balanced_accuracy_score(Y_test_OS, result_OS))
# # with 0.5 threshold Balanced Accuracy_score: 0.8484991934918298
#
#
# best_threshold_Acc = 0
# best_result_Acc = 0
# best_threshold_B_Acc = 0
# best_result_B_Acc = 0
#
# # for the accuracy
# for x in thresholds:
#     result_Acc = accuracy_score(Y_test_OS, LGRegOS.predict(X_test_OS, threshold=x))
#     if (result_Acc > best_result_Acc):
#         best_result_Acc = result_Acc
#         best_threshold_Acc = x
#
# # for the balanced accuracy
# for x in thresholds:
#     result_B_Acc = balanced_accuracy_score(Y_test_OS, LGRegOS.predict(X_test_OS, threshold=x))
#     if (result_B_Acc > best_result_B_Acc):
#         best_result_B_Acc = result_B_Acc
#         best_threshold_B_Acc = x
#
# print(f"The best accuracy is {best_result_Acc} using threshold {best_threshold_Acc}")
# # The best accuracy is 0.8512820512820513 using threshold 0.48000000000000004
# print(f"The best balanced accuracy is {best_result_B_Acc} using threshold {best_threshold_B_Acc}")
# # The best balanced accuracy is 0.851883021249737 using threshold 0.48000000000000004
#
# # print(accuracy_score(Y_test_OS, LGRegOS.predict(X_test_OS, threshold=best_threshold_Acc)))
# print(accuracy_score(Y_test_OS, LGRegOS.predict(X_test_OS, threshold=0.48)))  # 0.8512820512820513

print(LGRegOS.predict(data_OS.head(1).drop(columns="Osteoporosis"), threshold=0.48))