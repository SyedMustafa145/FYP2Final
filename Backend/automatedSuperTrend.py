import pandas as pd
import MetaTrader5 as mt5
import numpy as np
from supertrend import getSuperTrend
from supertrend import generateSignal
import math
#from supertrenBacktest import Strategy
import time
from datetime import datetime, timedelta


#setting Variables
SYMBOL = 'EURUSD'
TIMEFRAME = mt5.TIMEFRAME_M15
deviation = 20
MAGIC = 999
TICKET = 1612512523
mt5.initialize(login = 51054165,      
   password="ywa8FtEY",   
   server = "ICMarketsSC-Demo")
#Making Market Order
def makingOrder(volume,orderType,checkData):
    lastRow = len(checkData.index) - 1
    prevRow = lastRow - 1
   
    if orderType == 'Buy':
        if (checkData['superTrend'][lastRow] == True and checkData['superTrend'][prevRow] == False) or (checkData['superTrend'][lastRow] == True and checkData['superTrend'][prevRow] == True):
            
            SL = checkData['lowerBand'][lastRow] - 0.0005
            TP = checkData['close'][lastRow] - SL 
             
            if (TP <= 5):
                TP = 1.5 * TP
                TP = checkData['close'][lastRow] + TP
            else:
                SL = checkData['lowerBand'][lastRow] + 0.0002
                TP = 1.5 * TP
                TP = checkData['close'][lastRow] + TP
        request = {
            "action": mt5.TRADE_ACTION_DEAL,
            "symbol": 'EURUSD',
            "volume": volume,
            "type": mt5.ORDER_TYPE_BUY,
            "price": mt5.symbol_info_tick('EURUSD').ask,
            'tp' : TP,
            'sl' : SL,
            "magic": MAGIC,
            "comment": "Started Position",
            "type_time": mt5.ORDER_TIME_GTC,
            "type_filling": mt5.ORDER_FILLING_IOC,
        }
        print("Setting TP as: ", TP)
        print("Setting SL as: ", SL)
        result = mt5.order_send(request)
        print(result)
    else:
        if (checkData['superTrend'][lastRow] == False and checkData['superTrend'][prevRow] == True) or (checkData['superTrend'][lastRow] == False and checkData['superTrend'][prevRow] == False):
                SL = checkData['upperBand'][lastRow] + 0.0005
                TP = SL - checkData['close'][lastRow]
                
                if (TP <= 5):
                    TP = 1.5 * TP
                    TP = checkData['close'][lastRow] - TP
                    
                else:
                    SL = checkData['upperBand'][lastRow] - 0.0002
                    TP = 1.5 * TP
                    TP = checkData['close'][lastRow] - TP
                
        request = {
            "action": mt5.TRADE_ACTION_DEAL,
            "symbol": 'EURUSD',
            "volume": volume,
            "type": mt5.ORDER_TYPE_SELL,
            "price": mt5.symbol_info_tick('EURUSD').bid,
            'tp' : TP,
            'sl' : SL,
            "magic": MAGIC,
            "comment": "Started Position",
            "type_time": mt5.ORDER_TIME_GTC,
            "type_filling": mt5.ORDER_FILLING_IOC,
        }
        print("Setting TP as: ", TP)
        print("Setting SL as: ", SL)
        result = mt5.order_send(request)
        print(result)


def checkSignal(checkData):
    print("Checking for Signal")
    lastRow = len(checkData.index) - 1
    prevRow = lastRow - 1
    print(checkData.tail(2))
    if (checkData['signal'][prevRow] == 'NoPosition' and checkData['signal'][lastRow] == 'Buy') or (checkData['signal'][prevRow] == 'NoPosition' and checkData['signal'][lastRow] == 'emaBuy') or (checkData['signal'][prevRow] == 'Buy' and checkData['signal'][lastRow] == 'NoPosition') or (checkData['signal'][prevRow] == 'emaBuy' and checkData['signal'][lastRow] == 'NoPosition'):
        order = 'Buy' 
        return order 
    elif (checkData['signal'][prevRow] == 'NoPosition' and checkData['signal'][lastRow] == 'Sell') or (checkData['signal'][prevRow] == 'NoPosition' and checkData['signal'][lastRow] == 'emaSell') or (checkData['signal'][prevRow] == 'Sell' and checkData['signal'][lastRow] == 'NoPosition') or (checkData['signal'][prevRow] == 'emaSell' and checkData['signal'][lastRow] == 'NoPosition'): 
        order = 'Sell'
        return order
    else:
        return 'No Signal' 
    
#trailing SL
def trail_sl(checkData):
    # get position based on ticket_id
    position = mt5.positions_get()
    info = mt5.account_info()
    lastRow = len(checkData.index) - 1
    prevRow = lastRow - 1
    bal = info.balance
    equ = info.equity
    # check if position exists
    if position:
        position = position[0]
    else:
        print('Position does not exist')

    # get position data
    order_type = position.type
    price_current = position.price_current
    price_open = position.price_open
    sl = position.sl
    vol = position.volume
    print("Trailing Stop-Loss")
    profit = equ - bal
    profMult = vol * 100000 * 0.0025
    #Checking if Trade is in Profit let's say it's lot size is 1 so 1*100*2.5=250$
    #Profitvar gives us the value if we are in profit or not 
    #Now if the balance is greater than 250$ it will change the SL to entry so we remain on safe side
    if (profit >= profMult):
        #for Buy
        if (checkData['superTrend'][lastRow] == False and checkData['superTrend'][prevRow] == True) or (checkData['superTrend'][lastRow] == True and checkData['superTrend'][prevRow] == True):
            SL = checkData['lowerBand'][lastRow] - 0.0005
            TP = checkData['close'][lastRow] - SL 
            TP = 1.5 * TP
            TP = checkData['close'][lastRow] + TP
            
            request = {
                        'action': mt5.TRADE_ACTION_SLTP,
                        'position': position.ticket,
                        'sl': price_open,
                        'tp' : TP
                    }
            result = mt5.order_send(request)
            print(result)

        elif (checkData['superTrend'][lastRow] == True and checkData['superTrend'][prevRow] == False) or (checkData['superTrend'][lastRow] == False and checkData['superTrend'][prevRow] == False):
                SL = checkData['upperBand'][lastRow] + 0.0005
                TP = SL - checkData['close'][lastRow]
                TP = 1.5 * TP
                TP = checkData['close'][lastRow] - TP
                
                request = {
                        'action': mt5.TRADE_ACTION_SLTP,
                        'position': position.ticket,
                        'sl': price_open,
                        'tp' : TP
                    }
                result = mt5.order_send(request)
                print(result)
          


    
    elif (equ < bal): #If Trade is not in profit
        lastRow = len(checkData.index) - 1
        prevRow = lastRow - 1
        #for Buy/emaBuy
        if (checkData['superTrend'][lastRow] == False and checkData['superTrend'][prevRow] == True) or (checkData['superTrend'][lastRow] == True and checkData['superTrend'][prevRow] == True):
            SL = checkData['lowerBand'][lastRow] - 0.0005
            TP = checkData['close'][lastRow] - SL 
            TP = 1.5 * TP
            TP = checkData['close'][lastRow] + TP
            differ = price_open - SL
            if(differ >= 0.0050 and differ < 0.0060):
                SL = checkData['lowerBand'][lastRow] + 0.0025
            elif(differ >= 0.0060 and differ < 0.0070):
                SL = checkData['lowerBand'][lastRow] + 0.003
            elif (differ >= 0.0070 and differ < 0.008):
                SL = checkData['lowerBand'][lastRow] + 0.004
            elif (differ >= 0.008 and differ < 0.009):
                SL = checkData['lowerBand'][lastRow] + 0.005
            elif (differ >= 0.009 and differ < 0.010):
                SL = checkData['lowerBand'][lastRow] + 0.006
            elif (differ >= 0.010 and differ < 0.011):
                SL = checkData['lowerBand'][lastRow] + 0.007
            elif (differ >= 0.011 and differ < 0.012):
                SL = checkData['lowerBand'][lastRow] + 0.008
            elif (differ >= 0.012 and differ < 0.013):
                SL = checkData['lowerBand'][lastRow] + 0.009
            elif (differ >= 0.013 and differ < 0.014):
                SL = checkData['lowerBand'][lastRow] + 0.010
            elif (differ >= 0.014):
                SL = checkData['lowerBand'][lastRow] + 0.011  

                    
                
            #setting SL above 5 pips of UpperBand for Sell Signal/emaSell
        elif (checkData['superTrend'][lastRow] == True and checkData['superTrend'][prevRow] == False) or (checkData['superTrend'][lastRow] == False and checkData['superTrend'][prevRow] == False):
            SL = checkData['upperBand'][lastRow] + 0.0005
            TP = SL - checkData['close'][lastRow]
            TP = 1.5 * TP
            TP = checkData['close'][lastRow] - TP
            differ = SL - price_open
            
            if(differ >= 0.005 and differ < 0.006):
                SL = checkData['upperBand'][lastRow] - 0.0025
            elif(differ >= 0.006 and differ < 0.007):
                SL = checkData['upperBand'][lastRow] - 0.0035
            elif (differ >= 0.007 and differ < 0.008):
                SL = checkData['upperBand'][lastRow] - 0.004
            elif (differ >= 0.008 and differ < 0.009):
                SL = checkData['upperBand'][lastRow] - 0.005
            elif (differ >= 0.009 and differ < 0.010):
                SL = checkData['upperBand'][lastRow] - 0.006
            elif (differ >= 0.010 and differ < 0.011):
                SL = checkData['upperBand'][lastRow] - 0.007
            elif (differ >= 0.011 and differ < 0.012):
                SL = checkData['upperBand'][lastRow] - 0.008
            elif (differ >= 0.012 and differ < 0.013):
                SL = checkData['upperBand'][lastRow] - 0.009
            elif (differ >= 0.013 and differ < 0.014):
                SL = checkData['upperBand'][lastRow] - 0.010
            elif (differ >= 0.014):
                SL = checkData['upperBand'][lastRow] - 0.011

        request = {
                'action': mt5.TRADE_ACTION_SLTP,
                'position': position.ticket,
                'sl': SL,
                'tp' : TP
            }
        result = mt5.order_send(request)
        print(result)
def OpenedPosition():
    position = mt5.positions_get()
    if position:
        position = position[0]
        return True
    else:
        print('Position does not exist')
        return False

