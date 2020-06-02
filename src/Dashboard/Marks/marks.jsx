import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'semantic-ui-react';
// import '../App.css';
import D from '../../assets/img/d.png';
import NavbarPage from '../home/TopNav';
import { Initial } from 'react-initial';
import { FaSlidersH, FaInfoCircle } from 'react-icons/fa';
import Cookies from 'js-cookie';

import {
    Table,
    Card,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    CardHeader,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    CardBody,
} from 'reactstrap';
import { BrowserRouter as Router, Redirect, NavLink } from 'react-router-dom';
import { Breadcrumb, ProgressBar } from 'react-bootstrap';
import {
    Navbar,
    Collapse,
    NavbarToggler,
    Container,
    Nav,
    NavItem,
    Row,
    Col,
} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

var GrandTotal = 0;
var TotalWeightage = 0;
var MarksTotal = 0;
var WeightageTotal = 0;


class Marks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            studentCourses: [],
            currentCourse: {},
            currentAttendance: [],
            section: '',
            noData: true,
            Percentage: 0,
            marksInfo: "",
            totals: "",

            grandTotal: [{
                "GrandTotal": 0,
                "TotalWeightage": 0,
                "MarksTotal": 0,
                "WeightageTotal": 0,
            }]
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.assignCourse = this.assignCourse.bind(this);
    }
    assignCourse(course) {

        console.log(course)
        let form = new FormData();
        form.append('csrfmiddlewaretoken', Cookies.get('csrftoken'))
        form.append('section', this.state.section)
        form.append('code', course)
        axios.post('/student/get_marks/', form).then((response) => {

            this.setState({ marksInfo: response.data })

        })
    }


    componentDidMount() {
        axios.get('/management/get_csrf').then((response) => {
            Cookies.set('csrftoken', response.data.csrfToken);
        });
        this.setState((oldState) => ({
            csrf_token: Cookies.get('csrftoken'),
        }));
        this.setState({
            section: this.props.student.student_data[0].admission_section,
        });
        axios.get('/student/sections').then((response) => {
            console.log(response);
            this.setState(
                {
                    studentCourses: response.data,
                },
                () => { }
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
                        <div>
                            <Card>
                                <CardHeader style={{ backgroundColor: 'black' }}>
                                    <Router>

                                        <Navbar color="black" dark expand="md">
                                            {
                                                this.state.studentCourses.map((c, i) => {
                                                    return (
                                                        <NavItem key={i}
                                                            style={{ marginTop: '-12px' }}
                                                            className="btn">
                                                            <NavLink to="#"
                                                                onClick={() => {
                                                                    this.assignCourse(c.course_code);
                                                                }}
                                                                style={{
                                                                    marginTop: '-22px',
                                                                    maxHeight: '2rem',
                                                                    minHeight: '2rem',
                                                                    float: 'right',
                                                                    padding: '0',
                                                                    color: '#eee2dc',
                                                                    fontSize: '15px',
                                                                    backgroundColor: 'black',
                                                                }}
                                                                id="att">
                                                                {c.course_code}
                                                            </NavLink>

                                                        </NavItem>
                                                    )
                                                })
                                            }
                                        </Navbar>
                                    </Router>


                                    <span>
                                        <h3 style={{ fontWeight: 'bold', color: 'white' }}>
                                            Student Marks
                          </h3>
                                    </span>
                                </CardHeader>
                                <CardBody style={{ border: '1px solid' }}>
                                    <Table
                                        style={{
                                            paddingTop: '1rem',
                                            borderRadius: '0.25rem',
                                            borderTopLeftRadius: '0.25rem',
                                            borderTopRightRadius: '0.25rem',
                                        }}
                                        className=" table-dark table-flush"
                                        responsive
                                    >
                                        <thead className="thead-dark">
                                            {/* <th style={{textAlign:'center'}}>Serial No.</th> */}
                                            <th>
                                                <span style={{ marginLeft: '2rem' }}>Evaluation</span>
                                            </th>
                                            <th style={{ textAlign: 'center' }}>Total Marks</th>
                                            <th style={{ textAlign: 'center' }}>Obtained Marks</th>
                                            <th style={{ textAlign: 'center' }}>Total Weightage</th>
                                            <th style={{ textAlign: 'center' }}>Obtained Weightage</th>
                                            <th style={{ textAlign: 'center' }}>Average</th>
                                            <th style={{ textAlign: 'center' }}>
                                                Standard Deviation
                            </th>
                                            <th style={{ textAlign: 'center' }}>Max</th>
                                            <th style={{ textAlign: 'center' }}>Min</th>

                                        </thead>
                                        <tbody>
                                            {this.state.marksInfo != "" && this.state.marksInfo != null ? this.state.marksInfo.marks_info.map((obj, i) => {

                                                GrandTotal += obj.total_marks
                                                TotalWeightage += obj.weightage
                                                MarksTotal += obj.obtained_marks
                                                WeightageTotal += obj.obtained_weightage
                                                console.log(GrandTotal + ' ' + TotalWeightage + ' ' + WeightageTotal + ' ' + WeightageTotal)

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
                                                                        name={obj.marks_type}
                                                                    />
                                                                </a>
                                                                <Media>
                                                                    <span
                                                                        style={{ textAlign: 'center' }}
                                                                        className="mb-0 text-sm"
                                                                    >
                                                                        {obj.marks_type}
                                                                    </span>
                                                                </Media>
                                                            </Media>
                                                        </th>

                                                        <td
                                                            style={{
                                                                textAlign: 'center',
                                                                paddingTop: '2rem',
                                                            }}
                                                        >
                                                            {obj.total_marks}
                                                        </td>
                                                        <td
                                                            style={{
                                                                textAlign: 'center',
                                                                paddingTop: '2rem',
                                                            }}
                                                        >
                                                            {obj.obtained_marks}
                                                        </td>
                                                        <td
                                                            style={{
                                                                textAlign: 'center',
                                                                paddingTop: '2rem',
                                                            }}
                                                        >
                                                            {obj.weightage}
                                                        </td>
                                                        <td
                                                            style={{
                                                                textAlign: 'center',
                                                                paddingTop: '2rem',
                                                            }}
                                                        >
                                                            {obj.obtained_weightage}
                                                        </td>
                                                        <td
                                                            style={{
                                                                textAlign: 'center',
                                                                paddingTop: '2rem',
                                                            }}
                                                        >
                                                            {obj.marks_mean != null ? obj.marks_mean.toFixed(2) : "null"}
                                                        </td>
                                                        <td
                                                            style={{
                                                                textAlign: 'center',
                                                                paddingTop: '2rem',
                                                            }}
                                                        >
                                                            {obj.marks_std_dev != null ? obj.marks_std_dev.toFixed(2) : "null"}
                                                        </td>
                                                        <td
                                                            style={{
                                                                textAlign: 'center',
                                                                paddingTop: '2rem',
                                                            }}
                                                        >
                                                            {obj.max_marks}
                                                        </td>
                                                        <td
                                                            style={{
                                                                textAlign: 'center',
                                                                paddingTop: '2rem',
                                                            }}
                                                        >
                                                            {obj.min_marks}
                                                        </td>
                                                    </tr>
                                                );
                                            }) : <div></div>}

                                            {/*  */}
                                            {
                                                this.state.marksInfo ? this.state.grandTotal.map((c) => {
                                                    console.log(GrandTotal + ' ' + TotalWeightage + ' ' + WeightageTotal + ' ' + WeightageTotal)
                                                    return (
                                                        <tr >
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
                                                                            style={{ textAlign: 'center' }}
                                                                            className="mb-0 text-sm"
                                                                        >
                                                                            Total
                                                                    </span>
                                                                    </Media>
                                                                </Media>
                                                            </th>

                                                            <td
                                                                style={{
                                                                    textAlign: 'center',
                                                                    paddingTop: '2rem',
                                                                }}
                                                            >
                                                                {}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign: 'center',
                                                                    paddingTop: '2rem',
                                                                }}
                                                            >
                                                                {}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign: 'center',
                                                                    paddingTop: '2rem',
                                                                }}
                                                            >
                                                                {this.state.marksInfo.total[0].total_marks}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign: 'center',
                                                                    paddingTop: '2rem',
                                                                }}
                                                            >
                                                                {this.state.marksInfo.total[0].obtained_total}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign: 'center',
                                                                    paddingTop: '2rem',
                                                                }}
                                                            >
                                                                {}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    textAlign: 'center',
                                                                    paddingTop: '2rem',
                                                                }}
                                                            >
                                                                {}
                                                            </td>

                                                        </tr>
                                                    )
                                                }) : <div></div>
                                            }
                                            {/*  */}


                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </div>
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
export default connect(mapStateToProps)(Marks);
