import json

from collections import namedtuple
from json import JSONEncoder
from flask import Flask,request
from flasklstm import lstm_open_predict, lstm_low_predict, lstm_close_predict, lstm_high_predict
from flask_cors import CORS
import pandas as pd
import numpy as np
#import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
app = Flask(__name__)

CORS(app)
df = pd.read_csv('eurusd.csv')
data_close = df.filter(['close'])
data_high = df.filter(['high'])
data_low = df.filter(['low'])
data_open = df.filter(['open'])

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


# @app.route("/predict")
# def predict():
#     last_20_close = df['close'].tail(10).values

#     # Select the last 20 values from the "high" column
#     last_20_high = df['high'].tail(10).values


#     # Select the last 20 values from the "low" column
#     last_20_low = df['low'].tail(10).values

#     # Select the last 20 values from the "open" column
#     last_20_open = df['open'].tail(10).values
#     result_open=lstm_open_predict(last_20_open) 
#     result_low=lstm_low_predict(last_20_low) 
#     result_close=lstm_close_predict(last_20_close) 
#     result_high=lstm_high_predict(last_20_high)
#     last_20_open = np.append(last_20_open, result_open)
#     last_20_high = np.append(last_20_high, result_high)
#     last_20_low = np.append(last_20_low, result_low)
#     last_20_close = np.append(last_20_close, result_close)
#     print("Calling from server.py")
#     print(result_open,result_high,result_low,result_close)
#     return json.dumps()


import json

@app.route("/predict")
def predict():
    last_20_close = df['close'].tail(10).values

    # Select the last 20 values from the "high" column
    last_20_high = df['high'].tail(10).values

    # Select the last 20 values from the "low" column
    last_20_low = df['low'].tail(10).values

    # Select the last 20 values from the "open" column
    last_20_open = df['open'].tail(10).values
    result_open = np.round(lstm_open_predict(last_20_open), 5) 
    result_low = np.round(lstm_low_predict(last_20_low), 5) 
    result_close = np.round(lstm_close_predict(last_20_close), 5) 
    result_high = np.round(lstm_high_predict(last_20_high), 5)
    last_20_open = np.append(last_20_open, result_open)
    last_20_high = np.append(last_20_high, result_high)
    last_20_low = np.append(last_20_low, result_low)
    last_20_close = np.append(last_20_close, result_close)
    print("Calling from server.py")
    print(result_open, result_high, result_low, result_close)
    
    # create a dictionary containing the arrays
    response = {
        "last_20_open": last_20_open.round(5).tolist(),
        "last_20_high": last_20_high.round(5).tolist(),
        "last_20_low": last_20_low.round(5).tolist(),
        "last_20_close": last_20_close.round(5).tolist()
    }
    
    # convert the dictionary to a JSON string and return it as the response
    return json.dumps(response)



if __name__  == '__main__':
    app.run(debug=True)

