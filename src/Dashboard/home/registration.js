import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Initial } from 'react-initial';
import 'react-notifications/lib/notifications.css';
import D from '../../assets/img/d.png';
import { Table, CardBody, Media, CardTitle, Popover, PopoverBody } from 'reactstrap';
import {
  Navbar,
  Container,
  Alert,
  Nav,
  Spinner,
  Card,
  Row,
  Col,
  // Button,
  Breadcrumb,
} from 'react-bootstrap';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/RingLoader';

import { Button } from 'semantic-ui-react';
import { FaRegistered } from 'react-icons/fa';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import Cookies from 'js-cookie';
import NavbarPage from './TopNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      popoverOpen: false,
      creditHoursAttempted: '',
      creditHoursEarned: '',
      sgpa: '',
      cgpa: '',
      status: false,
      student: [],
      user: [],
      CourseRegistrationPeriodActive: false,
      CourseInfo: [],
      nodey: [],
      force_update: 0,
      csrf_token: 0,
      semester: '',
    };
    this.toggle = this.toggle.bind(this);
  }
  notifyDanger = () => {
    toast.error(
      <div
        style={{
          paddingLeft: '1rem',
          borderRadius: '50%',
          height: '2rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ marginLeft: '-6px', marginRight: '8px', marginTop: '-26px' }}>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <div>
          <h5 style={{ marginTop: '0.8rem' }}>
            <b style={{ fontSize: '16px' }}>{'An Error Occured'}</b>
          </h5>

          <h6
            style={{
              marginBottom: '1rem',
              fontSize: '13px',
              marginLeft: '-20px',
              width: '200px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {this.state.snackMessage}
          </h6>
        </div>
      </div>,
      { containerId: 'A' }
    );
  };
  notifyB = () => {
    toast.success(
      <div
        style={{
          paddingLeft: '1rem',
          borderRadius: '50%',
          height: '2rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ marginLeft: '-6px', marginRight: '8px', marginTop: '-32px' }}>
          <i className="fas fa-check-circle"></i>
        </div>
        <div>
          <h5 style={{ marginTop: '0.8rem' }}>
            <b style={{ fontSize: '16px' }}>{'Action Successful'}</b>
          </h5>

          <h6
            style={{
              paddingBottom: '1rem',
              fontSize: '13px',
              marginLeft: '-20px',
              width: '200px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {this.state.snackMessage}
          </h6>
        </div>
      </div>,
      { containerId: 'B' }
    );
  };

  toggle() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }
  componentDidMount() {
    this.setState({
      loading: true,
    });
    axios.get('/student/get_credit_hour_info/').then((response) => {
      console.log('Ahsan', response);
      if (response.data === []) {
        this.setState({
          cgpa: 0.0,
          sgpa: 0.0,
          creditHoursAttempted: response.data[0].credit_hours_attempted,
          creditHoursEarned: 0,
        });
      } else {
        this.setState({
          cgpa: response.data[0].cgpa,
          sgpa: response.data[0].sgpa,
          creditHoursAttempted: response.data[0].credit_hours_attempted,
          creditHoursEarned: response.data[0].credit_hours_earned,
        });
      }
    });
    axios.get('/management/getCurrentSemester/').then((response) => {
      this.setState({
        semester: response.data,
      });
    });
    axios.get('/student/get_credit_hour_info/').then((response) => {
      console.log('Infomatiopn');
      console.log(response.data);
    });
    axios.get('/management/get_csrf').then((response) => {
      Cookies.set('csrftoken', response.data.csrfToken);
      this.setState((oldState) => ({
        csrf_token: Cookies.get('csrftoken'),
      }));
    });
    console.log(this.props);
    console.log(this.props.student.user_data, 'Component did mount');
    this.setState(
      {
        student: this.props.student.student_data[0],
        user: this.props.student.user_data,
      },
      () => {
        console.log(this.state.student, 'registration');
      }
    );
    axios.get('/student/registration/available_courses/').then((response) => {
      console.log('courses');
      console.log(Array(response.data));

      if (response.data.condition === false) {
        alert('Condition Not True. Contact Administrator');
      }
      this.setState({
        CourseInfo: Array(response.data.regular_courses[0].courses_offered),
      });
      let nodey = [];
      this.state.CourseInfo[0].forEach((element) => {
        nodey.push(this.registrationTable(element));
      });

      console.log(nodey);
      this.setState({
        courses_nodes: nodey,
      });
    });

    axios
      .get('/student/registration/period_active/')
      .then((response) => {
        console.log('registration');
        console.log(response.data.message);
        this.setState({
          CourseRegistrationPeriodActive: response.data.condition,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  LoadingSpinner = () => (
    <div>
      <Spinner animation="border" variant="primary" /> Loading...
    </div>
  );
  registrationTable(c) {
    return (
      <tr key={'rowCol' + c.course.course_name}>
        <th scope="row" style={{ textAlign: 'center' }}>
          <Media className="align-items-center">
            <a className="avatar rounded-circle mr-3">
              <Initial
                useWords={true}
                radius={55}
                height={40}
                width={40}
                seed={1}
                charCount={2}
                fontSize={16}
                name={c.course.course_name}
              />
            </a>
            <Media>
              <span style={{ textAlign: 'center' }} className="mb-0 text-sm">
                {c.course.course_name}
              </span>
            </Media>
          </Media>
        </th>
        <td style={{ textAlign: 'center' }}>{c.course.credit_hour}</td>
        <td style={{ textAlign: 'center' }}>
          {c.course.course_type === 1 ? 'Core' : 'Elective'}
        </td>
        <td>Register! 5-New Offered Course new (Recommended)</td>
        {c.status === 'R' ? (
          <td style={{ textAlign: 'center' }}>
            <Button
              size="mini"
              color="red"
              variant="danger"
              onClick={() =>
                this.register_or_drop_course(
                  c,
                  c.course.url,
                  'NR',
                  c.course.course_name
                )
              }
            >
              Drop
            </Button>
          </td>
        ) : (
          <td style={{ textAlign: 'center' }}>
            <Button
              size="mini"
              color="blue"
              onClick={() =>
                this.register_or_drop_course(
                  c,
                  c.course.url,
                  'R',
                  c.course.course_name
                )
              }
            >
              Register
            </Button>
          </td>
        )}
        {c.status === 'R' ? (
          <td style={{ textAlign: 'center' }}>{c.section}</td>
        ) : (
          <td></td>
        )}
      </tr>
      // </li>
    );
  }
  register_or_drop_course = (
    course_offered,
    course_url,
    course_option,
    course_name
  ) => {
    course_offered.status = course_option;
    let course_status_url = new URL(course_offered.url);
    course_offered.course = course_url;
    // let formd = new FormData();
    // formd.set('_method', 'PATCH');

    console.log(course_status_url.pathname);
    Axios.patch(course_status_url.pathname, course_offered, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        if (course_option === 'R') {
          this.setState({
            type: 'success',
            snackMessage: course_name + ' Registered!',
          });
          this.notifyB();
          // alert('Course :' + course_name + ' Registered!');
        } else {
          this.setState({
            type: 'success',
            snackMessage: course_name + ' Dropped!',
          });
          this.notifyB();
        }

        axios.get('/student/registration/available_courses/').then((response) => {
          console.log('courses');
          console.log(Array(response.data));

          if (response.data.condition === false) {
            alert('Condition Not True. Contact Administrator');
          }
          this.setState({
            CourseInfo: Array(response.data.regular_courses[0].courses_offered),
          });
          let nodey = [];
          this.state.CourseInfo[0].forEach((element) => {
            nodey.push(this.registrationTable(element));
          });

          console.log(nodey);
          this.setState({
            courses_nodes: nodey,
          });
        });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState(
          {
            type: 'error',
            snackMessage: 'Unable to register! please try again',
          },
          () => {
            this.notifyDanger();
          }
        );
      })

      .then(() => {
        var value = '';
        if (course_option === 'R') {
          value = 'add';
        } else {
          value = 'drop';
        }
        let form = new FormData();
        form.append('csrfmiddlewaretoken', this.state.csrf_token);
        form.append('code', course_name);
        form.append('admission_fee', '');
        form.append('semester', this.state.semester);
        form.append('action', value);
        axios.post('/student/updateChallan/', form).then((response) => {
          console.log(response);
        });
      });
  };

  renderRegistrationStatus = () => {
    if (this.state.CourseRegistrationPeriodActive === true) {
      return (
        <Alert variant="success">
          <Alert.Heading>Notice: Registration period is Active!</Alert.Heading>
        </Alert>
      );
    } else {
      return (
        <Alert variant="danger">
          <Alert.Heading>Notice: Registration period is not active!</Alert.Heading>
        </Alert>
      );
    }
  };

  render() {
    const override = css`
      display: block;
      margin: 20% auto;
      border-color: white;
    `;
    if (this.props.student === []) {
      return <Redirect to="/auth/login" />;
    } else
      return (
        <div className="Settings">
          <div>
            <NavbarPage />
          </div>
          {this.state.loading === true ? (
            <div className="sweet-loading">
              <BarLoader css={override} loading={this.state.loading} />
            </div>
          ) : (
            <Container bsPrefix="cont">
              <div className="header bg-gradient-info pb-5 pt-5 pt-md-5">
                <Container fluid>
                  <div style={{ width: 'auto', paddingBottom: '2rem' }}>
                    <Breadcrumb>
                      <Breadcrumb.Item href="/dashboard/home">Home</Breadcrumb.Item>
                      <Breadcrumb.Item active>Course Registration</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <NotificationContainer />
                  <ToastContainer
                    enableMultiContainer
                    containerId={'A'}
                    position={toast.POSITION.TOP_RIGHT}
                  />{' '}
                  <div className="header-body">
                    <Row>
                      <Col lg="6" xl="3" className="centre">
                        <Card
                          style={{ width: '80%', height: '6rem' }}
                          className="card-stats mb-4 mb-xl-0"
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  CGPA
                                </CardTitle>
                                {this.state.cgpa === undefined ? (
                                  <span className="h2 font-weight-bold mb-0">
                                    {'0.0'}
                                  </span>
                                ) : (
                                  <span className="h2 font-weight-bold mb-0">
                                    {this.state.cgpa}
                                  </span>
                                )}
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                  <i className="fas fa-chart-bar" />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6" xl="3" className="centre">
                        <Card
                          style={{ width: '80%', height: '6rem' }}
                          className="card-stats mb-4 mb-xl-0"
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  SGPA
                                </CardTitle>
                                {this.state.sgpa === undefined ? (
                                  <span className="h2 font-weight-bold mb-0">
                                    {'0.0'}
                                  </span>
                                ) : (
                                  <span className="h2 font-weight-bold mb-0">
                                    {this.state.sgpa}
                                  </span>
                                )}
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                  <i className="fas fa-chart-pie" />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6" xl="3">
                        <Card
                          style={{ width: '80%', height: '6rem' }}
                          className="card-stats mb-4 mb-xl-0"
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Warning Count
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                  {this.state.student.warning_count}
                                </span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                  <i className="fas fa-chart-pie" />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6" xl="3">
                        <Card
                          style={{ width: '80%', height: '6rem' }}
                          className="card-stats mb-4 mb-xl-0"
                        >
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Cr. Hrs. Earned
                                </CardTitle>
                                {this.state.creditHoursEarned === undefined ? (
                                  <span className="h2 font-weight-bold mb-0">
                                    {'0'}
                                  </span>
                                ) : (
                                  <span className="h2 font-weight-bold mb-0">
                                    {this.state.creditHoursEarned}
                                  </span>
                                )}
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                  <i className="fas fa-users" />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </Container>
              </div>
              <Card style={{ margin: '0.75rem', border: '1px solid grey' }}>
                <Card.Body
                  style={{
                    fontFamily: 'Cursive',
                    fontSize: '15px',
                    textAlign: 'left',
                  }}
                >
                  <Row>
                    <Col md="3">
                      <span style={{ fontWeight: 'bold' }}>Name: </span>
                      <span>
                        {this.state.user.first_name} {this.state.user.last_name}
                      </span>
                    </Col>
                    <Col md="3">
                      <span style={{ fontWeight: 'bold' }}>Roll No: </span>
                      <span>{this.state.student.uid}</span>
                    </Col>
                    <Col md="3">
                      <span style={{ fontWeight: 'bold' }}>Section: </span>
                      <span>{this.state.student.admission_section}</span>
                    </Col>
                    <Col md="3">
                      <span style={{ fontWeight: 'bold' }}>Batch: </span>
                      <span>{this.state.student.batch}</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              {this.renderRegistrationStatus()}
              <ToastContainer
                enableMultiContainer
                containerId={'B'}
                position={toast.POSITION.TOP_RIGHT}
              />
              <Card style={{ margin: '2rem', border: '1px solid black' }}>
                <Card.Header
                  as="h4"
                  style={{
                    marginTop: '-1px',
                    height: '4rem',
                    backgroundColor: 'black',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      paddingRight: '1rem',
                      marginTop: '-4px',
                      color: 'white',
                    }}
                    className="toggleiconHeight"
                  >
                    <FaRegistered size={'2em'} />
                  </span>
                  <span
                    style={{ fontWeight: 'bold', marginTop: '-4px', color: 'white' }}
                    className="toggletextSize"
                  >
                    {' '}
                    Course Registration
                  </span>
                </Card.Header>

                <Card.Body>
                  <Table
                    className="align-items-center table-dark table-flush"
                    responsive
                  >
                    <thead className="thead-dark">
                      <th style={{ fontWeight: '700' }}>Course Name</th>
                      <th style={{ fontWeight: '700' }}>Cr.Hrs</th>
                      <th style={{ fontWeight: '700' }}>Relation</th>
                      <th style={{ fontWeight: '700' }}>Comments</th>
                      <th style={{ fontWeight: '700', textAlign: 'center' }}>
                        Action
                      </th>
                      <th style={{ fontWeight: '700' }}>Section</th>
                    </thead>
                    <tbody>{this.state.courses_nodes}</tbody>
                  </Table>
                </Card.Body>
              </Card>

              {/* {console.log(this.state.CourseInfo)} */}
            </Container>
          )}
        </div>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    student: state.student,
  };
};
export default connect(mapStateToProps)(Registration);
