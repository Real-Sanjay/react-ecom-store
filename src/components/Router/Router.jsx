import React from 'react'

import { Route, Routes } from 'react-router-dom'
import ProductsPage from '../ProductsPage/ProductsPage'
import SingleProduct from '../SingleProduct/SingleProduct'
import CartPage from '../CartPage/CartPage'
import MyOrderPage from '../MyOrderPage/MyOrderPage'
import Authentication from '../Authentication/Authentication'
import Home from '../Home/Home'
import SignupPage from '../Authentication/SignupPage'

const Router = () => {
  return (
        <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/products' element = {<ProductsPage/>}/>
            <Route path='/products/:id' element = {<SingleProduct/>}/>
            <Route path='/cartpage' element = {<CartPage/>}/>
            <Route path='/myorder' element = {<MyOrderPage/>}/>
            <Route path='/auth' element = {<Authentication/>}/>
            <Route path='/signup' element = {<SignupPage/>}/>
        </Routes>
  )
}

export default Router