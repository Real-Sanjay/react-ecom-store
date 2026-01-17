import React from 'react'
import './ProductsPageSidebar.css'
import IconWithLink from './../IconWithLink/IconWithLink';
import Rocket from '../../assets/rocket.png'
const ProductsPageSidebar = () => {
  return (
    <aside className="product_page_category">
            <h2>Categories</h2>
            <IconWithLink title="Electronics" icon={Rocket} link="#"
            sidebar = {true}
            />
        </aside>
  )
}

export default ProductsPageSidebar