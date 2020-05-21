import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChallanTemplate from './FeeTemplate';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavbarPage from '../home/TopNav';
import { Redirect } from 'react-router-dom';
import { Card, Container, Breadcrumb } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Table, Badge } from 'reactstrap';
class FeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Details: [],
    };
    this.getFeeDetails = this.getFeeDetails.bind(this);
  }
  getFeeDetails() {
    axios.get('/management/get_csrf').then((response) => {
      Cookies.set('csrftoken', response.data.csrfToken);
    });
    this.setState((oldState) => ({
      csrf_token: Cookies.get('csrftoken'),
    }));
    let newDate = new Date();

    let form = new FormData();
    form.append('csrfmiddlewaretoken', Cookies.get('csrftoken'));
    form.append('code', '');

    axios.post('/student/getChallan/', form).then((response) => {
      if (response.data !== 'No Challan') {
        this.setState({
          Details: response.data,
        });
      }
    });
  }
  componentDidMount() {
    this.getFeeDetails();
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
                <Breadcrumb.Item active>Fee Details</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Card style={{ border: '1px solid black' }}>
              <Card.Header style={{ height: '3rem', backgroundColor: 'black' }}>
                <span>
                  <h3
                    style={{ fontWeight: 'bold', marginTop: '-8px', color: 'white' }}
                  >
                    Fee Details
                  </h3>
                </span>
              </Card.Header>
              <Card.Body>
                {this.state.Details.length !== 0 ? (
                  <Table
                    className="align-items-center table-dark table-flush"
                    responsive
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th>S No.</th>
                        <th>Semester</th>
                        <th>Challan No.</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Payment Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Details.length > 0
                        ? this.state.Details.map((obj, i) => {
                            let semester = obj.semester_id.split('_');
                            return (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{semester[0]}</td>
                                <td>{obj.challan_no}</td>
                                <td>{obj.total_fee}</td>
                                <td>{obj.due_date}</td>
                                <td>{obj.payment_date}</td>
                                <td>
                                  {obj.status === true ? (
                                    <Badge variant="success">Paid</Badge>
                                  ) : (
                                    <Badge variant="danger">Unpaid</Badge>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        : null}
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
export default connect(mapStateToProps)(FeeDetails);
