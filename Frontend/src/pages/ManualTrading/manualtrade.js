import React, { Component, useState, useEffect } from "react";
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  InputGroup,
  Form,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { constant } from "lodash";


import TradingViewChart from '../Dashboard/TradingViewChart';


import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const ManualTrade = () => {

  const [trademode, setTradeMode] = useState("");
  const [symbol, setSymbol] = useState("");
  const [volume, setVolume] = useState(0);
  const [takeprofit, setTakeProfit] = useState(0);
  const [stoploss, setStopLoss] = useState(0);
  const [orderplaced, setOrderPlaced] = useState(false);


  const [valid, setvalid] = useState(false);

  const [breadcrumbItems, setBreadcrumbitems] = useState([
    { title: "Manual Trade", link: "#" },
  ]);

  const data = [
    {
      username: "Usama",
      password: "123456",
      servername: "abcserver",
    },
  ];


  const onSymbolChange = (e) => {
    console.log(e.target.value+"value")

    if (e.target.value === "")  
    {
      setSymbol("");
      alert("Please Select Symbol");
      return ;
    }

    if (e.target.value === "Select")
    {
      setSymbol("");
      alert("Please Select Symbol");
      return ;
    }

    setSymbol(e.target.value);




  }


  const onTradeModeChange = (e) => {
    
    console.log(e.target.value+"value")

    if (e.target.value === "Buy") {
      setTradeMode("Buy");
    }
    if (e.target.value === "Sell") {
      setTradeMode("Sell");
    }
    if (e.target.value === "Select") {
      setTradeMode("");
      alert("Please Select Trade Mode");
    }
    if (e.target.value === "") {
      setTradeMode("");
      alert("Please Select Trade Mode");
    }



    //setCurrencyPair(e.target.value);
    //setSearchStatus(false);
    
  };


  const handleSubmit = (e) => {
      e.preventDefault();
      // check if trade mode is selected
      if (trademode === "" || trademode==='Select') {
        alert("Please Select Trade Mode");
        return ;
      }
    
      // write a regular expression that can check if the volume is a floating number, not empty or a negative number
      if (volume === 0 || volume === "" || volume < 0) {
        alert("Invalid Volume");
        return ;
      }
      

      // check if take profit is a floating number, not empty or a negative number
      if ( takeprofit === "" || takeprofit < 0) {
        alert("Invalid Take Profit");
        return ;
      }

      // check if stop loss is a floating number, not empty or a negative number
      if ( stoploss === "" || stoploss < 0) {
        alert("Invalid Stop Loss");
        return ;
      }

      // check if stop loss is greater than take profit
      if ( stoploss > takeprofit) {
        alert("Stop Loss cannot be greater than Take Profit");
        return ;
      }


      if (symbol === "" || symbol === "Select") {
        alert("Please Select Symbol");
        return ;
      }
  
      placeorderrequest();  

    
  };



  const placeorderrequest = async() => {
    const response = await fetch(
      "http://localhost:5000/makeorder?volume=" + volume + "&trademode=" + trademode + "&symbol=" + symbol
    );
    const data = await response.json();
    console.log(data);
    if (data === "order placed") {
      setOrderPlaced(true);
      alert(data);
    } else {
      alert(data);
    }
  } 





  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Manual Trade"
            breadcrumbItems={breadcrumbItems}
          />
          <Row>
          <Col lg={6}>
          <TradingViewWidget
        symbol="EURUSD"
        theme={Themes.DARK}
        locale="en"
        autosize
        />
          </Col>

          <Col lg={6}>
            <Card>
              <CardBody>
                <h4 className="card-title">Enter Details</h4>
                <br />
               
                <AvForm>


                <Col lg={4}>
                <Label for="exampleSelect">Currency Pair</Label>
                     <Row lg={3} style={{"margin":"5px"}}>
                    
                    <select onChange={onSymbolChange} className="form-control" >
                      <option>Select</option>
                      <option>EURUSD</option>
                      <option>GBPUSD</option>
                    </select>
                    
                    </Row>
                </Col>
                <br/>

                <Row>
                
                <Col lg={4}>
                <Label for="exampleSelect">Trade Type</Label>
                     <Row lg={3} style={{"margin":"5px"}}>
                    
                    <select onChange={onTradeModeChange} className="form-control" >
                      <option>Select</option>
                      <option>Buy</option>
                      <option>Sell</option>
                    </select>
                    
                    </Row>
                    </Col>

                  
                    <Col lg={3} style={{"margin":"5px"}}>
                  <Label for="exampleSelect">Volume</Label>
                  <input
                    type='number'
                    step="0.01"
                    min='0.1'
                    max='50'
                    placeholder="0.1"
                    className='form-control'
                    onChange={(e) => setVolume(e.target.value)}
                
                    />

                    </Col>
                    </Row>

                    <br/>

                      <Label for="exampleSelect">Advance Options (Optional)</Label>
                      <Row lg={4}>
               
                     <Col lg={3} style={{"margin":"5px"}}>
                     <label>Take Profit (TP)</label> 
                     <input
                     onChange={(e) => setTakeProfit(e.target.value)}
                    type='number'
                    step="0.01"
                    min='0.1'
                    max='50'
                    placeholder="0.1"
                    className='form-control'
                    
                
                    />
                    
                    </Col>
                    <Col lg={3} style={{"margin":"5px"}}>
                    <label>Stop Loss (SL)</label> 
                    <input
                    type='number'
                    step="0.01"
                    min='0.1'
                    max='50'
                    placeholder="0.1"
                    className='form-control'
                    onChange={(e) => setStopLoss(e.target.value)}
                
                    />

                    </Col>
                    </Row>

                 
                      <br/>


                    <div>
                      <Button
                        type="submit"
                        color="primary"
                        className="me-1"
                        onClick={handleSubmit}
                      >
                        Place Order
                      </Button>{" "}
                      <Button type="reset" color="secondary">
                        Cancel
                      </Button>
                    </div>
                  
                    </AvForm>
              </CardBody>
            </Card>
            {orderplaced ? (
              <SweetAlert
                title="Your Trade has been placed."
                success
                showCancel
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                onConfirm={() => setOrderPlaced(false)}
                onCancel={() => setOrderPlaced(false)}
              >
                You can view your trade in the Trade History section.
              </SweetAlert>
            ) : null}
          </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ManualTrade;
