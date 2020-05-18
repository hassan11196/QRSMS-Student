import React, { Component } from 'react';
import D from '../../assets/img/d.png';
import { Table, CardBody, CardTitle, Popover, PopoverBody } from 'reactstrap';
import {
  Navbar,
  Container,
  Alert,
  Nav,
  Spinner,
  Card,
  Row,
  Col,
  Button,
  Breadcrumb,
} from 'react-bootstrap';
import axios from 'axios';
// import credential from '../credentials.js';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Axios from 'axios';
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
    };
    this.toggle = this.toggle.bind(this);
  }
  //   componentWillReceiveProps(newprops) {
  //     this.setState(
  //       {
  //         student: this.props.student,
  //       },
  //       () => {
  //         console.log(this.state.student, 'registration');
  //       }
  //     );
  //   }
  toggle() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }
  componentDidMount() {
    axios.get('/management/get_csrf').then((response) => {
      Cookies.set('csrftoken', response.data.csrfToken);
      this.setState((oldState) => ({
        csrf_token: Cookies.get('csrftoken'),
      }))
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
      console.log('Weird Table');
      let nodey = [];
      this.state.CourseInfo[0].forEach((element) => {
        nodey.push(this.registrationTable(element));
      });

      console.log(nodey);
      this.setState({
        courses_nodes: nodey,
      });
      console.log('courses k lye render');
      console.log(this.state.CourseInfo);
      console.log('render k ander');

      console.log(this.state.student);

      // console.log(this.state.CourseInfo);
      // this.state.CourseInfo[0].forEach(element => {
      //     console.log('Array Bhai');
      //     console.log(element);
      // });
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
    console.log('registration table k ander');
    console.log(c);
    return (
      // <li key={"listKey" + c.course_code} style={{listStyle:'none'}}>
      <tr>
        <td key={'rowCol' + c.course.course_name}>{c.course.course_name}</td>
        <td>{c.course.credit_hour}</td>
        <td>{c.course.course_type === 1 ? 'Core' : 'Elective'}</td>
        <td>'Register! 5-New Offered Course new (Recommended)'</td>
        {c.status === 'R' ? (
          <td>
            <Button
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
            <td>
              <Button
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
        {c.status === 'R' ? <td>{c.section}</td> : <td></td>}
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
        console.log('After Put');
        console.log(response.data);
        console.log(course_offered);
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
        form.append(
          'semester',
          'FALL2019_BS(CS)_ComputerSciences_MainCampus_Karachi'
        );
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
    if (this.props.student)
      return (
        <div className="Settings">
          {/* <Navbarpage /> */}
          <Container bsPrefix="cont">
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
                        onClick={() => {
                          this.toggle();
                        }}
                        id="Popover1"
                        src={D}
                        style={{
                          width: '3.5rem',
                          height: '3.5rem',
                          borderRadius: '50%',
                          margin: '1rem',
                        }}
                      />
                      Howdy, {this.state.user.first_name} {this.state.user.last_name}{' '}
                    </h3>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            {console.log(this.state.popoverOpen)}
            <Popover
              placement="bottom"
              isOpen={this.state.popoverOpen}
              target="Popover1"
              toggle={this.toggle}
            >
              <PopoverBody style={{ wordSpacing: '1rem' }}>
                <i className="fas fa-power-off"></i>
                <span type="button" style={{ paddingLeft: '0.7rem' }}>
                  Logout
                </span>
              </PopoverBody>
            </Popover>
            {/* <Navbarpage/> */}
            {/* <Header /> */}
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
                                Credit Hours Earned
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
                                Credit Hours Limit
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
            {/* <h3 style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold', color: 'black' }}>Course</span>{' '}
            <span>| Registration</span>
          </h3> */}
            {/* <br /> */}
            <Card>
              <Card.Body
                style={{
                  fontFamily: 'Cursive',
                  fontSize: '15px',
                  lineHeight: '40px',
                  textAlign: 'left',
                  backgroundColor: '#eee2dc',
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
            <Card>
              {this.renderRegistrationStatus()}

              <Card.Body>
                {/* <MuiThemeProvider> */}
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  {/* <th style={{ backgroundColor: 'black', fontSize: '5px' }}></th> */}
                  <thead className="thead-dark">
                    <th style={{ fontWeight: '700', fontSize: '15px' }}>
                      Course Name
                    </th>
                    <th style={{ fontWeight: '700', fontSize: '15px' }}>Cr.Hrs</th>
                    <th style={{ fontWeight: '700', fontSize: '15px' }}>Relation</th>
                    <th style={{ fontWeight: '700', fontSize: '15px' }}>Comments</th>
                    <th style={{ fontWeight: '700', fontSize: '15px' }}>Status</th>
                    <th style={{ fontWeight: '700', fontSize: '15px' }}>Section</th>
                  </thead>
                  <tbody>{this.state.courses_nodes}</tbody>
                </Table>
                {/* </MuiThemeProvider> */}
              </Card.Body>
            </Card>
          </Container>
        </div>
      );
    else return <Redirect to="/auth/login" />;
  }
}
const mapStateToProps = (state) => {
  console.log('map k ander');
  console.log(state.student);
  return {
    student: state.student,
  };
};
export default connect(mapStateToProps)(Registration);
