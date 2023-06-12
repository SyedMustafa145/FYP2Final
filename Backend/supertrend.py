import MetaTrader5 as mt5
import pandas as pd
import numpy as np
import talib 
import pandas_ta as pdta
from ta import trend
from ta import volume
from datetime import datetime, timedelta

import warnings 
warnings.filterwarnings('ignore')

mt5.initialize(login = 51054165, password="ywa8FtEY", server = "ICMarketsSC-Demo")
#getting Real time Data from Metatrader5
bars = mt5.copy_rates_range("EURUSD",mt5.TIMEFRAME_M15,datetime(2022,12,30),datetime.now())

#Converting data to DataFrame
df = pd.DataFrame(bars)


df['time']  = pd.to_datetime(df['time'],unit='s')



#plotting closing Prices on Line graph
# fig = px.line(df,x='time',y='close')
# fig.show()

#Function For Calculating True Range
 
# TR=Max[(H − L),Abs(H − CP),Abs(L−CP)]
# ATR = mean(TR)
def trueRange(df):
    df['prevClose'] = df['close'].shift(1)
    df['high-Low'] = df['high'] - df['low']
    df['high-PC'] = abs(df['high'] - df['prevClose'])
    df['low-PC'] = abs(df['low'] - df['prevClose'])
    TR = df[['high-Low','high-PC','low-PC']].max(axis=1)
    return TR



# var float center = na
# float lastpp = ph ? ph : pl ? pl : na
# if lastpp
#     if na(center)
#         center := lastpp
#     else
#         //weighted calculation
#         center := (center * 2 + lastpp) / 3

# // upper/lower bands calculation
# Up = center - (Factor * atr(Pd))
# Dn = center + (Factor * atr(Pd))


# Up = center - (Factor * atr(Pd))
# Dn = center + (Factor * atr(Pd))

# // get the trend
# float TUp = na
# float TDown = na
# Trend = 0
# TUp := close[1] > TUp[1] ? max(Up, TUp[1]) : Up
# TDown := close[1] < TDown[1] ? min(Dn, TDown[1]) : Dn
# Trend := close > TDown[1] ? 1: close < TUp[1]? -1: nz(Trend[1], 1)
# Trailingsl = Trend == 1 ? TUp : TDown



#calculating PivotPoint
def pivotPoint(df):
    df['PP'] = (df['high']+df['low']+df['close'])/3
    #S1= (P x 2) – Previous high
    df['PLow'] = (df['PP'] * 2) - df['high']
    #R1 = (P x 2) – Previous Low
    df['PHigh'] = (df['PP']*2) - df['low']
    return df










#calculating ATR
def ATR(df,period=10):
    df['TrueRange'] = trueRange(df)
    getAtr = df['TrueRange'].rolling(period).mean()
    return getAtr

def getSuperTrend(df,period=10,multiplier=1.5):
    
    
    #populating ATR and making Bands
    df['atr'] = ATR(df,period=period)
    df = pivotPoint(df)
    df['upperBand'] = (df['PHigh']) + (multiplier * df['atr'])
    df['lowerBand'] = (df['PLow']) - (multiplier * df['atr'])
    # df['upperBand'] = ((df['high'] + df['low'])/ 2) + (multiplier * df['atr'])
    # df['lowerBand'] = ((df['high'] + df['low'])/ 2) - (multiplier * df['atr'])
    
    #Calculating and Populating EMA
    df['ema'] = trend.ema_indicator(df['close'],window=200)
    df['adx'] = talib.ADX(df['high'],df['low'],df['close'],timeperiod=13)
    df.set_index('time',inplace = True)
    df['vwap'] = pdta.vwap(df['high'],df['low'],df['close'],df['tick_volume'],anchor='D')
    df.reset_index(inplace=True)
    

    #Making SuperTrend
    df['superTrend'] = True
    for curr in range(1,len(df.index)):
        prev = curr - 1
        if df['close'][curr] > df['upperBand'][prev]:
             df['superTrend'][curr] = True
        # if current close price crosses below lowerband
        elif df['close'][curr] < df['lowerBand'][prev]:
             df['superTrend'][curr] = False
        # else, the trend continues
        else:
            df['superTrend'][curr] =  df['superTrend'][prev]


            if  df['superTrend'][curr] == True and df['lowerBand'][curr] < df['lowerBand'][prev]:
                df['lowerBand'][curr] = df['lowerBand'][prev]
            if  df['superTrend'][curr] == False and df['upperBand'][curr] > df['upperBand'][prev]:
                df['upperBand'][curr] = df['upperBand'][prev]
        if df['superTrend'][curr] == True:
            df['upperBand'][curr] = np.nan
        else:
            df['lowerBand'][curr] = np.nan
    return df

getSuperTrend(df)

   


def generateSignal(df):
    #Kinds of Buy 
    #1. If SuperTrend > 200EMA and SuperTrend changes to True then return 'Buy'
    #2. If SuperTrend is previously True (Buy Signal) but Price(Close Price) < 200 then wait for Price to Break 200 EMA and then return 'emaBuy'
    #3. If SuperTrend < 200EMA and SuperTrend changes to False then return 'Sell'
    #4. If SuperTrend is previously False (Sell Signal) but Price(Close Price) > 200EMA then wait for Price to breakdown 200EMA and then return 
    #'emaSell'
    #5. No Buy Trade if Price is Below 200EMA and Buy signal pop then return '-1'
    #6. No Sell Trade if Price is Above 200EMA and Sell signal POPS. '-1'
    adxval = 18
    df['signal'] = 'NoPosition'
    for curr in range(199,len(df.index)):
        prev = curr - 1          
        if df['close'][curr] > df['ema'][curr] and df['close'][curr] > df['vwap'][curr] and df['superTrend'][prev] == False and df['superTrend'][curr] == True and df['adx'][curr] >= adxval and df['adx'][prev] < adxval  :
            df['signal'][curr] = 'Buy'
        elif df['close'][curr] > df['ema'][curr] and df['close'][curr] > df['vwap'][curr] and df['superTrend'][prev] == True and df['superTrend'][curr] == True and df['adx'][curr] >= adxval and df['adx'][prev] < adxval  :
            df['signal'][curr] = 'Buy'
        elif df['close'][curr] < df['ema'][curr] and df['close'][curr] < df['vwap'][curr] and df['superTrend'][prev] == True and df['superTrend'][curr] == False and  df['adx'][curr] >= adxval and df['adx'][prev] < adxval :
            df['signal'][curr] = 'Sell'
        elif df['close'][curr] < df['ema'][curr] and df['close'][curr] < df['vwap'][curr]  and df['superTrend'][prev] == False and df['superTrend'][curr] == False and df['adx'][curr] >= adxval and df['adx'][prev] < adxval :
            df['signal'][curr] = 'Sell'
        elif df['close'][prev] < df['ema'][prev] and df['close'][curr] > df['ema'][curr] and df['close'][curr] > df['vwap'][curr] and df['superTrend'][prev] == True and df['superTrend'][curr] == True and df['adx'][curr] >= adxval and df['adx'][prev] < adxval :
            df['signal'][curr] = 'emaBuy'
        elif df['close'][prev] > df['ema'][prev] and df['close'][curr] < df['ema'][curr] and df['close'][curr] < df['vwap'][curr] and df['superTrend'][prev] == False and df['superTrend'][curr] == False and df['adx'][curr] >= adxval and df['adx'][prev] < adxval :
            df['signal'][curr]= 'emaSell'
        
    return df


df = generateSignal(df)
print(df)
df.to_csv('superTrendsignal.csv')
count = 0
for curr in range(199,len(df.index)):
    if df['signal'][curr] == 'Buy' or df['signal'][curr] == 'emaBuy' or df['signal'][curr] == 'Sell' or df['signal'][curr] == 'emaSell':
        count+=1
print('Total Positions: ', count)




