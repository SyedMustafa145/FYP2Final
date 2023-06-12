import React, { Component } from "react";

import { Row, Col, Card, CardBody, Container, Table } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { useState, useEffect } from "react";

const TransactionData = () => {
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:5002/gettradinghistory");
      const data = await response.json();
      setTransactionData(data);
      console.log(data)
    }

    fetchData();
  }, []);

  return (
    <div>
      {transactionData ? (
        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Table id="tech-companies-1" striped bordered responsive>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th data-priority="1">Ticket</th>
                  <th data-priority="3">Trade Time</th>
                  <th data-priority="1">Type</th>
                  <th data-priority="3">Volume</th>
                  <th data-priority="3">Price</th>
                  <th data-priority="6">S/L</th>
                  <th data-priority="6">T/P</th>
                  <th data-priority="6">Profit</th>
                </tr>
              </thead>
              <tbody>
          {transactionData.map((item) => (
            <tr key={item.id}>
              <th>
                {item.symbol} <span className="co-name"></span>
              </th>
              <td>{item.ticket}</td>
              <td>{item.time}</td>
              <td>{item.type}</td>
              <td>{item.volume}</td>
              <td>{item.price}</td>
              <td>{item.sl}</td>
              <td>{item.tp}</td>
              <td>{item.profit}</td>
            </tr>
          ))}
        </tbody>
            </Table>
          </div>
        </div>

      ) : (
        <div>Loading...</div>
      )}

    </div>
  );
};

const ResponsiveTables = (props) => {
  const [breadcrumbItems] = useState([
    { title: "Trading", link: "#" },
    { title: "Your History", link: "#" },
  ]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Trading History"
            breadcrumbItems={breadcrumbItems}
          />

          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">Trade Transactions</h4>
                  <p className="card-title-desc">
                    Following are the Transactions made from your account on the
                    exchange market.
                  </p>


                <TransactionData />

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ResponsiveTables;
