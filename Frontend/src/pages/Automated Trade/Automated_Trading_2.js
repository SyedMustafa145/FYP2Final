import React, { useState,useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  Form,
  Input,
  CardTitle,
  CardText,
  Button,
  Spinner,
  Card,
  CardBody,
  Badge,
} from "reactstrap";
// Import Components
import MiniWidgets from "./MiniWidgets";
import RevenueAnalytics from "../Dashboard/RevenueAnalytics";
import SalesAnalytics from "../Dashboard/SalesAnalytics";
import EarningReports from "../Dashboard/EarningReports";
import Sources from "../Dashboard/Sources";
import RecentlyActivity from "../Dashboard/RecentlyActivity";
import RevenueByLocations from "../Dashboard/RevenueByLocations";
import ChatBox from "../Dashboard/ChatBox";
import LatestTransactions from "../Dashboard/LatestTransactions";
import { useParams } from "react-router-dom";
import eurusd_img from "../../assets/images/currencypairs/eurusd.png";
import TradingViewChart from "../Dashboard/TradingViewChart";
import Prediction from "../Prediction/prediction";
const Automated_Trading_2 = () => {
    const [currencyPair,setcurrencyPair]  = useState("XAUUSD");//useParams();
    const [breadcrumbItems, setBreadcrumbItems] = useState([
    { title: "TradeBot", link: "/" },
    { title: "Automated Trading", link: "/automatedtrade" },
    { title: "Make Trading", link: "#" },
  ]);

  const [last20Open, setLast20Open] = useState([]);
  const [last20High, setLast20High] = useState([]);
  const [last20Low, setLast20Low] = useState([]);
  const [last20Close, setLast20Close] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/predict");
        const data = await response.json();
        setLast20Open(data.last_20_open);
        setLast20High(data.last_20_high);
        setLast20Low(data.last_20_low);
        setLast20Close(data.last_20_close);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Automated Trading"
            breadcrumbItems={breadcrumbItems}
          />
          <Row>
            <Col xl={8}>
              <Row>
                <MiniWidgets/>
              </Row>
            </Col>

            
          </Row>

          <Row>
            <Col xl={5}>
              <TradingViewChart />
            </Col>

            <Col xl={7}>
            <Card >
                <CardBody >
            <Prediction />
            </CardBody>
            </Card>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <CardTitle style={{ color: "white", fontWeight: "bold" }}>
                        AI Predicted Price of 13 June
                      </CardTitle>

                      <Row>
                      <Col lg={2}>
                          <Row lg={3} style={{ margin: "5px" }}>
                          <div>
                            {/* <Badge className="bg-primary me-1">Primary</Badge> */}
                            {/* <Badge className="bg-success me-1">Open : 200</Badge>
                            <Badge className="bg-info me-1">High : 200</Badge> */}
                            {/* <Badge className="bg-warning me-1">Warning</Badge> */}
                            {/* <Badge className="bg-danger me-1">Low : 200</Badge>
                            <Badge className="bg-dark me-1">Close : 200</Badge> */}
                            <Badge className="bg-success me-1">
                                Open : {last20Open[last20Open.length - 1] || 'Loading...'}
                            </Badge>
                            <Badge className="bg-info me-1">
                                High : {last20High[last20High.length - 1] || 'Loading...'}
                            </Badge>
                            <Badge className="bg-danger me-1">
                                Low : {last20Low[last20Low.length - 1] || 'Loading...'}
                            </Badge>
                            <Badge className="bg-dark me-1">
                                Close : {last20Close[last20Close.length - 1] || 'Loading...'}
                            </Badge>

                            
                        </div>
                          </Row>
                        </Col>

                        <Col lg={2}>
                          <Row lg={2} style={{ margin: "5px" }}>
                          <div>
                          <Badge className="bg-primary me-1" style={{'padding': '10px 20px','fontSize': '20px'}}>
                                Long Buy
                            </Badge>
                            <Badge pill className="bg-warning me-1" style={{'padding': '10px 20px','fontSize': '20px'}}>
                                Sell Short
                            </Badge>
                            </div>
                          </Row>
                        </Col>

                        <Col lg={6}>
                          <Row lg={2} style={{ margin: "5px" }}>
                          <CardTitle style={{ color: "white", fontWeight: "bold" }}>
                        Finding The Optimal Trade Entry Position
                            </CardTitle>
                          </Row>
                        </Col>
                        
                        <Col lg={2}>
                          <Row lg={2} style={{ margin: "5px" }}>
                          <div className="text-center"><Spinner className="me-2" color="primary" /></div>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Automated_Trading_2;
