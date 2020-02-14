import React from 'react';
import { Link } from 'react-router-dom';

import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faTh,
  faCalendarAlt,
  faList,
  faCloud,
  faFolderPlus,
  faTools,
  faTruck,
  faCog,
  faDatabase,
  faListAlt,
  faUndo,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import SubMenu from './SubMenu';

import './style.css';

const masterItems = [
  {
    name: 'Brand Master',
    link: '/brand-master',
    icon: faDatabase,
  },
  {
    name: 'Vendor Master',
    link: '/vendor-master',
    icon: faDatabase,
  },
  {
    name: 'Destination Master',
    link: '/destination-master',
    icon: faDatabase,
  },
  {
    name: 'Other Master',
    link: '/other-master',
    icon: faDatabase,
  },
  {
    name: 'Truck Master',
    link: '/truck-master',
    icon: faDatabase,
  },
];

const settingItems = [
  {
    name: 'Operation Settings',
    link: '/operation-setting',
    icon: faCog,
  },
  {
    name: 'Maintenance Data Upload',
    link: '/maintenance-data-upload',
    icon: faUpload,
  },
  {
    name: 'Item Operation Settings',
    link: '/item-operation-setting',
    icon: faListAlt,
  },
  {
    name: 'Backup Data',
    link: '/backup',
    icon: faCloud,
  },
  {
    name: 'Restore Data',
    link: '/restore',
    icon: faUndo,
  },
];

const Sidebar = () => {
  return (
    <div
      className="bg-light vertical"
      id="sidebar-wrapper"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="p-4 d-flex justify-content-center">
        <h4 className="text-center">ATS-1200-NET</h4>
      </div>
      <hr className="m-0" />
      <Nav vertical style={{ flex: 1 }}>
        <NavItem>
          <NavLink
            className="p-3"
            tag={Link}
            to={{
              pathname: '/',
              weighingProp: { weighing: '' },
            }}
            // onClick={closeSidebar}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
            Weighing
          </NavLink>
        </NavItem>
        <p className="text-secondary font-weight-bold text-uppercase mb-0 p-4">
          Menu
        </p>
        <NavItem>
          <NavLink
            className="p-3"
            tag={Link}
            to="/staying-truck-list"
            // onClick={closeSidebar}
          >
            <FontAwesomeIcon icon={faTruck} /> Staying Truck List
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className=" p-3"
            tag={Link}
            to="/measurement-data-list"
            // onClick={closeSidebar}
          >
            <FontAwesomeIcon icon={faList} className="mr-2" />
            Measurement Data List
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className=" p-3"
            tag={Link}
            to="/summary-report"
            // onClick={closeSidebar}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            Summary Report
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="p-3"
            tag={Link}
            to="/manual-weighing"
            // onClick={closeSidebar}
          >
            <FontAwesomeIcon icon={faFolderPlus} className="mr-2" />
            Manual Weighing
          </NavLink>
        </NavItem>
        <NavItem>
          <SubMenu
            items={masterItems}
            name="Master Menu"
            icon={faTh}
            // closeSidebar={closeSidebar}
          />
        </NavItem>
        <NavItem>
          <SubMenu
            items={settingItems}
            name="Setting Menu"
            icon={faTools}
            // closeSidebar={closeSidebar}
          />
        </NavItem>
      </Nav>
      <hr className="m-0" />
      <div className="ml-3 bg-light">
        <p className="text-dark font-weight-bold my-2">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
