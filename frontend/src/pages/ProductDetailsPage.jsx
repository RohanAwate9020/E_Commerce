import React from 'react'
import Navbar from '../features/Navbar'

import ProductDetail from '../features/product/component/ProductDetail'
import Footer from '../features/common/Footer'

function ProductDetailPage() {
  return (
    <div>
        <Navbar/>
      <ProductDetail/>
    <Footer/>
    </div>
  )
}

export default ProductDetailPage
