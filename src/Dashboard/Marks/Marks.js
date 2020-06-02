import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'semantic-ui-react';
// import '../App.css';
import D from '../../assets/img/d.png';
import { Initial } from 'react-initial';
import NavbarPage from '../home/TopNav';
// import 'mdbreact/dist/css/mdb.css';
// import NavbarPage from './NavBar';
import { BrowserRouter as Router, Redirect, NavLink } from 'react-router-dom';
import { Card, Breadcrumb, ProgressBar, Button } from 'react-bootstrap';
import { Table, Container, Media } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
class Marks1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TotalMarks: 0,
      TotalObtMarks: 0,
      TotalWtg: 0,
      TotalObtWtg: 0,
      isOpen: false,
      studentCourses: [],
      currentCourse: {},
      currentMarks: [],
      section: '',
      noData: true,
      Percentage: 0,
      noMarks: true,
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.assignCourse = this.assignCourse.bind(this);
  }
  assignCourse(course, name) {
    var tm = 0;
    var om = 0;
    var tw = 0;
    var ow = 0;
    console.log(name);
    this.setState({
      currentCourse: name,
    });
    let form = new FormData();
    form.append('csrfmiddlewaretoken', Cookies.get('csrftoken'));
    form.append('section', this.state.section);
    form.append('code', course);
    axios
      .post('/student/get_scsddc/', form)
      .then((response) => {
        console.log(response.data);
      })
      .then(() => {
        axios.post('/student/get_marks/', form).then((response) => {
          console.log(response.data);
          if (response.data.Status === "Success") {
            this.setState(
              {
                noMarks: false,
                currentMarks: response.data.marks_info,
              },
              () => {
                if (this.state.currentMarks.length > 0) {
                  var len = this.state.currentMarks.length;
                  var i = 0;
                  for (i = 0; i < len; i++) {
                    tm = tm + this.state.currentMarks[i].total_marks;
                    om = om + this.state.currentMarks[i].obtained_marks;
                    tw = tw + this.state.currentMarks[i].weightage;
                    ow = ow + this.state.currentMarks[i].obtained_weightage;
                  }
                  this.setState({
                    TotalMarks: tm,
                    TotalObtMarks: om,
                    TotalWtg: tw,
                    TotalObtWtg: ow,
                  });
                } else {
                  this.setState({
                    currentMarks: [],
                  });
                }
              }
            );
          }
          else {
            this.setState({ noMarks: true });
          }
        });
      });
    console.log(course);
  }
  componentDidMount() {
    var tm = 0;
    var om = 0;
    var tw = 0;
    var ow = 0;

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
          if (this.state.studentCourses.length !== 0) {
            let form = new FormData();
            form.append('csrfmiddlewaretoken', Cookies.get('csrftoken'));
            form.append('section', this.state.section);
            form.append('code', this.state.studentCourses[0].course_code);
            axios
              .post('/student/get_scsddc/', form)
              .then((response) => {
                console.log(response.data);
              })
              .then(() => {
                axios
                  .post('/student/get_marks/', form)

                  .then((response) => {
                    // if (response.Status !== 'Succes') {
                    //   this.setState({
                    //     currentMarks: [],
                    //     currentCourse: this.state.studentCourses[0].course_name,
                    //   });
                    // }
                    this.setState(
                      {
                        currentMarks: response.data.marks_info,
                        currentCourse: this.state.studentCourses[0].course_name,
                      },
                      () => {
                        if (this.state.noMarks === false) {
                          var len = this.state.currentMarks.length;
                          var i = 0;
                          for (i = 0; i < len; i++) {
                            tm = tm + this.state.currentMarks[i].total_marks;
                            om = om + this.state.currentMarks[i].obtained_marks;
                            tw = tw + this.state.currentMarks[i].weightage;
                            ow = ow + this.state.currentMarks[i].obtained_weightage;
                          }
                          this.setState({
                            TotalMarks: tm,
                            TotalObtMarks: om,
                            TotalWtg: tw,
                            TotalObtWtg: ow,
                          });
                        }
                      }
                    );
                  });
              })
              .then((json) => json)
              .catch((err) => {
                console.log('Ahsan', err);
                this.setState({
                  currentMarks: [],
                });
                // alert('Invalid ID or Password');
                // this.invalidpassword()
                // window.location.reload()
                //
              });
          }
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
                <Breadcrumb.Item active>Marks</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Card>
              <Card.Header style={{ backgroundColor: 'black' }}>
                {/* <Button
                  style={{
                    border: 'black',
                    marginTop: '-10px',
                    // marginBottom: '-10px',
                    maxHeight: '2rem',
                    minHeight: '2rem',
                    float: 'left',
                    padding: '0',
                    color: '#eee2dc',
                    fontSize: '15px',
                    backgroundColor: 'black',
                  }}
                >
                  Student Marks
                </Button> */}
                {/* <span><h3
                  style={{
                    marginTop: '-7px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '1rem',
                  }}
                >
                  Student Marks
                </h3>
                </span> */}
                {this.state.studentCourses.map((c, i) => {
                  return (
                    <Button
                      key={i}
                      onClick={() => {
                        this.assignCourse(c.course_code, c.course_name);
                      }}
                      style={{
                        border: 'black',
                        // marginTop: '-10px',
                        maxHeight: '2rem',
                        // marginBottom: '4rem',
                        minHeight: '2rem',
                        marginRight: '0.5rem',
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
                {this.state.noMarks ? (
                  <div>No marks Data</div>
                ) : (
                    <div>
                      <h2 style={{ textAlign: 'center', marginTop: '-15px' }}>
                        {this.state.currentCourse}
                      </h2>
                      <Table
                        className="align-items-center table-dark table-flush"
                        responsive
                      >
                        <thead className="thead-dark">
                          <tr>
                            <th>Type</th>
                            <th>Total Marks</th>
                            <th>Obt. Marks</th>
                            <th>Total Wtg</th>
                            <th>Obt. Wtg</th>
                            <th>Marks Mean</th>
                            <th>Wtg Mean</th>
                            <th>Marks SD.</th>
                            <th>Wtg SD.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.noMarks != true ? this.state.currentMarks.map((object, i) => {
                            return (
                              <tr key={i}>
                                <th scope="row" style={{ textAlign: 'center' }}>
                                  <Media className="align-items-center">
                                    <a
                                      className="avatar rounded-circle mr-3"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <Initial
                                        radius={55}
                                        height={40}
                                        width={40}
                                        seed={1}
                                        fontSize={20}
                                        name={object.marks_type}
                                      />
                                    </a>
                                    <Media>
                                      <span
                                        style={{ textAlign: 'center' }}
                                        className="mb-0 text-sm"
                                      >
                                        {object.marks_type}
                                      </span>
                                    </Media>
                                  </Media>
                                </th>
                                {/* <td>{object.marks_type}</td> */}
                                <td style={{ textAlign: 'center' }}>
                                  {object.total_marks}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {object.obtained_marks}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {object.weightage}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {object.obtained_weightage}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {object.marks_mean.toFixed(2)}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {object.weightage_mean.toFixed(2)}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {object.marks_std_dev.toFixed(2)}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  {object.weightage_std_dev.toFixed(2)}
                                </td>
                              </tr>
                            );
                          }) : <div></div>}
                          <tr>
                            <th scope="row" style={{ textAlign: 'center' }}>
                              <Media className="align-items-center">
                                <a
                                  className="avatar rounded-circle mr-3"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <Initial
                                    radius={55}
                                    height={40}
                                    width={40}
                                    seed={1}
                                    fontSize={20}
                                    name="Total"
                                  />
                                </a>
                                <Media>
                                  <span
                                    style={{ color: 'red', fontWeight: '900' }}
                                    className="mb-0 text-sm"
                                  >
                                    Total
                                </span>
                                </Media>
                              </Media>
                            </th>
                            {/* <td style={{ color: 'red', fontWeight: '900' }}>Total</td> */}
                            <td
                              style={{
                                color: 'red',
                                textAlign: 'center',
                                fontWeight: '900',
                              }}
                            >
                              {this.state.TotalMarks}
                            </td>
                            <td
                              style={{
                                color: 'red',
                                textAlign: 'center',
                                fontWeight: '900',
                              }}
                            >
                              {this.state.TotalObtMarks}
                            </td>
                            <td
                              style={{
                                color: 'red',
                                textAlign: 'center',
                                fontWeight: '900',
                              }}
                            >
                              {this.state.TotalWtg}
                            </td>
                            <td
                              style={{
                                color: 'red',
                                textAlign: 'center',
                                fontWeight: '900',
                              }}
                            >
                              {this.state.TotalObtWtg}
                            </td>
                            <td style={{ color: 'red', textAlign: 'center' }}>-</td>
                            <td style={{ color: 'red', textAlign: 'center' }}>-</td>
                            <td style={{ color: 'red', textAlign: 'center' }}>-</td>
                            <td style={{ color: 'red', textAlign: 'center' }}>-</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
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
export default connect(mapStateToProps)(Marks1);
