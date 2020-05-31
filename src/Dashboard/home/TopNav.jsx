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
        <Navbar position="fixed" bg="dark" variant="dark" style={{ height: '5rem' }}>
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
              {/* <div
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
              </div> */}
              <UncontrolledDropdown nav style={{ marginLeft: '-50px' }}>
                <DropdownToggle className="pr-2" nav>
                  <Media className="align-items-center">
                    <span
                      style={{ marginLeft: '-160px' }}
                      className="avatar avatar-sm rounded-circle"
                    >
                      <img
                        src={D}
                        style={{
                          width: '3.5rem',
                          height: '3.5rem',
                          borderRadius: '50%',
                        }}
                      />
                    </span>
                    <Media
                      style={{ marginLeft: '2rem !important' }}
                      className="ml-2 d-none d-lg-block"
                    >
                      <span
                        className="mb-0 text-sm font-weight-bold"
                        style={{ marginLeft: '1rem' }}
                      >
                        Howdy, {this.state.user.first_name}{' '}
                        {this.state.user.last_name}{' '}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/dashboard/home" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem to="/portal/user-profile" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  {/* <DropdownItem to="/portal/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem to="/portal/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem> */}
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      this.props.logout([]);
                    }}
                  >
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* <Popover
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
        </Popover> */}
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
