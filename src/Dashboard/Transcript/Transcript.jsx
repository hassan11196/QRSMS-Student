import React, { Component } from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './transcript.css';
// import 'mdbreact/dist/css/mdb.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

import { Card, Container, Breadcrumb, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Row, Table, Col, Accordion } from 'react-bootstrap';
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
      fruits: [
        { name: 'Apple' },
        { name: 'Orange' },
        { name: 'Banana' },
        { name: 'Lemon' },
      ],
      fruitsdrop: [],
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
    axios.post('/student/get_transcript/', form).then((response) => {
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
    if (this.props.student === []) {
      return <Redirect to="/auth/login" />;
    } else
      return (
        <div className="Settings">
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
                style={{
                  marginLeft: '-1px',
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
                  <Col lg={12}>
                    {this.state.TranscriptData !== [] ||
                      this.state.TranscriptData !== null
                      ? this.state.TranscriptData.map((obj, i) => {
                        let sem = obj.semester.split('_');
                        return (
                          <div key={i}>
                            <Accordion defaultActiveKey="0">
                              <Card>
                                <Card.Header>
                                  <Accordion.Toggle
                                    as={Button}
                                    variant="link"
                                    eventKey={i}
                                    style={{ width: '100%' }}
                                  >
                                    <Row>
                                      <Col
                                        xs="12"
                                        md="4"
                                        style={{
                                          paddingRight: '0',
                                          marginRight: '0',
                                        }}
                                      >
                                        <h5
                                          style={{
                                            fontWeight: 'bolder',
                                            textAlign: 'left',
                                          }}
                                        >
                                          {sem[0]}
                                        </h5>
                                      </Col>
                                      <Col
                                        xs="6"
                                        md="2"
                                        style={{ padding: '0', margin: '0' }}
                                      >
                                        <span
                                          style={{
                                            fontSize: '12px',
                                            textAlign: 'left',
                                          }}
                                        >
                                          Cr. Att:
                                          </span>
                                        <span
                                          style={{
                                            fontSize: '12px',
                                            textAlign: 'left',
                                          }}
                                        >
                                          {obj.credit_hours_attempted}
                                        </span>
                                      </Col>
                                      <Col
                                        xs="6"
                                        md="2"
                                        style={{ padding: '0', margin: '0' }}
                                      >
                                        <span
                                          style={{
                                            fontSize: '12px',
                                            textAlign: 'left',
                                          }}
                                        >
                                          Cr. Ernd:
                                          </span>
                                        <span
                                          style={{
                                            fontSize: '12px',
                                            textAlign: 'left',
                                          }}
                                        >
                                          {obj.credit_hours_earned}
                                        </span>
                                      </Col>
                                      <Col
                                        xs="6"
                                        md="2"
                                        style={{ padding: '0', margin: '0' }}
                                      >
                                        <span
                                          style={{
                                            fontSize: '12px',
                                            textAlign: 'left',
                                          }}
                                        >
                                          CGPA:
                                          </span>
                                        <span
                                          style={{
                                            fontSize: '12px',
                                            textAlign: 'left',
                                          }}
                                        >
                                          {obj.cgpa}
                                        </span>
                                      </Col>
                                      <Col
                                        xs="6"
                                        md="2"
                                        style={{ padding: '0', margin: '0' }}
                                      >
                                        <span
                                          style={{
                                            fontSize: '12px',
                                            textAlign: 'left',
                                          }}
                                        >
                                          SGPA:
                                          </span>
                                        <span
                                          style={{
                                            fontSize: '12px',
                                            textAlign: 'left',
                                          }}
                                        >
                                          {obj.sgpa}
                                        </span>
                                      </Col>
                                    </Row>
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i}>
                                  <Card.Body>
                                    {' '}
                                    <Table
                                      style={{ paddingLeft: '0' }}
                                      className="align-items-center table-dark table-flush"
                                      responsive
                                      size="sm"
                                    >
                                      <thead className="thead-dark">
                                        <tr>
                                          <th>Code</th>
                                          <th>Course Title</th>
                                          <th style={{ textAlign: 'center' }}>
                                            CrdHrs
                                            </th>
                                          <th style={{ textAlign: 'center' }}>
                                            Points
                                            </th>
                                          <th style={{ textAlign: 'center' }}>
                                            Grades
                                            </th>
                                          <th>type</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {obj.course_result.map((object, j) => {
                                          // let info = obj.scsddc.split('_');
                                          return (
                                            <tr key={j}>
                                              <td>{object.course}</td>
                                              <td></td>
                                              <td
                                                style={{ textAlign: 'center' }}
                                              ></td>
                                              <td style={{ textAlign: 'center' }}>
                                                {object.gpa}
                                              </td>

                                              <td style={{ textAlign: 'center' }}>
                                                {object.grade}
                                              </td>
                                              <td></td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </Table>
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            </Accordion>
                            {/* <Card.Body> */}
                            {/* </Card.Body> */}
                          </div>
                        );
                      })
                      : null}
                  </Col>
                </Row>
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
