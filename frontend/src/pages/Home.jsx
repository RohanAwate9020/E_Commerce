import React from 'react'
import Navbar from '../features/Navbar'
import ProductList from '../features/product/component/ProductList'
import Footer from '../features/common/Footer'

function Home() {
  return (
    <div>
        <Navbar/>
      <ProductList/>
      <Footer/>
    </div>
  )
}

export default Home
