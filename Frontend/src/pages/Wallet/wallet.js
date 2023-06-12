import React, { Component, useState, useEffect } from "react";
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  InputGroup,
  Form,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { constant } from "lodash";

const Wallet = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [servername, setservername] = useState("");
  const [valid, setvalid] = useState(false);

  const [breadcrumbItems, setBreadcrumbitems] = useState([
    { title: "Wallet", link: "#" },
  ]);

  const data = [
    {
      username: "Usama",
      password: "123456",
      servername: "abcserver",
    },
  ];
  const onUserNameChange = (e) => {
    setusername(e.target.value);
  };
  const onPasswordChange = (e) => {
    setpassword(e.target.value);
  };
  const onServerNameChange = (e) => {
    setservername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === data[0].username &&
      password === data[0].password &&
      servername === data[0].servername
    )
    {
      setvalid(true);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Wallet"
            breadcrumbItems={breadcrumbItems}
          />
          <Col lg={6}>
            <Card>
              <CardBody>
                <h4 className="card-title">Enter Details</h4>
                <br />
                <AvForm>
                  <div className="mb-3">
                    <AvField
                      onChange={onUserNameChange}
                      name="username"
                      label="Username"
                      placeholder="Enter Username"
                      type="text"
                      errorMessage="Invalid Username"
                      validate={{
                        required: { value: true },
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <AvField
                      onChange={onPasswordChange}
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Enter Password"
                      errorMessage="Invalid Password"
                      validate={{
                        required: { value: true },
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <AvField
                      onChange={onServerNameChange}
                      name="servername"
                      label="Server Name"
                      placeholder="Enter Server Name"
                      type="text"
                      errorMessage="Invalid Server Name"
                      validate={{
                        required: { value: true },
                      }}
                    />
                  </div>
                  <FormGroup className="mb-0">
                    <div>
                      <Button
                        type="submit"
                        color="primary"
                        className="me-1"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>{" "}
                      <Button type="reset" color="secondary">
                        Cancel
                      </Button>
                    </div>
                  </FormGroup>
                </AvForm>
              </CardBody>
            </Card>
            {valid ? (
              <SweetAlert
                title="Wallet Connection!"
                success
                showCancel
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                onConfirm={() => setvalid(false)}
                onCancel={() => setvalid(false)}
              >
                Authentication Successful
              </SweetAlert>
            ) : null}
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Wallet;
