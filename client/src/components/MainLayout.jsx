import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }
  return (
    <div className={`${openSidebar ? 'toggled' : ''} d-flex`} id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper" className="pl-2">
        <Topbar toggleSidebar={toggleSidebar} />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
