import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Redirect } from "react-router-dom";
import {useState, useEffect } from "react";
import {
  Form,
  Input,
  CardTitle,
  CardText,
  Button,
  Spinner,
} from "reactstrap";
//Import Components
import MiniWidgets from "./MiniWidgets";
import RevenueAnalytics from "../Dashboard/RevenueAnalytics";
import SalesAnalytics from "../Dashboard/SalesAnalytics";
import EarningReports from "../Dashboard/EarningReports";
import Sources from "../Dashboard/Sources";
import RecentlyActivity from "../Dashboard/RecentlyActivity";
import RevenueByLocations from "../Dashboard/RevenueByLocations";
import ChatBox from "../Dashboard/ChatBox";
import LatestTransactions from "../Dashboard/LatestTransactions";

import eurusd_img from "../../assets/images/currencypairs/eurusd.png";

import TradingViewChart from "../Dashboard/TradingViewChart";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "TradeBot", link: "/" },
        { title: "Automated Trading", link: "#" },
      ],
      Tweetsdata: [],
      redirect: false, // Add this line
      currencyPair: '' // Also initialize currencyPair state
    };
    this.onCurrencyPairChange = this.onCurrencyPairChange.bind(this);
    this.startTrading = this.startTrading.bind(this);
  }
  
  startTrading() {
    this.setState({ redirect: true });
  }
  
  onCurrencyPairChange(event) {
    this.setState({ currencyPair: event.target.value });
    console.log(event.target.value);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/makeTrade/${this.state.currencyPair}`} />
    }
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Automated Trading"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            <Row>
              <Col xl={8}>
                <Row>
                  <MiniWidgets reports={this.state.reports} />
                </Row>
                <TradingViewChart />
              </Col>

              <Col xl={4}>
                <EarningReports />
                <SalesAnalytics />
              </Col>
            </Row>
          </Container>

          <Card>
            <CardBody>
              <Row>
                <Col lg={8}>
                  <Card>
                    <CardBody>
                      <CardTitle style={{ color: "white", fontWeight: "bold" }}>
                        Currency Pair Automated Trading
                      </CardTitle>

                      <Row>
                        <CardText>
                          Search for Automated Trading that you are looking for.
                        </CardText>

                        <Col lg={4}>
                          <Row lg={3} style={{ margin: "5px" }}>
                            <select
                              onChange={this.onCurrencyPairChange}
                              className="form-control"
                            >
                              <option>Select</option>
                              <option>XAUUSD</option>
                              <option>EURUSD</option>
                            </select>
                          </Row>
                        </Col>

                        <Col lg={6}>
                          <Row lg={2} style={{ margin: "5px" }}>
                            <Button
                              onClick={this.startTrading}
                              color="primary"
                              type="button"
                              className="waves-effect waves-light me-1"
                              size="lg"
                            >
                              Start Trading{" "}
                              {/* <i className=" ri-search-line align-middle ms-2"></i> */}
                              <i className="fas fa-robot align-middle ms-2"></i>
                            </Button>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
