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
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  // Navbar,
  // Nav,
  // Container,
  Media,
} from 'reactstrap';

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popover: false,
      student: [],
      user: [],
      popoverOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }
  componentDidMount() {
    this.setState(
      {
        student: this.props.student.student_data[0],
        user: this.props.student.user_data,
      },
      () => {
        console.log(this.state.student, 'registration');
      }
    );
  }
  render() {
    if (
      this.props.student === null ||
      this.props.student === [] ||
      this.props.student === undefined
    ) {
      return <Redirect to="/auth/login" />;
    }
    return (
      <div>
        <Navbar
          position="fixed"
          bg="dark"
          variant="dark"
          style={{ marginTop: '-10px', height: '6rem' }}
        >
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
                    onClick={
                      (() => {
                        this.toggle();
                      },
                      () => {
                        console.log(this.state.popoverOpen);
                      })
                    }
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
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="Popover1"
          toggle={this.toggle}
        >
          <PopoverBody
            className="btn"
            style={{ wordSpacing: '1rem' }}
            onClick={() => {
              this.props.logout([]);
            }}
          >
            <i className="fas fa-power-off"></i>
            <span type="button" style={{ paddingLeft: '0.7rem' }}>
              Logout
            </span>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (s) => {
      dispatch({ type: 'logout', payload: { s } });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    student: state.student,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavbarPage);
