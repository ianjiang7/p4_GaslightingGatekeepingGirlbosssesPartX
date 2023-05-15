import math
import pandas_datareader as web
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM
import matplotlib.pyplot as plt
from tensorflow.keras.callbacks import EarlyStopping
plt.style.use('fivethirtyeight')



import yfinance as yf

def get_prediction(ticker):
  df = yf.download(tickers=ticker, period="20d", interval="15m", auto_adjust=True)

  '''
  plt.figure(figsize=(16,8))
  plt.title('Close Price History')
  plt.plot(df['Close'])
  plt.xlabel('Date', fontsize=18)
  plt.ylabel('Closing Price USD($)', fontsize=18)
  plt.show()
  '''


  # Create a new dataframe with only the 'Close' column
  data = df.filter(['Close'])
  # Convert the datafram to a numpy array
  dataset = data.values
  # Get the number of rows to train the model on
  training_data_len = math.ceil(len(dataset) * .8) # use about 80% of data for trainng set
  '''
  training_data_len
  '''

  scaler = MinMaxScaler(feature_range=(0,1)) # sets data to values b/w 0 and 1(inclusive)
  scaled_data = scaler.fit_transform(dataset)

  train_data = scaled_data[0:training_data_len, :]
  # Split the data into x_train & y_train data sets
  x_train = []
  y_train = []

  for i in range(10, len(train_data)):
    x_train.append(train_data[i-10:i, 0])
    y_train.append(train_data[i, 0])
    if i <= 11:
      print(x_train)
      print(y_train)

  x_train, y_train = np.array(x_train), np.array(y_train)
  x_train = np.reshape(x_train, (x_train.shape[0], 1, x_train.shape[1]))


  model = Sequential()
  model.add(LSTM(50, return_sequences=True, input_shape=(1,x_train.shape[2])))
  model.add(LSTM(50, return_sequences=False))
  model.add(Dense(25))
  model.add(Dense(1))



  model.compile(optimizer='adam', loss='mean_squared_error', run_eagerly=True)

  model.fit(x_train, y_train, batch_size=30, epochs=10) 

  test_data = scaled_data[training_data_len - 10 : 521, :]
  # Split and create x_test & y_test
  x_test = []
  y_test = dataset[training_data_len:, :]
  for i in range(10, len(test_data)):
    x_test.append(test_data[i-10:i, 0])

  x_test = np.array(x_test)

  x_test = np.reshape(x_test, (x_test.shape[0], 1, x_test.shape[1]))


  predictions = model.predict(x_test)
  predictions = scaler.inverse_transform(predictions)

  if predictions[0,0] > data.iloc[0,0] :
      print (predictions[0,0])
      print (data.iloc[0,0])
      print ("yes")
  else:
      print (predictions[0,0])
      print (data.iloc[0,0])
      print ("no!")

get_prediction("NVDA")


