import React, { Component } from 'react';

import { Row, Col, Input, Button, Alert, Container, Label } from "reactstrap";

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { checkLogin, apiError } from '../../store/actions';

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { username: "admin@tradebot.in", password: "123456" }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, values) {
        this.props.checkLogin(values, this.props.history);
    }

    componentDidMount() {
        this.props.apiError("");
        document.body.classList.add("auth-body-bg");
    }

    componentWillUnmount() {
        document.body.classList.remove("auth-body-bg");
    }

    render() {

        return (
            <React.Fragment>
                <div>
                    <Container fluid className="p-0">
                        <Row className="g-0">
                            <Col lg={4}>
                                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                    <div className="w-100">
                                        <Row className="justify-content-center">
                                            <Col lg={9}>
                                                <div>
                                                    <div className="text-center">
                                                    <div>
                                                        <Link to="/" class="">
                                                            <img src={logodark} alt="" height="20" class="auth-logo logo-dark mx-auto" />
                                                            <img src={logolight} alt="" height="20" class="auth-logo logo-light mx-auto" />
                                                        </Link>
                                                    </div>

                                                        <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                                                        <p className="text-muted">Sign in to continue to TradeBot</p>
                                                    </div>


                                                    {this.props.loginError && this.props.loginError ? <Alert color="danger">{this.props.loginError}</Alert> : null}

                                                    <div className="p-2 mt-5">
                                                        <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} >

                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="username">Email</Label>
                                                                <AvField name="username" value={this.state.username} type="text" className="form-control" id="username" validate={{ email: true, required: true }} placeholder="Enter username" />
                                                            </div>

                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="userpassword">Password</Label>
                                                                <AvField name="password" value={this.state.password} type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                                                            </div>

                                                            <div className="form-check">
                                                                <Input type="checkbox" className="form-check-input" id="customControlInline" />
                                                                <Label className="form-check-label" htmlFor="customControlInline">Remember me</Label>
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <Button color="primary" className="w-md waves-effect waves-light" type="submit">Log In</Button>
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
                                                            </div>
                                                        </AvForm>
                                                    </div>

                                                    <div className="mt-5 text-center">
                                                        <p>Don't have an account ? <Link to="/register" className="fw-medium text-primary"> Register </Link> </p>
                                                        <p>© 2022 TradeBot. All rights reserved.</p>
                                                    </div>
                                                </div>

                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <div className="authentication-bg">
                                    <div className="bg-overlay"></div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { loginError } = state.Login;
    return { loginError };
}

export default withRouter(connect(mapStatetoProps, { checkLogin, apiError })(Login));