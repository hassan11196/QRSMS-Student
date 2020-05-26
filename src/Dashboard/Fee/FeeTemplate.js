import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from '../../assets/img/background1.jpg';
import './FeeTemplate.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

class ChallanTemplate extends Component {
  constructor(props) {
    super(props);
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    this.state = {
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
    axios.get('/management/getCurrentSemester').then((response) => {
      let form = new FormData();
      form.append('csrfmiddlewaretoken', Cookies.get('csrftoken'));
      form.append('code', response.data);

      axios.post('/student/getChallan/', form).then((response) => {
        console.log(response);
        if (response.data !== 'No Challan') {
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
            Words: converter.toWords(parseInt(response.data.total_amount)),
            finePerDay: response.data.fine_per_day,
            challanNo: response.data.challan_no,
          });
        }
      });
    });
    // const input = document.getElementById('challan');
    // html2canvas(input, { scale: 1.335 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF('p', 'mm', 'a3', true);
    //   pdf.addImage(imgData, 'JPEG', '', '', '', 'SLOW');
    //   pdf.output('dataurlnewwindow');
    //   pdf.save('download.pdf');
    // });
  }
  render() {
    if (this.props.student === null) {
      return <Redirect to="/axioslogin" />;
    } else
      return (
        <div
          id="challan"
          style={{
            marginTop: '2rem',
            position: 'absolute',
            left: '50%',
            marginLeft: '-421px',
            top: 0,
            width: 842,
            height: 495,
            borderStyle: 'outset',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', left: 0, top: 0 }}>
            <img src={Image} width={842} height={595} alt="template not found" />
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '9.82px' }}
            className="cls_002"
          >
            <span className="cls_002">STUDENT COPY</span>
          </div>
          <div
            style={{ position: 'absolute', left: '176.12px', top: '9.82px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.challanNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '9.82px' }}
            className="cls_002"
          >
            <span className="cls_002">NU COPY</span>
          </div>
          <div
            style={{ position: 'absolute', left: '383.11px', top: '9.82px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.challanNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '9.82px' }}
            className="cls_002"
          >
            <span className="cls_002">ACCOUNTS COPY</span>
          </div>
          <div
            style={{ position: 'absolute', left: '590.80px', top: '9.82px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.challanNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '9.82px' }}
            className="cls_002"
          >
            <span className="cls_002">BANK COPY</span>
          </div>
          <div
            style={{ position: 'absolute', left: '759.20px', top: '9.82px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.challanNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '75.78px', top: '23.86px' }}
            className="cls_004"
          >
            <span className="cls_004">Faysal Bank Limited</span>
          </div>
          <div
            style={{ position: 'absolute', left: '282.77px', top: '23.86px' }}
            className="cls_004"
          >
            <span className="cls_004">Faysal Bank Limited</span>
          </div>
          <div
            style={{ position: 'absolute', left: '490.47px', top: '23.86px' }}
            className="cls_004"
          >
            <span className="cls_004">Faysal Bank Limited</span>
          </div>
          <div
            style={{ position: 'absolute', left: '698.16px', top: '23.86px' }}
            className="cls_004"
          >
            <span className="cls_004">Faysal Bank Limited</span>
          </div>
          <div
            style={{ position: 'absolute', left: '94.73px', top: '40.70px' }}
            className="cls_005"
          >
            <span className="cls_005">FAST-KHI</span>
          </div>
          <div
            style={{ position: 'absolute', left: '301.72px', top: '40.70px' }}
            className="cls_005"
          >
            <span className="cls_005">FAST-KHI</span>
          </div>
          <div
            style={{ position: 'absolute', left: '508.71px', top: '40.70px' }}
            className="cls_005"
          >
            <span className="cls_005">FAST-KHI</span>
          </div>
          <div
            style={{ position: 'absolute', left: '717.10px', top: '40.70px' }}
            className="cls_005"
          >
            <span className="cls_005">FAST-KHI</span>
          </div>
          <div
            style={{ position: 'absolute', left: '74.38px', top: '57.54px' }}
            className="cls_005"
          >
            <span className="cls_005">0169007900151245</span>
          </div>
          <div
            style={{ position: 'absolute', left: '281.37px', top: '57.54px' }}
            className="cls_005"
          >
            <span className="cls_005">0169007900151245</span>
          </div>
          <div
            style={{ position: 'absolute', left: '489.06px', top: '57.54px' }}
            className="cls_005"
          >
            <span className="cls_005">0169007900151245</span>
          </div>
          <div
            style={{ position: 'absolute', left: '696.76px', top: '57.54px' }}
            className="cls_005"
          >
            <span className="cls_005">0169007900151245</span>
          </div>
          <div
            style={{ position: 'absolute', left: '74.38px', top: '74.38px' }}
            className="cls_004"
          >
            <span className="cls_004">Fee can be paid at all</span>
          </div>
          <div
            style={{ position: 'absolute', left: '281.37px', top: '74.38px' }}
            className="cls_004"
          >
            <span className="cls_004">Fee can be paid at all</span>
          </div>
          <div
            style={{ position: 'absolute', left: '488.36px', top: '74.38px' }}
            className="cls_004"
          >
            <span className="cls_004">Fee can be paid at all</span>
          </div>
          <div
            style={{ position: 'absolute', left: '696.76px', top: '74.38px' }}
            className="cls_004"
          >
            <span className="cls_004">Fee can be paid at all</span>
          </div>
          <div
            style={{ position: 'absolute', left: '75.78px', top: '88.41px' }}
            className="cls_004"
          >
            <span className="cls_004">Faysal Bank Limited</span>
          </div>
          <div
            style={{ position: 'absolute', left: '282.77px', top: '88.41px' }}
            className="cls_004"
          >
            <span className="cls_004">Faysal Bank Limited</span>
          </div>
          <div
            style={{ position: 'absolute', left: '490.47px', top: '88.41px' }}
            className="cls_004"
          >
            <span className="cls_004">Faysal Bank Limited</span>
          </div>
          <div
            style={{ position: 'absolute', left: '698.16px', top: '88.41px' }}
            className="cls_004"
          >
            <span className="cls_004">Faysal Bank Limited</span>
          </div>
          <div
            style={{ position: 'absolute', left: '85.60px', top: '102.44px' }}
            className="cls_004"
          >
            <span className="cls_004">branches across</span>
          </div>
          <div
            style={{ position: 'absolute', left: '292.60px', top: '102.44px' }}
            className="cls_004"
          >
            <span className="cls_004">branches across</span>
          </div>
          <div
            style={{ position: 'absolute', left: '499.59px', top: '102.44px' }}
            className="cls_004"
          >
            <span className="cls_004">branches across</span>
          </div>
          <div
            style={{ position: 'absolute', left: '707.98px', top: '102.44px' }}
            className="cls_004"
          >
            <span className="cls_004">branches across</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '123.49px' }}
            className="cls_003"
          >
            <span className="cls_003">Due Date:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '56.13px', top: '123.49px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.dueDate}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '123.49px' }}
            className="cls_003"
          >
            <span className="cls_003">Due Date:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '263.13px', top: '123.49px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.dueDate}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '123.49px' }}
            className="cls_003"
          >
            <span className="cls_003">Due Date:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '470.12px', top: '123.49px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.dueDate}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '123.49px' }}
            className="cls_003"
          >
            <span className="cls_003">Due Date:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '677.81px', top: '123.49px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.dueDate}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '134.72px' }}
            className="cls_003"
          >
            <span className="cls_003">Name:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '56.13px', top: '134.72px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Name}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '134.72px' }}
            className="cls_003"
          >
            <span className="cls_003">Name:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '263.13px', top: '134.72px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Name}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '134.72px' }}
            className="cls_003"
          >
            <span className="cls_003">Name:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '470.12px', top: '134.72px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Name}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '134.72px' }}
            className="cls_003"
          >
            <span className="cls_003">Name:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '677.81px', top: '134.72px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Name}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '145.95px' }}
            className="cls_003"
          >
            <span className="cls_003">Discpline:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '56.13px', top: '145.95px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Discipline}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '96.83px', top: '145.95px' }}
            className="cls_003"
          >
            <span className="cls_003">RollNo:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '137.53px', top: '145.95px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.rollNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '145.95px' }}
            className="cls_003"
          >
            <span className="cls_003">Discpline:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '263.13px', top: '145.95px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Discipline}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '303.82px', top: '145.95px' }}
            className="cls_003"
          >
            <span className="cls_003">RollNo:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '344.52px', top: '145.95px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.rollNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '145.95px' }}
            className="cls_003"
          >
            <span className="cls_003">Discpline:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '470.12px', top: '145.95px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Discipline}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '510.81px', top: '145.95px' }}
            className="cls_003"
          >
            <span className="cls_003">RollNo:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '551.51px', top: '145.95px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.rollNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '145.95px' }}
            className="cls_003"
          >
            <span className="cls_003">Discpline:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '677.81px', top: '145.95px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Discipline}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '718.51px', top: '145.95px' }}
            className="cls_003"
          >
            <span className="cls_003">RollNo:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '759.20px', top: '145.95px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.rollNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '157.17px' }}
            className="cls_003"
          >
            <span className="cls_003">Semester:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '56.13px', top: '157.17px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Semester}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '96.83px', top: '157.17px' }}
            className="cls_003"
          >
            <span className="cls_003">Challan#:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '137.53px', top: '157.17px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.challanNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '157.17px' }}
            className="cls_003"
          >
            <span className="cls_003">Semester:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '263.13px', top: '157.17px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Semester}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '303.82px', top: '157.17px' }}
            className="cls_003"
          >
            <span className="cls_003">Challan#:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '344.52px', top: '157.17px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.challanNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '157.17px' }}
            className="cls_003"
          >
            <span className="cls_003">Semester:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '470.12px', top: '157.17px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Semester}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '510.81px', top: '157.17px' }}
            className="cls_003"
          >
            <span className="cls_003">Challan#:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '551.51px', top: '157.17px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.challanNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '157.17px' }}
            className="cls_003"
          >
            <span className="cls_003">Semester:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '677.81px', top: '157.17px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Semester}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '718.51px', top: '157.17px' }}
            className="cls_003"
          >
            <span className="cls_003">Challan#:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '759.20px', top: '157.17px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.challanNo}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">Admission Fee:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '90.52px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '198.57px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.admissionFee}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">Admission Fee:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '297.51px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '405.56px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.admissionFee}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">Admission Fee:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '505.20px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '613.26px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.admissionFee}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">Admission Fee:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '712.89px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '821.65px', top: '181.03px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.admissionFee}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">Tuition Fee:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '90.52px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '178.93px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.tutionFee}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">Tuition Fee:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '297.51px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '385.92px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.tutionFee}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">Tuition Fee:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '505.20px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '593.61px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.tutionFee}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">Tuition Fee:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '712.89px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '802.01px', top: '192.26px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.tutionFee}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">Fine:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '90.52px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '198.57px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Fine}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">Fine:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '297.51px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '405.56px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Fine}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">Fine:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '505.20px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '613.26px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Fine}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">Fine:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '712.89px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '821.65px', top: '203.48px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Fine}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">Other(s):</span>
          </div>
          <div
            style={{ position: 'absolute', left: '90.52px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '185.94px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Others}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">Other(s):</span>
          </div>
          <div
            style={{ position: 'absolute', left: '297.51px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '392.93px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Others}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">Other(s):</span>
          </div>
          <div
            style={{ position: 'absolute', left: '505.20px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '600.63px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Others}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">Other(s):</span>
          </div>
          <div
            style={{ position: 'absolute', left: '712.89px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '809.02px', top: '214.71px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Others}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">Arrears:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '90.52px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '198.57px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Arrears}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">Arrears:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '297.51px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '405.56px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Arrears}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">Arrears:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '505.20px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '613.26px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Arrears}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">Arrears:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '712.89px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '821.65px', top: '225.94px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Arrears}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">Withholding Tax:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '90.52px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '198.57px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.WithholdingTax}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">Withholding Tax:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '297.51px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '405.56px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.WithholdingTax}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">Withholding Tax:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '505.20px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '613.26px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.WithholdingTax}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">Withholding Tax:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '712.89px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '821.65px', top: '237.16px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.WithholdingTax}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '248.39px' }}
            className="cls_003"
          >
            <span className="cls_003">Payment With-in Due</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '248.39px' }}
            className="cls_003"
          >
            <span className="cls_003">Payment With-in Due</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '248.39px' }}
            className="cls_003"
          >
            <span className="cls_003">Payment With-in Due</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '248.39px' }}
            className="cls_003"
          >
            <span className="cls_003">Payment With-in Due</span>
          </div>
          <div
            style={{ position: 'absolute', left: '90.52px', top: '252.60px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '178.93px', top: '252.60px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Total}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '297.51px', top: '252.60px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '385.92px', top: '252.60px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Total}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '505.20px', top: '252.60px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '593.61px', top: '252.60px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Total}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '712.89px', top: '252.60px' }}
            className="cls_003"
          >
            <span className="cls_003">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '802.01px', top: '252.60px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.Total}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '256.81px' }}
            className="cls_003"
          >
            <span className="cls_003">Date:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '256.81px' }}
            className="cls_003"
          >
            <span className="cls_003">Date:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '256.81px' }}
            className="cls_003"
          >
            <span className="cls_003">Date:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '256.81px' }}
            className="cls_003"
          >
            <span className="cls_003">Date:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '90.52px', top: '268.04px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Words}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '297.51px', top: '268.04px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Words}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '505.20px', top: '268.04px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Words}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '712.89px', top: '268.04px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.Words}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '272.25px' }}
            className="cls_003"
          >
            <span className="cls_003">Rupees:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '272.25px' }}
            className="cls_003"
          >
            <span className="cls_003">Rupees:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '272.25px' }}
            className="cls_003"
          >
            <span className="cls_003">Rupees:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '272.25px' }}
            className="cls_003"
          >
            <span className="cls_003">Rupees:</span>
          </div>

          <div
            style={{ position: 'absolute', left: '15.44px', top: '287.68px' }}
            className="cls_002"
          >
            <span className="cls_002">Late Payment Fine Per</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '287.68px' }}
            className="cls_002"
          >
            <span className="cls_002">Late Payment Fine Per</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '287.68px' }}
            className="cls_002"
          >
            <span className="cls_002">Late Payment Fine Per</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '287.68px' }}
            className="cls_002"
          >
            <span className="cls_002">Late Payment Fine Per</span>
          </div>
          <div
            style={{ position: 'absolute', left: '90.52px', top: '291.89px' }}
            className="cls_002"
          >
            <span className="cls_002">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '191.56px', top: '291.89px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.finePerDay}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '297.51px', top: '291.89px' }}
            className="cls_002"
          >
            <span className="cls_002">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '398.55px', top: '291.89px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.finePerDay}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '505.20px', top: '291.89px' }}
            className="cls_002"
          >
            <span className="cls_002">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '606.24px', top: '291.89px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.finePerDay}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '712.89px', top: '291.89px' }}
            className="cls_002"
          >
            <span className="cls_002">Rs.:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '814.64px', top: '291.89px' }}
            className="cls_002"
          >
            <span className="cls_002">{this.state.finePerDay}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '15.44px', top: '296.10px' }}
            className="cls_002"
          >
            <span className="cls_002">Day:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '222.43px', top: '296.10px' }}
            className="cls_002"
          >
            <span className="cls_002">Day:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '429.42px', top: '296.10px' }}
            className="cls_002"
          >
            <span className="cls_002">Day:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.11px', top: '296.10px' }}
            className="cls_002"
          >
            <span className="cls_002">Day:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '23.86px', top: '319.96px' }}
            className="cls_002"
          >
            <span className="cls_002">Deposited By:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '91.22px', top: '319.96px' }}
            className="cls_002"
          >
            <span className="cls_002">Bank Officer Stamp and Signature:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '230.85px', top: '319.96px' }}
            className="cls_002"
          >
            <span className="cls_002">Deposited By:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '298.21px', top: '319.96px' }}
            className="cls_002"
          >
            <span className="cls_002">Bank Officer Stamp and Signature:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '437.84px', top: '319.96px' }}
            className="cls_002"
          >
            <span className="cls_002">Deposited By:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '505.90px', top: '319.96px' }}
            className="cls_002"
          >
            <span className="cls_002">Bank Officer Stamp and Signature:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '645.53px', top: '319.96px' }}
            className="cls_002"
          >
            <span className="cls_002">Deposited By:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '713.60px', top: '319.96px' }}
            className="cls_002"
          >
            <span className="cls_002">Bank Officer Stamp and Signature:</span>
          </div>
          <div
            style={{ position: 'absolute', left: '16.14px', top: '400.65px' }}
            className="cls_002"
          >
            <span className="cls_002">
              Errors and omission, if any, will be adjusted subsequently
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '223.13px', top: '400.65px' }}
            className="cls_002"
          >
            <span className="cls_002">
              Errors and omission, if any, will be adjusted subsequently
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '430.12px', top: '400.65px' }}
            className="cls_002"
          >
            <span className="cls_002">
              Errors and omission, if any, will be adjusted subsequently
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '637.82px', top: '400.65px' }}
            className="cls_002"
          >
            <span className="cls_002">
              Errors and omission, if any, will be adjusted subsequently
            </span>
          </div>
          <div
            style={{ position: 'absolute', left: '70.87px', top: '412.58px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.CDate}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '277.86px', top: '412.58px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.CDate}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '484.85px', top: '412.58px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.CDate}</span>
          </div>
          <div
            style={{ position: 'absolute', left: '692.55px', top: '412.58px' }}
            className="cls_003"
          >
            <span className="cls_003">{this.state.CDate}</span>
          </div>
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
export default connect(mapStateToProps)(ChallanTemplate);
