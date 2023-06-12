import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Components
import MiniWidgets from "./MiniWidgets";
import RevenueAnalytics from "./RevenueAnalytics";
import SalesAnalytics from "./SalesAnalytics";
import EarningReports from "./EarningReports";
import Sources from "./Sources";
import RecentlyActivity from "./RecentlyActivity";
import RevenueByLocations from "./RevenueByLocations";
import ChatBox from "./ChatBox";
import LatestTransactions from "./LatestTransactions";

import eurusd_img from "../../assets/images/currencypairs/eurusd.png";

import TradingViewChart from "./TradingViewChart";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "TradeBot", link: "/" },
        { title: "Dashboard", link: "#" },
      ],
      reports: [
        {
          icon: "ri-money-dollar-circle-line",
          title: "EUR/USD",
          value: "$ 0",
          rate: "2.4%",
          desc: "From previous period",
          img: "../../assets/images/currencypairs/eurusd.png",
        },
        {
          icon: "ri-money-dollar-circle-line",
          title: "USD/JPY",
          value: "$ 0",
          rate: "2.4%",
          desc: "From previous period",
          img: "../../assets/images/currencypairs/usdjpy.png",
        },
        {
          icon: "ri-money-dollar-circle-line",
          title: "AUD/USD",
          value: "$ 0",
          rate: "2.4%",
          desc: "From previous period",
          img: "../../assets/images/currencypairs/audusd.png",
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Dashboard"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            <Row>
              <Col xl={8}>
                <Row>
                  <MiniWidgets reports={this.state.reports} />
                </Row>

                {/* revenue Analytics */}
                <TradingViewChart />
                {/* <RevenueAnalytics/> */}
              </Col>

              <Col xl={4}>
                {/* sales Analytics */}
                <SalesAnalytics />

                {/* earning reports */}
                <EarningReports />
              </Col>
            </Row>


            {/* <Row>
              <Sources />

              <RecentlyActivity />
            </Row>

            <Row>
              <LatestTransactions />
            </Row> */}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
