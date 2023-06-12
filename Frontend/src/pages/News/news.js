import React, { Component, useState, useEffect } from "react";
import { Spinner,Container, Row, Col, Card, CardBody } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import TradingViewChart from "../Dashboard/TradingViewChart";
import NewsLineItem from "./newslineitem";

const News_rfc = () => {
  // create a state name newsdata
  const [newsdata, setNewsData] = useState();

  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = async () => {
    console.log("getNewsData");
    const response = await fetch("http://localhost:5000/sentimentalanalysis/topic?topic=Forex");
    const data = await response.json();

    setNewsData(data);
    console.log(newsdata);
  };

  const [breadcrumbItems, setBreadcrumbitems] = useState([
    { title: "Forex", link: "#" },
    { title: "News", link: "#" },
  ]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Forex News" breadcrumbItems={breadcrumbItems} />

          <Row>
            <Col lg="8">
              
              {newsdata ? (
                newsdata.map((newsitem) => <NewsLineItem newsitem={newsitem} />)
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

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "News", link: "#" },
        { title: "Forex News", link: "#" },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Forex News"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col lg="8">
                <NewsLineItem />
                <NewsLineItem />
                <NewsLineItem />
                <NewsLineItem />

                <NewsLineItem />
                <NewsLineItem />
                <NewsLineItem />
                <NewsLineItem />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default News_rfc;
