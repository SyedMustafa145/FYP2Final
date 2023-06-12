from datetime import datetime
import pandas as pd
import MetaTrader5 as mt5

tradingTimeFrame = 15# set your trading time frame aka the time when new candle forms
executedCode = False # an indication whether you have executed your code or not
import automatedSuperTrend
SYMBOL = 'EURUSD'
TIMEFRAME = mt5.TIMEFRAME_M15

while True: # your main thread
    if datetime.now().minute % tradingTimeFrame == 0 and not executedCode:
        # invoke your main code or bot here in a new thread and exit when you take approprate decision there
        print("Just executed the code at: " + str(datetime.now().minute))
        print("Fetching Data...")
        data = mt5.copy_rates_from_pos(SYMBOL,TIMEFRAME,0,10000)
        bars = pd.DataFrame(data)
        bars['time']  = pd.to_datetime(bars['time'],unit='s')
        superTrend_data = automatedSuperTrend.getSuperTrend(bars)
        

        superTrend_data = automatedSuperTrend.generateSignal(superTrend_data)
        orderType = automatedSuperTrend.checkSignal(superTrend_data)

        checker = automatedSuperTrend.OpenedPosition()
        if checker == False:
            if orderType == 'Buy':
                print("Opening Buy Position")
                automatedSuperTrend.makingOrder(2.0,'Buy',superTrend_data)
                
            elif orderType == 'Sell':
                print("Opening Sell Position")
                automatedSuperTrend.makingOrder(2.0,'Sell',superTrend_data)
                
            else:
                print("No Signal Found!")
        elif checker == True:
            automatedSuperTrend.trail_sl(superTrend_data)
         
        executedCode = True
    
    elif datetime.now().minute % tradingTimeFrame != 0:
        executedCode = False

