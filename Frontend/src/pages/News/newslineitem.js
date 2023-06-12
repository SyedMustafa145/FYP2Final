import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CardImg,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";

import googlenewsImg from "../../assets/images/News/google.png";

import eurousdimg from "../../assets/images/News/eurusd.png";

const NewsLineItem = ({ newsitem }) => {


  console.log(newsitem);
  return (
    <React.Fragment>
      <Card>
        <Row
          className="no-gutters align-items-center"
          style={{ padding: "20px" }}
        >
          <Col md={2}>
            <img
              className="img-fluid"
              src={googlenewsImg}
              alt={googlenewsImg}
            />
          </Col>

          <Col md={6}>
            <CardBody>
              <CardTitle style={{ color: "white" }}>
                {newsitem.source}
              </CardTitle>
              <CardText style={{ color: "white", fontSize: "16px" }}>
                {newsitem.title}
              </CardText>
              <CardText>
                Published:{" "}
                <small className="text-muted">{newsitem.published}</small>
              </CardText>

              <a href={newsitem.link}>Read more</a>
            </CardBody>
          </Col>

          <Col md={4}>
            <CardBody>
              <CardTitle style={{ color: "white", fontSize: "20px" }}>
                Sentimental Analysis
              </CardTitle>

              <CardText>
                Result:{" "}
                <div className="badge badge-soft-warning font-size-16">
                  {newsitem.Prediction}
                </div>
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default NewsLineItem;
