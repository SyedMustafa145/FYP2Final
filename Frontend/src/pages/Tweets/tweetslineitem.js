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

import googleTweetsImg from "../../assets/images/News/tweet.png";

import eurousdimg from "../../assets/images/News/tweet.png";

const TweetsLineItem = ({ Tweetsitem }) => {


  console.log(Tweetsitem);
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
              src={googleTweetsImg}
              alt={googleTweetsImg}
            />
          </Col>

          <Col md={6}>
            <CardBody>
                Source: {" "}
              <CardTitle style={{ color: "white" ,  fontSize: "18px" , fontWeight:"bold" }}>
                {Tweetsitem.sourceLabel}
              </CardTitle>
              <CardText style={{ color: "white", fontSize: "14px" }}>
                {Tweetsitem.tweet}
              </CardText>
              <CardText>
                Published:{" "}
                <small className="text-muted">{Tweetsitem.date}</small>
              </CardText>

              <CardText>
                Like Count 👍 :{" "}
                <small className="text-muted">{Tweetsitem.likecount}</small>
              </CardText>

             
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
                  {Tweetsitem.Prediction}
                </div>
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default TweetsLineItem;
