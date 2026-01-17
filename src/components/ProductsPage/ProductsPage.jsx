import React from 'react'
import ProductsPageSidebar from './ProductsPageSidebar'
import './ProductsPage.css'
import ProductsPageList from './ProductsPageList'

const ProductsPage = () => {
  return (
    <div className="product_page">
        <ProductsPageSidebar/>
        <ProductsPageList/>
    </div>
  )
}

export default ProductsPage