# First model to predict coronary heart disease

import numpy as np
import pandas as pd

import matplotlib.pyplot as plt

from collections import Counter

from sklearn.base import RegressorMixin # we'll inherit this in our class for calling class's structure
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, balanced_accuracy_score
np.random.seed(42)
random_state = 42
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

print(raw_data)
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
    def __init__(self, lr=0.01, delta_converged=1e-3, max_steps=10000, batch_size=64):
        self.lr = lr           # learning rate. The importance of moving the weight vector towards anti-gradient in SGD.
        self.delta_converged = delta_converged  # when the learning will stop.
        self.max_steps = max_steps              # how many steps SGD can make.
        self.batch_size = batch_size            # the size of batch in SGD.
        self.scaler = StandardScaler()          # normalization of the features
        # self.threshold = threshold              # the probability when the model start to predict class 1.
        # (it subtracts the mean and divides it by standard bias).

        self.W = None                           # the weight vector

    def fit(self, X, Y):

        L, F = X.shape        # L - the length of samples, F - number of features.
        self.W = np.zeros(F)  # the weight column vector.

        current_step = 0      # the SGD step.
        continue_flag = True  # the condition that we haven't reached max steps.

        X_shuffled = X.copy()
        Y_shuffled = Y.copy()
        # print(type(X_shuffled))
        X_shuffled = self.scaler.fit_transform(X_shuffled)  # teach the scaler on our data and transform our data.
        # print(type(X_shuffled))
        while (current_step < self.max_steps and continue_flag):
            # Shuffle the samples
            indices = np.arange(0, L)   # for example  [   0    1    2 ... 4235 4236 4237]
            # print(indices)
            np.random.shuffle(indices)  # for example now they are [ 133  950 2391 ...  725  373 3181]
            # print(indices)
            X_shuffled = X_shuffled[indices]
            Y_shuffled = Y_shuffled[indices]
            # print(X_shuffled)
            # print(Y_shuffled)
            # here comes a new epoch
            for i in range(0, L, self.batch_size):
                last_weight_vector = self.W.copy()
                if current_step != self.max_steps:

                    X_batch = X_shuffled[i: i + self.batch_size]  # create current batches
                    Y_batch = Y_shuffled[i: i + self.batch_size]

                    # calculate the sigmoid function for every row of data
                    probability = [1/(1 + np.e**np.dot(self.W, X_batch[x])) for x in range(len(X_batch))]
                    # calculate the gradient
                    grad = sum([np.dot(sum(X_batch[x]), (Y_batch - probability)[x]) for x in range(len(X_batch))])
                    # move the weight vector towards anti-gradient
                    self.W -= (self.lr * grad)

                    if current_step%100 == 0:
                        print(f"Training is finished on {current_step/100}%")
                        # print(self.W)

                    current_step += 1

                    if np.linalg.norm(self.W - last_weight_vector) < self.delta_converged:
                        continue_flag = False
                        break
                else:
                    continue_flag = False
                    break
        return self.W

    def predict(self, X, threshold=0.5):
        x_scaled = self.scaler.transform(X)
        probabilities = [1/(1 + np.e**np.dot(self.W, x_scaled[x])) for x in range(len(x_scaled))]
        return [1 if i > threshold else 0 for i in probabilities]

# print(data)
test_size = 0.3


data_train, data_test, Y_train, Y_test = train_test_split(data.drop("TenYearCHD", axis=1),
                                                          np.array(data["TenYearCHD"]), test_size=test_size,
                                                          random_state=random_state)
LogicRegressor = SGDLogisticRegression()  # our logistic Regression
weights_of_the_model = LogicRegressor.fit(data_train, Y_train)   # train our logistic Regression
# print(LogicRegressor.predict(data_test))
# thresholds = [x/100 for x in range(1, 100)]
thresholds = np.arange(0.01, 1, step=0.01)
best_threshold = 0
best_result = 0
# result = balanced_accuracy_score(Y_test, LogicRegressor.predict(data_test, threshold=0.5))  # see the metrics
# print(result)
for x in thresholds:
    result = balanced_accuracy_score(Y_test, LogicRegressor.predict(data_test, threshold=x))  # see the metrics
    if result > best_result:
        best_result = result
        best_threshold = x

print(f"The best result is {best_result} using threshold {best_threshold}") # balanced_accuracy_score = 0.648

# the best threshold is 0.45

result = balanced_accuracy_score(Y_test, LogicRegressor.predict(data_test, threshold=0.45))
print("Balanced_accuracy_score:", result)

# print(balanced_accuracy_score(Y_test, LogicRegressor.predict(data_test, threshold=0.66, W=weights_of_the_model)))
# print(weights_of_the_model)
# straight correlations:
# y1 = pd.Series(data["TenYearCHD"])
# for x in data.columns:
#     x1 = data[x]
#     print(f"{x} and CHD: ", y1.corr(x1))