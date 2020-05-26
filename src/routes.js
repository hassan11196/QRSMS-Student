/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from 'views/Index.jsx';
import FeeDetails from './Dashboard/Fee/FeeDetais.jsx';
import Registration from './Dashboard/home/registration';
import Profile from 'views/examples/Profile.jsx';
import Maps from 'views/examples/Maps.jsx';
import Register from 'views/examples/Register.jsx';
import Login from 'views/examples/Login.jsx';
import Tables from 'views/examples/Tables.jsx';
import Icons from 'views/examples/Icons.jsx';
import DashboardHome from './Dashboard/home/index';
import Attendance from './Dashboard/Attendance/attendance';
import ChallanTemplate from './Dashboard/Fee/FeeTemplate';
import CustomLogin from './login';
import FeeChallan from './Dashboard/Fee/FeeChallan';
import Transcript from './Dashboard/Transcript/Transcript.jsx';

var routes = [
  {
    path: '/home',
    name: 'Home',
    icon: 'fas fa-home text-white',
    component: DashboardHome,
    layout: '/dashboard',
  },
  {
    path: '/student-registration',
    name: 'Course Registration',
    icon: 'far fa-registered text-white',
    component: Registration,
    layout: '/portal',
  },
  {
    path: '/student-attendance',
    name: 'Attendance',
    icon: 'ni ni-single-02 text-white',
    component: Attendance,
    layout: '/portal',
  },
  // {
  //   path: '/index',
  //   name: 'Dashboard',
  //   icon: 'ni ni-tv-2 text-primary',
  //   component: Index,
  //   layout: '/portal',
  // },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   icon: 'ni ni-planet text-blue',
  //   component: Icons,
  //   layout: '/portal',
  // },
  {
    path: '/transcript',
    name: 'Transcript',
    icon: 'far fa-registered text-white',
    component: Transcript,
    layout: '/portal',
  },
  {
    path: '/fee-challan',
    name: 'Fee Challan',
    icon: 'fas fa-coins text-white',
    component: FeeChallan,
    layout: '/portal',
  },
  {
    path: '/fee-details',
    name: 'Fee Details',
    icon: 'fas fa-hand-holding-usd text-white',
    component: FeeDetails,
    layout: '/portal',
  },
  // {
  //   path: '/template',
  //   name: 'Template',
  //   icon: 'ni ni-pin-3 text-orange',
  //   component: ChallanTemplate,
  //   layout: '/portal',
  // },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   icon: 'ni ni-pin-3 text-orange',
  //   component: Maps,
  //   layout: '/portal',
  // },

  // {
  //   path: '/user-profile',
  //   name: 'User Profile',
  //   icon: 'ni ni-single-02 text-yellow',
  //   component: Profile,
  //   layout: '/portal',
  // },
  // {
  //   path: '/tables',
  //   name: 'Tables',
  //   icon: 'ni ni-bullet-list-67 text-red',
  //   component: Tables,
  //   layout: '/portal',
  // },
  // {
  //   path: '/tables',
  //   name: 'Registration',
  //   icon: 'ni ni-bullet-list-67 text-red',
  //   component: Tables,
  //   layout: '/portal',
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   icon: 'ni ni-key-25 text-info',
  //   component: Login,
  //   layout: '/auth',
  // },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   icon: 'ni ni-circle-08 text-pink',
  //   component: Register,
  //   layout: '/auth',
  // },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-circle-08 text-white',
    component: CustomLogin,
    layout: '/auth',
  },
  {
    path: '/feechallan',
    name: 'Challan',
    icon: 'ni ni-circle-08 text-white',
    component: ChallanTemplate,
    layout: '/portal',
  },
];
export default routes;
