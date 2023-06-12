import React, { Component } from 'react';
import { Col, Card, CardBody } from "reactstrap";
import eurusd_img from "../../assets/images/currencypairs/eurusd.png";


class MiniWidgets extends Component {
    
   
    
    render() {
        return (
            <React.Fragment>
                
                        <Col md={4}>
                            <Card>
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-truncate font-size-14 mb-2">Wallet</p>
                                            <h4 className="mb-0">$ 3499</h4>
                                        </div>
                                        <div className="text-primary">
                                            
                                            <img src={eurusd_img} alt="" height="35" />
                                            
                                        </div>
                                    </div>
                                </CardBody>

                                <CardBody className="border-top py-3">
                                    <div className="text-truncate">
                                        <span className="badge badge-soft-success font-size-11 me-1"><i className="mdi mdi-menu-up"> </i>Total Amount</span>
                                        <span className="text-muted ms-2"></span>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-truncate font-size-14 mb-2">Total Profit</p>
                                            <h4 className="mb-0">$ 988.49</h4>
                                        </div>
                                        <div className="text-primary">
                                            
                                            <img src={eurusd_img} alt="" height="35" />
                                            
                                        </div>
                                    </div>
                                </CardBody>

                                <CardBody className="border-top py-3">
                                    <div className="text-truncate">
                                        <span className="badge badge-soft-success font-size-11 me-1"><i className="mdi mdi-menu-up"> </i>Total Profit</span>
                                        <span className="text-muted ms-2">Since Last Month</span>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-truncate font-size-14 mb-2">Total Loss</p>
                                            <h4 className="mb-0">$ 213.56</h4>
                                        </div>
                                        <div className="text-primary">
                                            
                                            <img src={eurusd_img} alt="" height="35" />
                                            
                                        </div>
                                    </div>
                                </CardBody>

                                <CardBody className="border-top py-3">
                                    <div className="text-truncate">
                                        <span className="badge badge-soft-success font-size-11 me-1"><i className="mdi mdi-menu-up"> </i>Total Loss</span>
                                        <span className="text-muted ms-2">Since Last Month</span>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    
            </React.Fragment>
        );
    }
}

export default MiniWidgets;