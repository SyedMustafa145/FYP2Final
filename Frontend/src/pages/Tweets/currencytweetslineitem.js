import React ,{useEffect, useState} from "react";
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


import eurousdimg from "../../assets/images/Tweets/eurusd.png";

const TweetsLineItem = ({ Tweetsitem }) => {
  
 const [analysis, setAnalysis] = useState(Tweetsitem.Prediction);


useEffect(() => {
    getSentimentalAnalysis();
}, []);

 const getSentimentalAnalysis = async() => {  

    console.log("getTweetsData");
    // const response = await fetch('http://localhost:5000/sentimentalanalysis/sentence?sentence='+Tweetsitem.title);
    // const data = await response.json();
    const data = "Positive";
    
    setAnalysis(data);
    console.log(data);

 }



  console.log(Tweetsitem);
  return (
    <React.Fragment>
      <Card>
        <Row
          className="no-gutters align-items-center"
          style={{ padding: "20px" }}
        >

        <Col md={3}>
            <CardImg className="img-fluid" src={Tweetsitem.urlToImage} alt={eurousdimg} />
        </Col>

          <Col md={6}>
            <CardBody>
              <CardTitle style={{ color: "white" , fontSize: "20px"}}>
                {Tweetsitem.date}
              </CardTitle>
              <CardText style={{  fontSize: "12px" }}>
                {Tweetsitem.tweet}
              </CardText>
              



              <CardText>
                Published:{" "}
                <small className="text-muted">{}</small>
              </CardText>

        
            </CardBody>
          </Col>

          <Col md={3}>
            
          <CardBody>
              <CardTitle style={{ color: "white" , fontSize: "20px"}}>
                Sentimental Analysis
              </CardTitle>

              <CardText>
                Result:{" "}<div className="badge badge-soft-warning font-size-16">{analysis}</div>
                
              </CardText>

              

         </CardBody>

        </Col>


        </Row>
      </Card>
    </React.Fragment>
  );
};

export default TweetsLineItem;
