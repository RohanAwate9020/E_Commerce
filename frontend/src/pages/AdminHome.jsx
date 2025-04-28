import React from 'react'
import Navbar from '../features/Navbar'
import AdminProductList from '../features/Admin/component/AdminProductList'

function AdminHome() {
  return (
    <div>
        <Navbar/>
      <AdminProductList/>
    </div>
  )
}

export default AdminHome
