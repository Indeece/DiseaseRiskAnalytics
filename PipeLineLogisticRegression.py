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
raw_data = pd.read_csv("framingham.csv")

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

# print(raw_data)
#
# print(Counter(raw_data["education"].isna())) # Counter({False: 4133, True: 105})

for x in raw_data.columns:
    df_x = pd.DataFrame(raw_data[x])
    mediana = df_x.median()
    raw_data = raw_data.replace(np.nan, mediana)

# print(raw_data)
# print(Counter(raw_data["glucose"].isna())) # Counter({False: 4238})
# print(Counter(raw_data["education"].isna())) # Counter({False: 4238})
# print(len(raw_data))
# raw_data = raw_data.drop_duplicates() # there aren't any duplicates.
# print(len(raw_data))
# plt.scatter(range(0, len(raw_data)), raw_data["BPMeds"])
# plt.scatter(range(0, len(raw_data)), raw_data["age"])
# plt.hist(raw_data["education"])
# plt.show()

data = raw_data.copy()



# print(data)
test_size = 0.3


data_train, data_test, Y_train, Y_test = train_test_split(data.drop("TenYearCHD", axis=1),
                                                          np.array(data["TenYearCHD"]), test_size=test_size,
                                                          random_state=random_state)
LogicRegressor = SGDLogisticRegression()  # our logistic Regression
# weights_of_the_model = LogicRegressor.fit(data_train, Y_train)   # train our logistic Regression
LogicRegressor.fit(data_train, Y_train)
joblib.dump(LogicRegressor, "./LogicRegressor.joblib")
# # print(LogicRegressor.predict(data_test))
# # thresholds = [x/100 for x in range(1, 100)]
# thresholds = np.arange(0.01, 1, step=0.01)
# best_threshold = 0
# best_result = 0
# # result = balanced_accuracy_score(Y_test, LogicRegressor.predict(data_test, threshold=0.5))  # see the metrics
# # print(result)
# for x in thresholds:
#     result = balanced_accuracy_score(Y_test, LogicRegressor.predict(data_test, threshold=x))  # see the metrics
#     if result > best_result:
#         best_result = result
#         best_threshold = x
#
# print(f"The best result is {best_result} using threshold {best_threshold}") # balanced_accuracy_score = 0.648
#
# # the best threshold is 0.45
#
# result = balanced_accuracy_score(Y_test, LogicRegressor.predict(data_test, threshold=0.45))
# print("Balanced_accuracy_score:", result)

# print(balanced_accuracy_score(Y_test, LogicRegressor.predict(data_test, threshold=0.66, W=weights_of_the_model)))
# print(weights_of_the_model)
# straight correlations:
# y1 = pd.Series(data["TenYearCHD"])
# for x in data.columns:
#     x1 = data[x]
#     print(f"{x} and CHD: ", y1.corr(x1))