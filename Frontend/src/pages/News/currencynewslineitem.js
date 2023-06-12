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


import eurousdimg from "../../assets/images/News/eurusd.png";

const NewsLineItem = ({ newsitem }) => {
  
 const [analysis, setAnalysis] = useState("");


useEffect(() => {
    getSentimentalAnalysis();
}, []);

 const getSentimentalAnalysis = async() => {  

    console.log("getNewsData");
    const response = await fetch('http://localhost:5000/sentimentalanalysis/sentence?sentence='+newsitem.title);
    const data = await response.json();
    
    setAnalysis(data);
    console.log(data);

 }



  console.log(newsitem);
  return (
    <React.Fragment>
      <Card>
        <Row
          className="no-gutters align-items-center"
          style={{ padding: "20px" }}
        >

        <Col md={3}>
            <CardImg className="img-fluid" src={newsitem.urlToImage} alt={eurousdimg} />
        </Col>

          <Col md={6}>
            <CardBody>
              <CardTitle style={{ color: "white" , fontSize: "20px"}}>
                {newsitem.title}
              </CardTitle>
              <CardText style={{  fontSize: "12px" }}>
                {newsitem.description}
              </CardText>



              <CardText>
                Published:{" "}
                <small className="text-muted">{newsitem.publishedAt}</small>
              </CardText>

            <Row>
            <CardText>
                Source:{" "}<div className="badge badge-soft-warning font-size-12">{newsitem.source.name}</div>
                <span>{" "}</span><a href={newsitem.url}>Read more</a>
            </CardText>
                

            </Row>
            



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

export default NewsLineItem;
