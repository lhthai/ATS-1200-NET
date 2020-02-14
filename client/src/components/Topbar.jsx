import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap'

import socket from '../helpers/socket'
import formatDateTime from '../helpers/formatDateTime'

const Topbar = ({ toggleSidebar }) => {
  const [weight, setWeight] = useState(0)
  const [flag, setFlag] = useState('')
  const [currentTime, setCurrentTime] = useState(null)

  socket.on('readWeight', data => {
    setWeight(data.weight)
    setFlag(data.flag)
  })

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(formatDateTime())
    }, 1000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-3 rounded justify-content-end"
      expand="xl"
    >
      <NavbarToggler onClick={toggleSidebar} />
      <Nav className="mr-auto mt-2 ml-3" navbar>
        <NavItem>{currentTime}</NavItem>
        {(flag === 'ST' && (
          <NavItem className="ml-5 text-success">Stable</NavItem>
        )) ||
          (flag === 'OL' && (
            <NavItem className="ml-5 text-danger">Overload</NavItem>
          )) || <div />}
      </Nav>
      <Nav className="mx-auto" navbar>
        <NavItem tag="h2" className="text-danger mt-2">
          {weight} KG
        </NavItem>
      </Nav>
    </Navbar>
  )
}
Topbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
}
export default Topbar
