import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './transcript.css';
// import 'mdbreact/dist/css/mdb.css';
import { Card, Container, Breadcrumb } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Row, Table, Col } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import NavbarPage from '../home/TopNav';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: [],
      user: [],
      csrf_token: '',
      TranscriptData: [],
    };
    this.getTranscriptData = this.getTranscriptData.bind(this);
  }
  getTranscriptData() {
    console.log(this.state.student);
    let form = new FormData();
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('id', this.state.student.uid);
    axios.post('/management/get_transcript/', form).then((response) => {
      console.log(response);
      this.setState({
        TranscriptData: response.data,
      });
    });
  }
  componentDidMount() {
    axios.get('/management/get_csrf').then((response) => {
      return response.data.csrftoken;
    });

    this.setState({
      csrf_token: Cookies.get('csrftoken'),
    });
    this.setState(
      {
        student: this.props.student.student_data[0],
        user: this.props.student.user_data,
      },
      () => {
        this.getTranscriptData();
      }
    );
  }
  render() {
    console.log(this.state.student);
    if (this.props.student === undefined) {
      return <Redirect to="/axioslogin" />;
    } else
      return (
        <div className="Settings">
          {/* <NavbarPage /> */}
          <NavbarPage />

          <Container fluid style={{ paddingTop: '2rem' }}>
            <div style={{ width: 'auto', paddingBottom: '2rem' }}>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard/home">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Transcript</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Card style={{ border: '1px solid black' }}>
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
                  {/* <FaMoneyBillAlt size={'2em'} /> */}
                </span>
                <span
                  style={{ fontWeight: 'bold', marginTop: '-4px', color: 'white' }}
                  className="toggletextSize"
                >
                  {' '}
                  Student Transcript
                </span>
              </Card.Header>
              <Card.Body>
                <Row>
                  {/* <Col md="3">
                    <h5 style={{ fontWeight: 'bolder', textAlign: 'left' }}>
                      Fall 2017
                    </h5>
                  </Col>
                  <Col md="3">
                    <span style={{ textAlign: 'left' }}>Cr.Attempted:</span>
                    <span style={{ textAlign: 'left' }}>17</span>
                  </Col>
                  <Col md="2">
                    <span style={{ textAlign: 'left' }}>Cr.Earned:</span>
                    <span style={{ textAlign: 'left' }}>17</span>
                  </Col>
                  <Col md="2">
                    <span style={{ textAlign: 'left' }}>CGPA:</span>
                    <span style={{ textAlign: 'left' }}>2.49</span>
                  </Col>
                  <Col md="2">
                    <span style={{ textAlign: 'left' }}>SGPA:</span>
                    <span style={{ textAlign: 'left' }}>2.49</span>
                  </Col> */}
                </Row>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                  size="sm"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th>Code</th>
                      <th>Course Title</th>
                      <th>CrdHrs</th>
                      <th>Points</th>
                      <th>Grades</th>
                      <th>type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.TranscriptData !== undefined &&
                    this.state.TranscriptData !== [] &&
                    this.state.TranscriptData !== null
                      ? this.state.TranscriptData.map((obj, i) => {
                          let info = obj.scsddc.split('_');
                          return (
                            <tr key={i}>
                              <td>{info[1]}</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
          {/* <Container bsPrefix="cont">
            <br />
            <br />
            <br />
            <h3 style={{ textAlign: 'left' }}>
              <span style={{ fontWeight: 'bold', color: 'black' }}>Academics</span>
              <span> | Transcript</span>
            </h3>
            <br />
            <Card style={{ backgroundColor: '#eee2dc' }}>
              <Card.Body>
                <Row>
                  <Col md="3">
                    <span style={{ fontWeight: 'bold' }}>Name: </span>
                    <span>
                      {this.state.user.first_name} {this.state.user.last_name}
                    </span>
                  </Col>
                  <Col>
                    <span style={{ fontWeight: 'bold' }}>ARN: </span>
                    <span>{this.state.student.arn}</span>
                  </Col>
                  <Col>
                    <span style={{ fontWeight: 'bold' }}>Roll No: </span>
                    <span>{this.state.student.uid}</span>
                  </Col>
                  <Col>
                    <span style={{ fontWeight: 'bold' }}>Batch: </span>
                    <span>{this.state.student.batch}</span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header style={{ backgroundColor: 'black' }}>
              </Card.Header>

              <Card.Body style={{ backgroundColor: '#eee2dc' }}>
                <Row>
                  <Col></Col>
                </Row>
              </Card.Body>
            </Card>
          </Container> */}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      );
  }
}
const mapStateToProps = (state) => {
  console.log(state.student);
  return {
    student: state.student,
  };
};
export default connect(mapStateToProps)(Transcript);
