import React from 'react';

import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import {
    Row,
    Col,
    Card,
    CardBody,
    ButtonGroup,
    Button,
    Label,
  } from "reactstrap";

  



const TradingViewChart = () => {
    return (
        <React.Fragment>
            <Card style={{"height":"700px"}}>
                <CardBody style={{"height":"600px"}}>
        <TradingViewWidget
        symbol="EURUSD"
        theme={Themes.DARK}
        locale="en"
        autosize
        />
        </CardBody>
        </Card>
        </React.Fragment>
    );
    }

export default TradingViewChart;