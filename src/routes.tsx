import React from 'react';
import { FaBook, FaChalkboardTeacher } from 'react-icons/fa';
import { GrSchedulePlay } from 'react-icons/gr';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from 'react-icons/md';

const routes = [
  // {
  //   name: 'Main Dashboard',
  //   layout: '/admin',
  //   sideBarVisible: true,
  //   path: 'default',
  // },
  {
    name: 'Schedule',
    layout: '/admin',
    path: 'schedule',
    sideBarVisible: true,
    icon: <GrSchedulePlay className="h-6 w-6" />,
  },

  {
    name: 'Lecturers',
    layout: '/admin',
    path: 'lecturers',
    icon: <FaChalkboardTeacher className="h-6 w-6" />,
    sideBarVisible: true,
  },

  {
    name: 'Courses',
    layout: '/admin',
    path: 'courses',
    icon: <FaBook className="h-6 w-6" />,
    sideBarVisible: true,
  },

  {
    name: 'Batches',
    layout: '/admin',
    path: 'batches',
    icon: <FaBook className="h-6 w-6" />,
    sideBarVisible: false,
  },
  // {
  //   name: 'Batches',
  //   layout: '/admin',
  //   path: 'batches',
  //   icon: <MdHome className="h-6 w-6" />,
  //   secondary: false,
  // },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: 'nft-marketplace',
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,

  //   secondary: true,
  // },
  // {
  //   name: 'Data Tables',
  //   layout: '/admin',
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: 'data-tables',
  // },
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: 'profile',
  //   icon: <MdPerson className="h-6 w-6" />,
  // },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: 'sign-in',
  //   icon: <MdLock className="h-6 w-6" />,
  // },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: 'rtl-default',
  //   icon: <MdHome className="h-6 w-6" />,
  // },
  ,
];
export default routes;
