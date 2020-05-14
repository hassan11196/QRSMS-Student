import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'semantic-ui-react';
// import '../App.css';
import D from '../../assets/img/d.png';
// import 'mdbreact/dist/css/mdb.css';
// import NavbarPage from './NavBar';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Card, Breadcrumb, BreadcrumbItem, ProgressBar } from 'react-bootstrap';
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Table,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  NavbarText,
} from 'reactstrap';
import { connect } from 'react-redux';

class Attendance extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    var data = {
      array: ['OOP', 'Algo', 'DB', 'OOAD', 'CA'],
    };

    if (this.props.student === null) {
      return <Redirect to="/axioslogin" />;
    } else
      return (
        <div className="App2">
          {/* <NavbarPage /> */}
          {/* <Navbar bg="dark" variant="dark" style={{ height: '6rem' }}>
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
          </Navbar> */}
          {/* {console.log(this.state.popoverOpen)}
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
          </Popover> */}
          <Container fluid style={{ paddingTop: '2rem' }}>
            <div style={{ width: 'auto', paddingBottom: '2rem' }}>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard/home">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Attendance</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/* <h3 style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'bold', color: 'black' }}>Attendance</span>
          </h3> */}
            <Card>
              <Card.Header style={{ height: '6rem', backgroundColor: 'black' }}>
                <Router>
                  <Navbar color="black" dark expand="md">
                    <NavbarToggler onClick={this.toggleCollapse} />
                    <Collapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                      {/* <Nav left>
                      <span style={{ color: '#eee2dc' }}>
                        <h5 style={{ color: 'white' }}>Attendance</h5>
                      </span>
                    </Nav> */}
                      <Nav right style={{ color: '#eee2dc', float: 'right' }} navbar>
                        {data.array.map((c, i) => {
                          return (
                            <NavItem
                              className="btn"
                              key={i}
                              style={{
                                float: 'right',
                                padding: '0',
                                color: '#eee2dc',
                                fontSize: '15px',
                                backgroundColor: 'black',
                              }}
                              id="att"
                            >
                              {c}
                            </NavItem>
                          );
                        })}
                      </Nav>
                    </Collapse>
                  </Navbar>
                </Router>
              </Card.Header>
              <Card.Body
                style={{
                  border: '1px solid black',
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
                }}
              >
                <Row>
                  {/* <Col md="2"></Col> */}
                  <Col md="12" style={{ paddingBottom: '0.7rem' }}>
                    <ProgressBar
                      style={{ height: '1rem' }}
                      animated
                      now={80}
                      label={`80%`}
                      //   style={{ color: 'pink' }}
                    />
                  </Col>
                </Row>
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
                    <tr>
                      <td>1</td>
                      <td>8/20/2019</td>
                      <td>1 Hour(s).</td>
                      <td>P</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>8/21/2019</td>
                      <td>1 Hour(s).</td>
                      <td>P</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>8/22/2019</td>
                      <td>1 Hour(s).</td>
                      <td>P</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>8/23/2019</td>
                      <td>1 Hour(s).</td>
                      <td>P</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>8/24/2019</td>
                      <td>1 Hour(s).</td>
                      <td>P</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>8/25/2019</td>
                      <td>1 Hour(s).</td>
                      <td>P</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>8/26/2019</td>
                      <td>1 Hour(s).</td>
                      <td>P</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br /> <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br /> <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br /> <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br /> <br />
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
  console.log('map k ander');
  console.log(state.student);
  return {
    student: state.student,
  };
};
export default connect(mapStateToProps)(Attendance);
