import React from 'react'
import Navbar from '../features/Navbar'

import UserOrders from '../features/user/components/UserOrders'

export default function UserOrdersPage() {
  return (
    <div>
        <Navbar/>
      <UserOrders/>
    </div>
  )
}

