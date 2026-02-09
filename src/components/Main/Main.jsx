import React from 'react'
import Home from '../Home/Home'
import ProductsPage from '../ProductsPage/ProductsPage'
import SingleProduct from '../SingleProduct/SingleProduct'
import CartPage from '../CartPage/CartPage'
import MyOrderPage from '../MyOrderPage/MyOrderPage'
import Authentication from './../Authentication/Authentication';
import SignupPage from './../Authentication/SignupPage';
import Router from '../Router/Router'

const Main = () => {
  return (
<main className='main'>
    <Router/>
</main> 
 )
}

export default Main