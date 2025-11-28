from sklearn.base import RegressorMixin # we'll inherit this in our class for calling class's structure
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import pandas as pd

class SGDLogisticRegression(RegressorMixin):
    def __init__(self, lr=0.002, delta_converged=1e-3, max_steps=10000, batch_size=64):
        self.lr = lr  # learning rate. The importance of moving the weight vector towards anti-gradient in SGD.
        self.delta_converged = delta_converged  # when the learning will stop.
        self.max_steps = max_steps  # how many steps SGD can make.
        self.batch_size = batch_size  # the size of batch in SGD.
        self.scaler = StandardScaler()  # normalization of the features
        # self.threshold = threshold              # the probability when the model start to predict class 1.
        # (it subtracts the mean and divides it by standard bias).

        self.W = None  # the weight vector

    def fit(self, X, Y):

        L, F = X.shape  # L - the length of samples, F - number of features.
        self.W = np.array([float(np.random.randint(0, 10)) for _ in range(F)])  # the weight column vector.

        current_step = 0  # the SGD step.
        continue_flag = True  # the condition that we haven't reached max steps.

        # uncomment it if you want to pyplot how the model was learning
        # history_loss = []
        # current_epoch = 1

        X_shuffled = X.copy()
        Y_shuffled = Y.copy()
        # print(type(X_shuffled))
        X_shuffled = self.scaler.fit_transform(X_shuffled)  # teach the scaler on our data and transform our data.
        # print(type(X_shuffled))

        while (current_step < self.max_steps and continue_flag):
            # Shuffle the samples
            indices = np.arange(0, L)  # for example  [   0    1    2 ... 4235 4236 4237]
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
                    probability = [1 / (1 + np.e ** -np.dot(self.W, X_batch[x])) for x in range(len(X_batch))]
                    # np.e ** np.dot(self.W, X_batch[x])) for x in range(len(X_batch)) - can be positive

                    # calculate the gradient
                    grad = np.dot(X_batch.T, (probability - Y_batch))
                    # if positive, then here it should be backwards: Y_batch - probability
                    # move the weight vector towards anti-gradient
                    self.W -= self.lr*grad
                    # print(self.W)
                    # if current_step%100 == 0:
                    # print(f"Training is finished on {current_step/100}%")
                    # print(self.W)

                    current_step += 1
                    if np.linalg.norm(self.W - last_weight_vector) < self.delta_converged:
                        continue_flag = False
                        break
                else:
                    continue_flag = False
                    break

            # uncomment it if you want to pyplot how the model was learning
            # acc_score = accuracy_score(Y_shuffled, [1 if i > 0.48 else 0 for i in
            #                                         [1 / (1 + np.e ** -np.dot(self.W, X_shuffled[x])) for x in
            #                                          range(len(X_shuffled))]])
            # history_loss.append(acc_score)
            # print("The current epoch ", current_epoch)
            # current_epoch += 1
        # uncomment it if you want to pyplot how the model was learning
        # plt.plot(np.arange(1, len(history_loss) + 1), history_loss, color='darkorange')
        # plt.title("The Model's Process of Learning over time")
        # plt.ylabel("Accuracy")
        # plt.xlabel("Amount of epochs")
        # plt.show()
        # history_loss.clear()

        return self.W

    def predict(self, X, threshold=0.5):
        x_scaled = self.scaler.transform(X)

        # for just one sample it gives straightly one number - probability

        probability = 1 / (1 + np.e ** -np.dot(self.W, x_scaled.T))  # np.e **  - can be positive
        return round(float(probability)*100, 2)

        # for many samples it gives you a list of 1 and zeros
        #
        # probability = [1 / (1 + np.e ** -np.dot(self.W, x_scaled[x])) for x in range(len(x_scaled))]
        # return [1 if probability[x] >= threshold else 0 for x in range(len(probability))]

