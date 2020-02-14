import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function SubMenu({ items, name, icon }) {
  const [openSubMenu, setOpenSubMenu] = useState(false)

  const toggleSubmenu = () => {
    setOpenSubMenu(!openSubMenu)
  }

  return (
    <div>
      <NavLink tag={Link} to="#" className="p-3" onClick={toggleSubmenu}>
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {name}
        {openSubMenu ? (
          <FontAwesomeIcon icon={faChevronDown} className="ml-5" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="ml-5" />
        )}
      </NavLink>
      <Nav vertical style={{ display: openSubMenu ? '' : 'none' }}>
        {items.map(item => (
          <NavItem key={item.name}>
            <NavLink
              className="pl-4"
              tag={Link}
              to={item.link}
              // onClick={closeSidebar}
            >
              {' '}
              <FontAwesomeIcon icon={item.icon} className="mr-2" />
              {item.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </div>
  )
}

SubMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: '',
      link: '',
      icon: '',
    }),
  ).isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object.isRequired,
  // closeSidebar: PropTypes.func.isRequired,
}

export default SubMenu
