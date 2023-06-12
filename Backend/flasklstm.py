import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import LSTM, Dense

# Load the CSV file into a pandas dataframe
df = pd.read_csv('eurusd.csv')

# Select the columns we will use for the model
data_close = df.filter(['close'])
data_high = df.filter(['high'])
data_low = df.filter(['low'])
data_open = df.filter(['open'])


# Convert the dataframe to a numpy array
dataset_close = data_close.values
dataset_high = data_high.values
dataset_low = data_low.values
dataset_open = data_open.values

# Define the number of days to use in the LSTM model
n_days = 10


# Scale the data to be between 0 and 1
scaler_close = MinMaxScaler(feature_range=(0, 1))
scaled_data_close = scaler_close.fit_transform(dataset_close)

# Scaling values for the High 
scaler_high = MinMaxScaler(feature_range=(0, 1))
scaled_data_high = scaler_high.fit_transform(dataset_high)


# Scaling values for the Low 
scaler_low = MinMaxScaler(feature_range=(0, 1))
scaled_data_low = scaler_low.fit_transform(dataset_low)


# Scaling values for the Open 
scaler_open = MinMaxScaler(feature_range=(0, 1))
scaled_data_open = scaler_open.fit_transform(dataset_open)



# Load the Models
from tensorflow.keras.models import load_model
# For closing
model_lstm_close = load_model('my_model.h5')
# For High 
model_lstm_high = load_model('fx_model_prediction_high.h5')
# For Low
model_lstm_low = load_model('fx_model_prediction_low.h5')
# For open
model_lstm_open = load_model('fx_model_prediction_open.h5')


# Select the last 20 values from the "close" column
last_20_close = df['close'].tail(10).values

# Select the last 20 values from the "high" column
last_20_high = df['high'].tail(10).values


# Select the last 20 values from the "low" column
last_20_low = df['low'].tail(10).values

# Select the last 20 values from the "open" column
last_20_open = df['open'].tail(10).values



def lstm_open_predict(input_data):
  
  # Scale the input data using the same scaler used for training
  scaled_input = scaler_open.transform(input_data.reshape(-1, 1))
  #print(scaled_input)

  # Reshape the input data for LSTM
  input_data = np.reshape(scaled_input, (1, n_days, 1))
  #print(input_data)
  # Get the model's predicted price value for the input data
  prediction = model_lstm_open.predict(input_data)

  # Unscale the predicted value
  prediction = scaler_open.inverse_transform(prediction)

  # Print the predicted value
  print("predicted value=",prediction[0][0])
  return prediction[0][0]



def lstm_low_predict(input_data):
  
  # Scale the input data using the same scaler used for training
  scaled_input = scaler_low.transform(input_data.reshape(-1, 1))
  #print(scaled_input)

  # Reshape the input data for LSTM
  input_data = np.reshape(scaled_input, (1, n_days, 1))
  #print(input_data)
  # Get the model's predicted price value for the input data
  prediction = model_lstm_low.predict(input_data)

  # Unscale the predicted value
  prediction = scaler_low.inverse_transform(prediction)

  # Print the predicted value
  print("predicted value=",prediction[0][0])
  return prediction[0][0]



def lstm_close_predict(input_data):
  
  # Scale the input data using the same scaler used for training
  scaled_input = scaler_close.transform(input_data.reshape(-1, 1))
  #print(scaled_input)

  # Reshape the input data for LSTM
  input_data = np.reshape(scaled_input, (1, n_days, 1))
  #print(input_data)
  # Get the model's predicted price value for the input data
  prediction = model_lstm_close.predict(input_data)

  # Unscale the predicted value
  prediction = scaler_close.inverse_transform(prediction)

  # Print the predicted value
  print("predicted value=",prediction[0][0])
  return prediction[0][0]



def lstm_high_predict(input_data):
  
  # Scale the input data using the same scaler used for training
  scaled_input = scaler_high.transform(input_data.reshape(-1, 1))
  #print(scaled_input)

  # Reshape the input data for LSTM
  input_data = np.reshape(scaled_input, (1, n_days, 1))
  #print(input_data)
  # Get the model's predicted price value for the input data
  prediction = model_lstm_high.predict(input_data)

  # Unscale the predicted value
  prediction = scaler_high.inverse_transform(prediction)

  # Print the predicted value
  print("predicted value=",prediction[0][0])
  return prediction[0][0]


# Calling the func to get the Close Prediction for the nth day
# Select the last 10 values after skipping the last 10
# print("\n\n\n\nCalling -> Close Predict")
# input_data_close = last_20_close
# print(input_data_close)

# result_c=lstm_close_predict(input_data_close)



# # Calling the func to get the High Prediction for the nth day
# print("\n\n\n\nCalling -> High Predict")
# # Select the last 10 values after skipping the last 10
# input_data_high = last_20_high
# print(input_data_high)

# result_h=lstm_high_predict(input_data_high)



# # Calling the func to get the High Prediction for the nth day
# print("\n\n\n\nCalling -> Low Predict")
# # Select the last 10 values after skipping the last 10
# input_data_low = last_20_low
# print(input_data_low)
# result_l=lstm_low_predict(input_data_low)


# Calling the func to get the High Prediction for the nth day
# print("\n\n\n\nCalling -> Open Predict")
# # Select the last 10 values after skipping the last 10
# input_data_open = last_20_open
# print(input_data_open)
# result_o=lstm_open_predict(input_data_open)

