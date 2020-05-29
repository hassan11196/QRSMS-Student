import React, { Component } from 'react';
import { Initial } from 'react-initial';
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
import { Button } from 'semantic-ui-react';
import { FaRegistered } from 'react-icons/fa';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import Cookies from 'js-cookie';
import NavbarPage from './TopNav';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
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
  toggle() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }
  componentDidMount() {
    axios.get('/management/getCurrentSemester/').then((response) => {
      this.setState({
        semester: response.data,
      });
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
        if (course_option === 'R') {
          alert('Course :' + course_name + ' Registered!');
        } else {
          alert('Course :' + course_name + ' DROPPED');
        }
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
    if (this.props.student === []) {
      return <Redirect to="/auth/login" />;
    } else
      return (
        <div className="Settings">
          <div>
            <NavbarPage />
          </div>
          <Container bsPrefix="cont">
            <div className="header bg-gradient-info pb-5 pt-5 pt-md-5">
              <Container fluid>
                <div style={{ width: 'auto', paddingBottom: '2rem' }}>
                  <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Course Registration</Breadcrumb.Item>
                  </Breadcrumb>
                </div>

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
                              <span className="h2 font-weight-bold mb-0">3.15</span>
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
                              <span className="h2 font-weight-bold mb-0">0</span>
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
                              <span className="h2 font-weight-bold mb-0">67</span>
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
                                Cr. Hrs. Limit
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">19</span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                <i className="fas fa-percent" />
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
            <Card style={{ margin: '2rem', border: '1px solid black' }}>
              <Card.Header
                as="h4"
                style={{ height: '4rem', backgroundColor: 'black' }}
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
