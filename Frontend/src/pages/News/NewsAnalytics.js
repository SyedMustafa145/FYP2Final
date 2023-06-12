import React, { Component, useEffect, useState } from "react";
import { Card, CardBody, Row, Col, CardText, CardTitle } from "reactstrap";

//Import Charts
import ReactApexChart from "react-apexcharts";
import "../Dashboard/dashboard.scss";

const NewsAnalyticsComments = ({ props }) => {
  const [newsAbout, setNewsAbout] = useState(props[0]);
  const [DominantPercentage, setDominantPercentage] = useState(props[1]);

  function giveComment(keyword) {
    if (keyword == "Positive") {
      return "The currency pair could be profitable in the near future trade. Buy Trade is recommended.";
    } else if (keyword == "Negative") {
      return "The currency pair could be unprofitable in the near future trade. Sell Trade is recommended.";
    } else {
      return "that the currency pair opinion is neutral";
    }
  }

  return (
    <Row>
      <Card>
        <CardBody>
          <CardTitle style={{ color: "white", fontWeight: "bolder" }}>
            Stats Show:
          </CardTitle>

          <CardTitle>{giveComment(DominantPercentage)}</CardTitle>
        </CardBody>
      </Card>
    </Row>
  );
};

const NewsAnalyticsChart = ({ props }) => {
  console.log("series ", props);
  const [series, setSeries] = useState([props[0], props[1], props[2]]);
  console.log("series from props ", series);

  const state = {
    options: {
      labels: ["Positive", "Negative", "Neutral"],
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ["#90F873", "#ea1744", "#5a5a66"],
    },
  };

  return (
    <React.Fragment>
      <div id="donut-chart" className="apex-charts">
        <ReactApexChart
          options={state.options}
          series={series}
          type="donut"
          height="150"
        />
      </div>
    </React.Fragment>
  );
};

const NewsAnalytics = ({ props }) => {
  console.log("props in news about", props[1]);
  const [newsAbout, setNewsAbout] = useState(props[1]);
  const [predictiondata, setPredictiondata] = useState(
    props[0].map((item) => item.Prediction)
  );
  const [PositivePercent, setPositivePercent] = useState(0);
  const [NegativePercent, setNegativePercent] = useState(0);
  const [NeutralPercent, setNeutralPercent] = useState(0);
  const [DominantPercent, setDominantPercent] = useState("");
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getPredictionData();
  }, []);

  console.log("Data in NewsAnalytics", predictiondata);
  function getPredictionData() {
    if (predictiondata.length > 0) {
      var positive = 0;
      var negative = 0;
      var neutral = 0;

      predictiondata.forEach((item) => {
        if (item === "positive") {
          positive += 1;
        } else if (item === "negative") {
          negative += 1;
        } else {
          neutral += 1;
        }
      });

      var total = positive + negative + neutral;
      var positivepercent = (positive / total) * 100;
      var negativepercent = (negative / total) * 100;
      var neutralpercent = (neutral / total) * 100;

      // convert positivepercent to 2 decimal places

      // convert negativepercent to whole number
      negativepercent = Math.round(negativepercent);
      neutralpercent = Math.round(neutralpercent);
      positivepercent = Math.round(positivepercent);

      console.log("Positive", positivepercent);
      console.log("Negative", negativepercent);
      console.log("Neutral", neutralpercent);
      setPositivePercent(positivepercent);
      setNegativePercent(negativepercent);
      setNeutralPercent(neutralpercent);
      setSeries([positivepercent, negativepercent, neutralpercent]);
      console.table(series);

      if (
        positivepercent > negativepercent &&
        positivepercent > neutralpercent
      ) {
        setDominantPercent("Positive");
      } else if (
        negativepercent > positivepercent &&
        negativepercent > neutralpercent
      ) {
        setDominantPercent("Negative");
      }
      if (
        neutralpercent > positivepercent &&
        neutralpercent > negativepercent
      ) {
        setDominantPercent("Neutral");
      }
    }
  }

  if (PositivePercent > 0 || NegativePercent > 0 || NeutralPercent > 0) {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">
              News Analytics about your search : {newsAbout}
            </h4>
            {
              // check if series is not null
              series && <NewsAnalyticsChart props={series} />
            }

            <Row>
              <Col xs={4}>
                <div className="text-center mt-4">
                  <p
                    style={{ color: "#90F873" }}
                    className="mb-2 text-truncate"
                  >
                    <i className="mdi mdi-circle  font-size-10 me-1"></i>{" "}
                    Positive
                  </p>
                  <h5>{PositivePercent}%</h5>
                </div>
              </Col>
              <Col xs={4}>
                <div className="text-center mt-4">
                  <p
                    style={{ color: "#ea1744" }}
                    className="mb-2 text-truncate"
                  >
                    <i className="mdi mdi-circle  font-size-10 me-1"></i>{" "}
                    Negative
                  </p>
                  <h5>{NegativePercent} %</h5>
                </div>
              </Col>
              <Col xs={4}>
                <div className="text-center mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle  font-size-10 me-1"></i>{" "}
                    Neutral
                  </p>
                  <h5>{NeutralPercent}%</h5>
                </div>
              </Col>
            </Row>

            {
              // check if series is not null
              series && (
                <NewsAnalyticsComments props={[newsAbout, DominantPercent]} />
              )
            }
          </CardBody>
        </Card>
      </React.Fragment>
    );
  } else {
    return (
      <div>
        <h1>No Data</h1>
      </div>
    );
  }
};

export default NewsAnalytics;
