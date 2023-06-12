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
  Spinner
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";


//import CurrencyPairNewslineitem from "./currencynewslineitem";
import NewsLineItem from "./newslineitem";
import NewsAnalytics from "./NewsAnalytics";
import { constant } from "lodash";

const News_rfc = () => {
  // create a state name newsdata
  const [currencypair, setCurrencyPair] = useState("");
  const [newsdata, setNewsData] = useState(null);
  const [searchStatus, setSearchStatus] = useState();


 
  const onCurrencyPairChange = (e) => {
    setCurrencyPair(e.target.value);
    setSearchStatus(false);
    
  };




  const getNewsData = async () => {
    

    if (currencypair === "" || currencypair==='Select') {

      alert("Please enter a currency pair");
      setCurrencyPair("");

    } else {
    setSearchStatus(true);
    console.log("getNewsData");
    const response = await fetch(
      "http://localhost:5000/sentimentalanalysis/topic?topic=" + currencypair
    );
    const data = await response.json();

    setNewsData(data);
    console.log(newsdata);
    setSearchStatus(false);
    }
    

      
  };

  const [breadcrumbItems, setBreadcrumbitems] = useState([
    { title: "Currencies", link: "#" },
    { title: "News", link: "#" },
  ]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Currencies News"
            breadcrumbItems={breadcrumbItems}
          />




     <Card>

            <CardBody>

          <Row>


            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle style={{ color: "white", fontWeight: "bold" }}>
                    Currency Pair News
                  </CardTitle>

                  <Row>
                    <CardText>
                      Search for news that you are looking for.
                    </CardText>


                  <Col lg={4}>
                     <Row lg={3} style={{"margin":"5px"}}>

                    <select onChange={onCurrencyPairChange} className="form-control" >
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
                     <Row lg={2} style={{"margin":"5px"}} >
                    
                     <Button   onClick={getNewsData} color="primary" type="button" className="waves-effect waves-light me-1">
                        Search <i className=" ri-search-line align-middle ms-2"></i>
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
            {newsdata != null ? (
              <CardTitle style={{ color: "white", fontWeight: "bold" }}>
                Showing results for {currencypair}
                <CardText className="text-muted">
                  Total News: {newsdata && newsdata.length}
                </CardText>
              </CardTitle>
            ) : null}
          </Row>

                  {
                      searchStatus ? 
                      <div className="text-center"><Spinner className="me-2" color="primary" /></div>
                      
                          : null 
                    }

 
            <Row>
                <Col lg={8}>
              {newsdata && 
                newsdata.map((newsitem) => (
                  
                  <NewsLineItem newsitem={newsitem} />
                )) }
            </Col>

            
            <Col lg={4} >
                {newsdata != null ? (
                    
                    < NewsAnalytics props={[newsdata,currencypair]} />
                ) : ( null ) }
            </Col> 
            </Row> 


         
        </Container>
      </div>
    </React.Fragment>
  );
};

export default News_rfc;
