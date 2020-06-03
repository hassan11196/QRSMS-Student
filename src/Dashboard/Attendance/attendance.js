import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'semantic-ui-react';
// import '../App.css';
import D from '../../assets/img/d.png';
import NavbarPage from '../home/TopNav';
// import 'mdbreact/dist/css/mdb.css';
// import NavbarPage from './NavBar';
import { BrowserRouter as Router, Redirect, NavLink } from 'react-router-dom';
import { Card, Breadcrumb, ProgressBar, Button } from 'react-bootstrap';
import {
  Navbar,
  Collapse,
  NavbarToggler,
  Table,
  Container,
  Nav,
  NavItem,
  Row,
  Col,
} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      studentCourses: [],
      currentCourseName: '',
      currentAttendance: [],
      section: '',
      noData: false,
      Percentage: 0,
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.assignCourse = this.assignCourse.bind(this);
  }
  assignCourse(course, name) {
    this.setState({
      currentCourseName: name,
    });
    var count = 0;
    var Total = 0;
    console.log(course);
    axios
      .get(`/student/attendance/${course}/${this.state.section}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.length === 0) {
          this.setState(
            {
              currentAttendance: [],
              noData: true,
            },
            () => []
          );
          return;
        }
        if (response.data[0].attendance.length !== 0) {
          this.setState(
            {
              currentAttendance: response.data[0].attendance,
            },
            () => {
              response.data[0].attendance.map((obj) => {
                if (obj.state === 'P') {
                  count++;
                }
                Total++;
              });
              var Percentage = (count / Total) * 100;
              this.setState({
                noData: false,
                Percentage: Percentage,
                currentCourseName: response.data[0].course.course_name,
              });
            }
          );
        } else {
          this.setState({ currentAttendance: [], noData: true });
        }
      });
  }
  componentDidMount() {
    this.setState({
      section: this.props.student.student_data[0].admission_section,
    });
    axios.get('/student/sections').then((response) => {
      console.log(response);
      this.setState(
        {
          studentCourses: response.data,
        },
        () => {
          var count = 0;
          var Total = 0;
          axios
            .get(
              `/student/attendance/${this.state.studentCourses[0].course_code}/${this.state.section}`
            )
            .then((response) => {
              this.setState({
                currentCourseName: this.state.studentCourses[0].course_name,
              });
              console.log(response.data[0].attendance.length);
              if (response.data[0].attendance.length !== 0) {
                this.setState(
                  {
                    currentAttendance: response.data[0].attendance,
                  },
                  () => {
                    response.data[0].attendance.map((obj) => {
                      if (obj.state === 'P') {
                        count++;
                      }
                      Total++;
                    });
                    var Percentage = (count / Total) * 100;
                    this.setState({
                      noData: false,
                      Percentage: Percentage,
                      currentCourseName: response.data[0].course.course_name,
                    });
                  }
                );
              } else {
                this.setState({ currentAttendance: [], noData: true });
              }
            });
        }
      );
    });
  }
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    if (this.props.student === []) {
      return <Redirect to="/auth/login" />;
    } else
      return (
        <div className="App2">
          <NavbarPage />
          <Container fluid style={{ paddingTop: '2rem' }}>
            <div style={{ width: 'auto', paddingBottom: '2rem' }}>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard/home">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Attendance</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Card>
              <Card.Header style={{ backgroundColor: 'black' }}>
                {this.state.studentCourses.map((c, i) => {
                  return (
                    <Button
                      key={i}
                      onClick={() => {
                        this.assignCourse(c.course_code, c.course_name);
                      }}
                      style={{
                        marginRight: '1rem',
                        border: 'black',
                        // marginTop: '-10px',
                        maxHeight: '2rem',
                        minHeight: '2rem',
                        float: 'right',
                        padding: '0',
                        color: '#eee2dc',
                        fontSize: '15px',
                        backgroundColor: 'black',
                      }}
                    >
                      {c.course_code}
                    </Button>
                  );
                })}
              </Card.Header>
              <Card.Body
                style={{
                  border: '1px solid black',
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
                }}
              >
                <h2
                  style={{
                    textAlign: 'center',
                    marginTop: '-15px',
                  }}
                >
                  {this.state.currentCourseName}
                  <br />
                  {this.state.noData === false ? (
                    <div>{this.state.Percentage}%</div>
                  ) : null}
                </h2>
                {this.state.noData === false ? (
                  <Row>
                    <Col md="12" style={{ paddingBottom: '0.7rem' }}>
                      <ProgressBar
                        style={{ height: '1rem' }}
                        animated
                        now={this.state.Percentage}
                        label={this.state.Percentage + ' %'}
                      />
                    </Col>
                  </Row>
                ) : null}
                {this.state.noData === false ? (
                  <Table
                    className="align-items-center table-dark table-flush"
                    responsive
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th>Lecture no</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.currentAttendance.map((object, i) => {
                        return (
                          <tr key={i}>
                            <td>{1 + i}</td>
                            <td>{object.class_date}</td>
                            <td>{object.duration_hour} Hours(s)</td>
                            <td>{object.state}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <h3 style={{ textAlign: 'center' }}>No attendance Found</h3>
                )}
              </Card.Body>
            </Card>
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
export default connect(mapStateToProps)(Attendance);
