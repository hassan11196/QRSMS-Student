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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  ListGroupItem,
  Container,
  Row,
  Col,
} from 'reactstrap';
import D from '../../assets/img/d.png';
import { CardTitle } from 'reactstrap';
import { Navbar, Nav } from 'react-bootstrap';
// core components
import UserHeader from 'components/Headers/UserHeader.jsx';
import axios from 'axios';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      batch: '',
      degree_name_enrolled: '',
      degree_short_enrolled: '',
      department_name_enrolled: '',
      uni_mail: '',
      current_semester: '',
      warning_count: '',
      attending_semester: false,
      student_year: '',
      admission_section: '',
      semester_code: '',
      user: '',
      home_jsonURL: '/student/home_json/',
      user_data: [],
    };
  }
  componentDidMount() {
    console.log(this.props);
    axios.get(this.state.home_jsonURL).then((response) => {
      console.log(response.data);
      if (response.data.status === 'success') {
        this.setState({
          user_data: response.data.user_data,
          uid: response.data.student_data[0].uid,
          batch: response.data.student_data[0].batch,
          degree_name_enrolled: response.data.student_data[0].degree_name_enrolled,
          degree_short_enrolled: response.data.student_data[0].degree_short_enrolled,
          department_name_enrolled:
            response.data.student_data[0].department_name_enrolled,
          uni_mail: response.data.student_data[0].uni_mail,
          current_semester: response.data.student_data[0].current_semester,
          warning_count: response.data.student_data[0].warning_count,
          attending_semester: response.data.student_data[0].attending_semester,
          student_year: response.data.student_data[0].student_year,
          admission_section: response.data.student_data[0].admission_section,
          semester_code: response.data.student_data[0].uid,
          user: response.data.student_data[0].user,
        });
      }
    });
  }
  render() {
    return (
      <>
        {/* <UserHeader /> */}
        <Navbar bg="dark" variant="dark" style={{ height: '6rem' }}>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <div
                style={{ display: 'inline-flex', float: 'right' }}
                bg="dark"
                variant="dark"
                float="right"
              >
                <h3
                  style={{
                    paddingTop: '1rem',
                    paddingRight: '1rem',
                    color: 'white',
                    wordSpacing: '2px',
                  }}
                >
                  <img
                    src={D}
                    style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      borderRadius: '50%',
                      margin: '1rem',
                    }}
                  />
                  Howdy, {this.state.user_data.first_name}{' '}
                  {this.state.user_data.last_name}{' '}
                </h3>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* Page content */}
        <Container className="mt-7" fluid style={{ paddingBottom: '3rem' }}>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img alt="..." className="rounded-circle" src={D} />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    {/* <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button> */}
                    {/* <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button> */}
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="description">Warnings</span>
                          <span className="heading">{this.state.warning_count}</span>
                        </div>
                        <div>
                          <span className="description">Semester</span>
                          <span className="heading">
                            {this.state.current_semester}
                          </span>
                        </div>
                        <div>
                          <span className="description">Section</span>
                          <span className="heading">
                            {this.state.admission_section}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {this.state.user_data.first_name}{' '}
                      {this.state.user_data.last_name}
                      <span className="font-weight-light">, {this.state.uid}</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Karachi, Pakistan
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {this.state.degree_name_enrolled}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      FAST NUCES Karachi
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My profile</h3>
                    </Col>
                    {/* <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col> */}
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="heading-small text-muted mb-4">User information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <label className="form-control-label" htmlFor="input-email">
                          Roll No.
                        </label>
                        <ListGroupItem>{this.state.uid}</ListGroupItem>
                      </Col>
                      <Col lg="6" style={{ paddingBottom: '1rem' }}>
                        <label className="form-control-label" htmlFor="input-email">
                          Email address
                        </label>
                        <ListGroupItem>{this.state.uni_mail}</ListGroupItem>
                        {/* <Input
                              className="form-control-alternative"
                              id="input-email"
                              value={this.state.uni_mail}
                              type="email"
                            /> */}
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          First name
                        </label>
                        <ListGroupItem>
                          {this.state.user_data.first_name}
                        </ListGroupItem>
                      </Col>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Last name
                        </label>
                        <ListGroupItem>
                          {this.state.user_data.last_name}
                        </ListGroupItem>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Address
                        </label>
                        <ListGroupItem>
                          {this.state.user_data.current_address}
                        </ListGroupItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <label className="form-control-label" htmlFor="input-city">
                          City
                        </label>
                        <ListGroupItem>
                          {this.state.user_data.current_city}
                        </ListGroupItem>
                      </Col>
                      <Col lg="4">
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Country
                        </label>
                        <ListGroupItem>
                          {this.state.user_data.current_country}
                        </ListGroupItem>
                      </Col>
                      <Col lg="4">
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          CNIC
                        </label>
                        <ListGroupItem>{this.state.user_data.CNIC}</ListGroupItem>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
