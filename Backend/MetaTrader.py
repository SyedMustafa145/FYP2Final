import MetaTrader5 as mt5
from datetime import datetime
#mt5.initialize(login=51051304, password="EqiH3BP6", server="ICMarketsSC-Demo")

mt5.initialize()

def makingOrder(volume, orderType,symbol):
    MAGIC = 10009
    if orderType == 'Buy':

        lot = 0.1
        point = mt5.symbol_info(symbol).point
        price = mt5.symbol_info_tick(symbol).ask
        deviation = 20
        request = {
            "action": mt5.TRADE_ACTION_DEAL,
            "symbol": symbol,
            "volume": volume,
            "type": mt5.ORDER_TYPE_BUY,
            "price": price,
            "sl": price - 100 * point,
            "tp": price + 100 * point,
            "deviation": deviation,
            "magic": 234000,
            "comment": "python script open",
            "type_time": mt5.ORDER_TIME_GTC,
            "type_filling": mt5.ORDER_FILLING_RETURN,
        }

        result = mt5.order_send(request)
        print(result)
        return result
    else:
        request = {
            "action": mt5.TRADE_ACTION_DEAL,
            "symbol": symbol,
            "volume": volume,
            "type": mt5.ORDER_TYPE_SELL,
            "price": mt5.symbol_info_tick(symbol).bid,
            "magic": MAGIC,
            "comment": "Started Position",
            "type_time": mt5.ORDER_TIME_GTC,
            "type_filling": mt5.ORDER_FILLING_IOC,
        }

        result = mt5.order_send(request)
        print(result)
        return result


def func_orderType(number):
    if number == 2:
        return "buy limit"
    elif number == 5 :
        return "sell limit"
    else:
        return number


def getTradeHistory():
    # get the number of orders in history
    response_orders = []
    orders_info = mt5.orders_get()
    print(orders_info)
    for order in orders_info:
        print(order[0],order[1],order[2],order[3],order[4])
        print("\n")
        print(order[14],order[6],order[7],order[8],order[9])

        # Convert the time_setup value to a datetime object
        time_setup_datetime = datetime.fromtimestamp(order[1])

        # Print the result in a user-friendly format
        order_time  = (time_setup_datetime.strftime("%Y-%m-%d %H:%M:%S"))

        story = {
            'symbol': order[21],
            'ticket': order[0],
            'time' : order_time,
            'type' :  func_orderType(order[6]),
            'volume' : order[14],
            'price': order[16]
        }


        response_orders.append(story)

    return response_orders

    # shut down connection to the MetaTrader 5 terminal
