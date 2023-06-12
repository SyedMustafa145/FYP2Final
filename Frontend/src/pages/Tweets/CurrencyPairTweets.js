import React, { Component, useState, useEffect } from "react";
import {
  Form,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Spinner,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//import CurrencyPairTweetslineitem from "./currencyTweetslineitem";
import TweetsLineItem from "./tweetslineitem";
import TweetsAnalytics from "./TweetsAnalytics";
import { constant } from "lodash";

const Tweets_rfc = () => {
  // create a state name Tweetsdata
  const [currencypair, setCurrencyPair] = useState("");
  const [Tweetsdata, setTweetsData] = useState(null);
  const [searchStatus, setSearchStatus] = useState();

  const onCurrencyPairChange = (e) => {
    setCurrencyPair(e.target.value);
    setSearchStatus(false);
  };

  const getTweetsData = async () => {
    if (currencypair === "" || currencypair === "Select") {
      alert("Please enter a currency pair");
      setCurrencyPair("");
    } else {
      setSearchStatus(true);
      console.log("getTweetsData");
      const response = await fetch(
        "http://localhost:5000/sentimentalanalysis/tweetstopic?topic=" + currencypair
      );
      const data = await response.json();
      // const data = [
      //   {
      //     title: "Demo-Title",
      //     description: "Demo-Description",
      //     urlToImage: "Demo-urlToImage",
      //     publishedAt: "Demo-PublishedAt",
      //     link: "Demo-Link",
      //     published: "Demo-Published",
      //     source: "Demo-Source",
      //     Prediction: "positive",
      //   },
      //   {
      //     title: "Demo-Title-2",
      //     description: "Demo-Description-2",
      //     urlToImage: "Demo-urlToImage-2",
      //     publishedAt: "Demo-PublishedAt-2",
      //     link: "Demo-Link-2",
      //     published: "Demo-Published-2",
      //     source: "Demo-Source-2",
      //     Prediction: "negative",
      //   },
      //   {
      //     title: "Demo-Title-3",
      //     description: "Demo-Description-3",
      //     urlToImage: "Demo-urlToImage-3",
      //     publishedAt: "Demo-PublishedAt-3",
      //     link: "Demo-Link-3",
      //     published: "Demo-Published-3",
      //     source: "Demo-Source-3",
      //     Prediction: "neutral",
      //   },
      // ];

      setTweetsData(data);
      console.log(Tweetsdata);
      setSearchStatus(false);

    }
  };

  const [breadcrumbItems, setBreadcrumbitems] = useState([
    { title: "Currencies", link: "#" },
    { title: "Tweets", link: "#" },
  ]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Currencies Tweets"
            breadcrumbItems={breadcrumbItems}
          />

          <Card>
            <CardBody>
              <Row>
                <Col lg={6}>
                  <Card>
                    <CardBody>
                      <CardTitle style={{ color: "white", fontWeight: "bold" }}>
                        Currency Pair Tweets
                      </CardTitle>

                      <Row>
                        <CardText>
                          Search for Tweets that you are looking for.
                        </CardText>

                        <Col lg={4}>
                          <Row lg={3} style={{ margin: "5px" }}>
                            <select
                              onChange={onCurrencyPairChange}
                              className="form-control"
                            >
                              <option>Select</option>
                              <option>EUR/USD</option>
                              <option>GBP/USD</option>
                              <option>USD/JPY</option>
                              <option>AUD/USD</option>
                              <option>EUR/GBP</option>
                              <option>USD/CAD</option>
                              <option>USD/CHF</option>
                              <option>NZD/CHF</option>
                            </select>
                          </Row>
                        </Col>

                        <Col lg={6}>
                          <Row lg={2} style={{ margin: "5px" }}>
                            <Button
                              onClick={getTweetsData}
                              color="primary"
                              type="button"
                              className="waves-effect waves-light me-1"
                            >
                              Search{" "}
                              <i className=" ri-search-line align-middle ms-2"></i>
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

          <Row style={{ margin: "5px" }}>
            {Tweetsdata != null ? (
              <CardTitle style={{ color: "white", fontWeight: "bold" }}>
                Showing results for {currencypair}
                <CardText className="text-muted">
                  Total Tweets : {Tweetsdata && Tweetsdata.length}
                </CardText>
              </CardTitle>
            ) : null}
          </Row>

          {searchStatus ? (
            <div className="text-center">
              <Spinner className="me-2" color="primary" />
            </div>
          ) : null}

          <Row>
            <Col lg={8}>
              {Tweetsdata &&
                Tweetsdata.map((Tweetsitem) => (
                  <TweetsLineItem Tweetsitem={Tweetsitem} />
                ))}
            </Col>

            <Col lg={4}>
              {Tweetsdata != null ? (
                <TweetsAnalytics props={[Tweetsdata, currencypair]} />
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Tweets_rfc;
