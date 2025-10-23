import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AppContext } from '../context/AppContext'

const Layout = () => {
  const {bgCol,setBgCol} = useContext(AppContext)
  return (
    <div>
      <div className={` absolute inset-x-0 inset-y-0`}>
        <Navbar/>
        <Outlet />
      </div>
    </div>

  )
}

export default Layout