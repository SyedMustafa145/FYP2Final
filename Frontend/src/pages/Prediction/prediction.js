import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Prediction = () => {
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { title: "Prediction Chart", link: "#" },
    { title: "Forex", link: "#" },
  ]);

  const [last20Open, setLast20Open] = useState([]);
  const [last20High, setLast20High] = useState([]);
  const [last20Low, setLast20Low] = useState([]);
  const [last20Close, setLast20Close] = useState([]);

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  
  const dates = [];
  for (let i = 10; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }

  const series = [
    {
      name: "candle",
      data: last20Open.map((value, index) => [
        dates[index],
        last20Open[index],
        last20High[index],
        last20Low[index],
        last20Close[index],
      ]),
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "candlestick",
    },
    title: {
      text: "CandleStick Chart - Category X-axis",
      align: "left",
    },
    annotations: {
      xaxis: [
        {
          x: "Oct 06 14:00",
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              fontSize: "12px",
              color: "#fff",
              background: "#00E396",
            },
            orientation: "horizontal",
            offsetY: 7,
            text: "Annotation Test",
          },
        },
      ],
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        format: "MMM dd", // Format the date label
        style: {
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
        },
      },
      tickAmount: 11, // Set the number of ticks to 11 for 11 days
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        right: 30, // Add padding on the right side to avoid overlapping of labels
      },
    },
  };

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
        { console.log("Dates are : ",dates)}
        <Container fluid>
          <Breadcrumbs
            title="Forex Prediction Chart"
            breadcrumbItems={breadcrumbItems}
          />
          <Row>
            <div id="chart">
              <ReactApexChart
                options={options}
                series={series}
                type="candlestick"
                height={550}
              />
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Prediction;
