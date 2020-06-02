/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import Cookies from 'js-cookie';
import { Message } from 'semantic-ui-react';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
} from 'reactstrap';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
class FacultyLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      loading: false,
      username: '',
      password: '',
      csrf_token: 0,
      status: '',
      user_auth: false,
      facultydata: [],
      loginURL: '/student/login/',
      home_jsonURL: '/student/home_json/',
    };

    this.handlechange = this.handlechange.bind(this);
    this.handlelogin = this.handlelogin.bind(this);
  }

  handlechange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  LoadingSpinner() {
    return (
      <div>
        <Spinner animation="border" style={{ color: 'black' }} /> <br />{' '}
        <small>Logging In</small>
      </div>
    );
  }
  handlelogin(e) {
    this.setState({
      loading: true,
      csrf_token: Cookies.get('csrftoken'),
    });

    // console.log(this.state)
    e.preventDefault();
    var formd = new FormData();
    formd.append('csrfmiddlewaretoken', this.state.csrf_token);
    formd.append('username', this.state.username);
    formd.append('password', this.state.password);
    axios
      .post(this.state.loginURL, formd)
      .then((res) => {
        console.log(res.code);
        axios.get(this.state.home_jsonURL).then((response) => {
          if (response.data.status === 'success') {
            this.props.changeid(response.data);
            console.log(this.props);
            this.setState({
              status: response.data.status,
              facultydata: response.data,
            });
          } else {
            this.setState({
              show: true,
            });
          }
        });
      })
      .catch((error) => {
        console.log(error.response.data.status);
        this.setState({
          invalidLogin: true,
          error: error.response.data.status,
        });
      })
      .finally((response) => {
        console.log(response);
        this.setState({ loading: false });
      });
  }
  get_csrf_token() {
    //console.log("TAKING TOKEN ");
    axios.get('/management/get_csrf').then((response) => {
      Cookies.set('csrftoken', response.data.csrfToken);
      this.setState({
        csrf_token: response.data.csrfToken,
      });
    });
  }
  componentDidMount() {
    this.get_csrf_token();
  }

  render() {
    if (this.state.status === 'success') {
      return <Redirect to="/dashboard/home" />;
    }
    return (
      <>
        <Col lg="5" md="7">
          <div style={{ marginBottom: '1rem' }}>
            {this.state.invalidLogin === true ? (
              <Message negative>
                <Message.Header style={{ textAlign: 'center' }}>
                  <i
                    className="fas fa-exclamation-triangle"
                    style={{ marginRight: '1rem' }}
                  ></i>
                  <span style={{ textAlign: 'center' }}>Invalid ID or Password</span>
                </Message.Header>
              </Message>
            ) : null}
          </div>
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                QRSMS - Student Portal
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="username"
                      onChange={this.handlechange}
                      placeholder="NU Email"
                      type="email"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="password"
                      onChange={this.handlechange}
                      placeholder="Password"
                      type="password"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  {this.state.loading ? (
                    this.LoadingSpinner()
                  ) : (
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={this.handlelogin}
                    >
                      Sign in
                    </Button>
                  )}
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            {/* <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              ></a>
            </Col> */}
          </Row>
        </Col>
        <SweetAlert
          show={this.state.show}
          title="Demo"
          text="Invalid ID or password"
          onConfirm={() => this.setState({ show: false })}
        />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeid: (s) => {
      dispatch({ type: 'ChangeId', payload: { s } });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    student: state.studentinfo,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FacultyLogin);
