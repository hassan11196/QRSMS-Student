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

var routes = [
  {
    path: '/home',
    name: 'Home',
    icon: 'ni ni-circle-08 text-pink',
    component: DashboardHome,
    layout: '/dashboard',
  },
  {
    path: '/student-registration',
    name: 'Course Registration',
    icon: 'ni ni-single-02 text-yellow',
    component: Registration,
    layout: '/admin',
  },
  {
    path: '/student-attendance',
    name: 'Attendance',
    icon: 'ni ni-single-02 text-yellow',
    component: Attendance,
    layout: '/admin',
  },
  // {
  //   path: '/index',
  //   name: 'Dashboard',
  //   icon: 'ni ni-tv-2 text-primary',
  //   component: Index,
  //   layout: '/admin',
  // },
  {
    path: '/icons',
    name: 'Icons',
    icon: 'ni ni-planet text-blue',
    component: Icons,
    layout: '/admin',
  },
  {
    path: '/fee-challan',
    name: 'Fee Challan',
    icon: 'ni ni-tv-2 text-primary',
    component: FeeChallan,
    layout: '/admin',
  },
  {
    path: '/fee-details',
    name: 'Fee Details',
    icon: 'ni ni-tv-2 text-primary',
    component: FeeDetails,
    layout: '/admin',
  },
  // {
  //   path: '/template',
  //   name: 'Template',
  //   icon: 'ni ni-pin-3 text-orange',
  //   component: ChallanTemplate,
  //   layout: '/admin',
  // },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   icon: 'ni ni-pin-3 text-orange',
  //   component: Maps,
  //   layout: '/admin',
  // },

  // {
  //   path: '/user-profile',
  //   name: 'User Profile',
  //   icon: 'ni ni-single-02 text-yellow',
  //   component: Profile,
  //   layout: '/admin',
  // },
  // {
  //   path: '/tables',
  //   name: 'Tables',
  //   icon: 'ni ni-bullet-list-67 text-red',
  //   component: Tables,
  //   layout: '/admin',
  // },
  // {
  //   path: '/tables',
  //   name: 'Registration',
  //   icon: 'ni ni-bullet-list-67 text-red',
  //   component: Tables,
  //   layout: '/admin',
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
    icon: 'ni ni-circle-08 text-pink',
    component: CustomLogin,
    layout: '/auth',
  },
];
export default routes;
