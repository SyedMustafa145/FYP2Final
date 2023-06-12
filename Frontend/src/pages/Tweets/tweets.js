import React, { Component, useState, useEffect } from "react";
import { Spinner,Container, Row, Col, Card, CardBody } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import TradingViewChart from "../Dashboard/TradingViewChart";
import TweetsLineItem from "./tweetslineitem";

const Tweets_rfc = () => {
  // create a state name Tweetsdata
  const [Tweetsdata, setTweetsData] = useState();

  useEffect(() => {
    getTweetsData();
  }, []);

  const getTweetsData = async () => {
    console.log("getTweetsData");
    const response = await fetch("http://localhost:5000/sentimentalanalysis/topic?topic=Forex");
    const data = await response.json();

    setTweetsData(data);
    console.log(Tweetsdata);
  };

  const [breadcrumbItems, setBreadcrumbitems] = useState([
    { title: "Forex", link: "#" },
    { title: "Tweets", link: "#" },
  ]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Forex Tweets" breadcrumbItems={breadcrumbItems} />

          <Row>
            <Col lg="8">
              
              {Tweetsdata ? (
                Tweetsdata.map((Tweetsitem) => <TweetsLineItem Tweetsitem={Tweetsitem} />)
              ) : (
                <div className="text-center">
                    <Spinner className="me-2" color="primary" />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

class Tweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Tweets", link: "#" },
        { title: "Forex Tweets", link: "#" },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Forex Tweets"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col lg="8">
                <TweetsLineItem />
                <TweetsLineItem />
                <TweetsLineItem />
                <TweetsLineItem />

                <TweetsLineItem />
                <TweetsLineItem />
                <TweetsLineItem />
                <TweetsLineItem />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Tweets_rfc;
