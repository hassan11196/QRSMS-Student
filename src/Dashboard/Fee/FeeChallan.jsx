import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Link, Switch } from 'react-router-dom';
import ChallanTemplate from './FeeTemplate';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavbarPage from '../home/TopNav';
import { Redirect } from 'react-router-dom';
import { FaHome, FaMoneyBillAlt, FaUser, FaBookReader } from 'react-icons/fa';

import { Card, Button, Container, Breadcrumb } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
class FeeChallan extends Component {
  constructor(props) {
    super(props);
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    this.state = {
      challan: [],
      dueDate: '',
      Name: '',
      rollNo: '',
      challanNo: '',
      Discipline: '',
      Semester: '',
      admissionFee: '',
      tutionFee: '',
      Fine: '',
      Other: '',
      Arrears: '',
      WithholdingTax: '',
      Total: '',
      Date: '',
      Words: '',
      finePerDay: '',
      CDate: utc,
    };
  }
  componentDidMount() {
    var converter = require('number-to-words');

    axios.get('/management/get_csrf').then((response) => {
      Cookies.set('csrftoken', response.data.csrfToken);
    });
    this.setState((oldState) => ({
      csrf_token: Cookies.get('csrftoken'),
    }));
    let newDate = new Date();
    let date = newDate.getDate();
    axios.get('/management/getCurrentSemester/').then((response) => {
      let form = new FormData();
      form.append('csrfmiddlewaretoken', Cookies.get('csrftoken'));
      //form.append('code', '');
      form.append('code', response.data);
      axios.post('/student/getChallan/', form).then((response) => {
        console.log(response);
        if (response.data !== 'No Challan' || response.data !== 'No All Challan') {
          this.setState({
            dueDate: response.data.due_date,
            Name: response.data.name,
            rollNo: response.data.roll_no,
            challanNo: response.data.challan_no,
            Discipline: response.data.discipline,
            Semester: response.data.semester,
            admissionFee: response.data.admission_fee,
            tutionFee: response.data.tution_fee,
            Fine: response.data.fine,
            Others: response.data.other,
            Arrears: response.data.arrears,
            WithholdingTax: response.data.withholding,
            Total: response.data.total_amount,
            Date: response.data.due_date,
            finePerDay: response.data.fine_per_day,
            challanNo: response.data.challan_no,
            challan: response.data,
          });
        }
      });
    });
  }
  render() {
    if (this.props.student === undefined) {
      return <Redirect to="/axioslogin" />;
    } else
      return (
        <div className="App2">
          <NavbarPage />
          <BrowserRouter>
            <Switch>
              <Route path="/challantemplate" component={ChallanTemplate}></Route>
            </Switch>
          </BrowserRouter>
          <Container fluid style={{ paddingTop: '2rem' }}>
            <div style={{ width: 'auto', paddingBottom: '2rem' }}>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard/home">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Fee Challan</Breadcrumb.Item>
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
                  <FaMoneyBillAlt size={'2em'} />
                </span>
                <span
                  style={{ fontWeight: 'bold', marginTop: '-4px', color: 'white' }}
                  className="toggletextSize"
                >
                  {' '}
                  Student Challan
                </span>
              </Card.Header>
              <Card.Body>
                {this.state.challan.length !== 0 ? (
                  <Table
                    className="align-items-center table-dark table-flush"
                    responsive
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th>Challan No.</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.challanNo}</td>
                        <td>Rs. {this.state.Total}</td>
                        <td>{this.state.dueDate}</td>
                        <td>Paid</td>

                        <td>
                          <Button
                            href="/admin/feechallan"
                            variant="primary"
                            size="sm"
                          >
                            Print Challan
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                ) : null}
              </Card.Body>
            </Card>
          </Container>
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
export default connect(mapStateToProps)(FeeChallan);
