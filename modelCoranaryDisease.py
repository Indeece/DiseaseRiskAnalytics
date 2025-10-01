# First model to predict coronary heart disease

import numpy as np
import pandas as pd

import matplotlib.pyplot as plt

from collections import Counter

from sklearn.base import RegressorMixin # we'll inherit this in our class for calling class's structure
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

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


class SGDLogisticRegression(RegressorMixin):
    def __init__(self, lr=0.01, delta_converged=1e-100, max_steps=10e4, batch_size=64):
        self.lr = lr  # learning rate. The importance of moving the weight vector towards anti-gradient in SGD.
        self.delta_converged = delta_converged  # when the learning will stop.
        self.max_steps = max_steps  # how many steps SGD can make.
        self.batch_size = batch_size  # the size of batch in SGD.
        self.scaler = StandardScaler()

        self.W = None  # the weight vector

    def fit(self, X, Y):

        L, F = X.shape  # L - the length of samples, F - number of features.
        self.W = np.zeros((F, 1))  # the weight column vector.

        current_step = 0  # the SGD step.
        continueFlag = True  # the condition that we haven't reached max steps.

        X_shuffled = X.copy()
        Y_shuffled = Y.copy()

        X_shuffled = self.scaler.fit_transform(X_shuffled)  # teach the scaler on our data and transform our data.

        while (current_step < self.max_steps and continueFlag):
            # Shuffle the samples
            indices = np.arange(0, L)  # for example  [   0    1    2 ... 4235 4236 4237]
            np.random.shuffle(indices)  # for example now they are [ 133  950 2391 ...  725  373 3181]

            X_shuffled = X_shuffled[indices]
            Y_shuffled = Y_shuffled[indices]

            break

# print(data)
test_size = 0.3
random_state = 42
data_train, data_test, Y_train, Y_test = train_test_split(data.drop("TenYearCHD", axis=1),
                                                          np.array(data["TenYearCHD"]), test_size=test_size,
                                                          random_state=random_state)
LogicRegressor = SGDLogisticRegression()
LogicRegressor.fit(data_train, Y_train)