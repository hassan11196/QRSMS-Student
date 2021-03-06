import React from 'react';
import { connect } from 'react-redux';
import { FaHome, FaMobileAlt } from 'react-icons/fa';
// import Loader from 'react-loaders';
// reactstrap components

import { css } from '@emotion/core';
import BarLoader from 'react-spinners/RingLoader';
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
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import { Redirect } from 'react-router-dom';
import D from '../../assets/img/d.png';
import { CardTitle } from 'reactstrap';
import { Navbar, Nav } from 'react-bootstrap';
// core components
import NavbarPage from './TopNav';
import axios from 'axios';
var Loader = require('react-loaders').Loader;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
          loading: false,
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
    const override = css`
      display: block;
      margin: 20% auto;
      border-color: white;
    `;
    if (
      this.props.student === null ||
      this.props.student === [] ||
      this.props.student === undefined
    ) {
      return <Redirect to="/auth/login" />;
    }
    return (
      <>
        <div>
          <div>
            <NavbarPage />
          </div>
          {/* <AdminNavbar /> */}
          <Container className="mt-7" fluid style={{ paddingBottom: '3rem' }}>
            {this.state.user_data === [] ? (
              <div className="sweet-loading">
                <BarLoader
                  css={override}
                  color={'white'}
                  loading={this.state.loading}
                />
              </div>
            ) : (
              <Row>
                <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                  <Card className="card-profile shadow">
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <a onClick={(e) => e.preventDefault()}>
                            <img alt="..." className="rounded-circle" src={D} />
                          </a>
                        </div>
                      </Col>
                    </Row>
                    <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                      <div className="d-flex justify-content-between"></div>
                    </CardHeader>
                    <CardBody className="pt-0 pt-md-4">
                      <Row>
                        <div className="col">
                          <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                            <div>
                              <span className="description">Warnings</span>
                              <span className="heading">
                                {this.state.warning_count}
                              </span>
                            </div>
                            <div>
                              <span className="description">Year</span>
                              <span className="heading">
                                {this.state.student_year}
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
                          <span className="font-weight-light">
                            , {this.state.uid}
                          </span>
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
                        <hr style={{ marginTop: '10px', width: '500%' }} />
                      </Row>
                    </CardHeader>
                    <CardBody style={{ marginTop: '-60px' }}>
                      <h6 className="heading-small text-muted mb-4">
                        <span style={{ paddingRight: '0.7rem' }}>
                          <FaHome />
                        </span>
                        User information
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Roll No.
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.uid}
                            </span>
                          </Col>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.uni_mail}
                            </span>
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
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.first_name}
                            </span>
                          </Col>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.last_name}
                            </span>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      {/* Address */}
                      <h6 className="heading-small text-muted mb-4">
                        <span style={{ paddingRight: '0.8rem' }}>
                          <FaMobileAlt />
                        </span>{' '}
                        Contact information
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col md="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.current_address}
                            </span>
                          </Col>

                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.current_city}
                            </span>
                          </Col>
                        </Row>
                        <Row>
                          {' '}
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.current_country}
                            </span>
                          </Col>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              CNIC
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.CNIC}
                            </span>
                          </Col>
                        </Row>
                        <Row>
                          {' '}
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Mobile No:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.mobile_contact}
                            </span>
                          </Col>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Emergency Contact:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.emergency_contact}
                            </span>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    student: state.student,
  };
};
export default connect(mapStateToProps)(Home);
