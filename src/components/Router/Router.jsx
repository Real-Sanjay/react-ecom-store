import React from 'react'

import { Route, Routes } from 'react-router-dom'
import ProductsPage from '../ProductsPage/ProductsPage'
import SingleProduct from '../SingleProduct/SingleProduct'
import CartPage from '../CartPage/CartPage'
import MyOrderPage from '../MyOrderPage/MyOrderPage'
import LoginPage from '../Authentication/LoginPage'
import Home from '../Home/Home'
import SignupPage from '../Authentication/SignupPage'
import Logout from '../Authentication/Logout'
import ProtectedRoute from './ProtectedRoute';

const Router = ({addToCart, cart}) => {
  return (
        <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/products' element = {<ProductsPage/>}/>
            <Route path='/products/:id' element = {<SingleProduct/>}/>
            <Route element={<ProtectedRoute/>}>
             <Route path='/cartpage' element = {<CartPage/>}/>
            <Route path='/myorder' element = {<MyOrderPage/>}/>
            <Route path='/logout' element = {<Logout/>}/>
            </Route>
            <Route path='/login' element = {<LoginPage/>}/>
            <Route path='/signup' element = {<SignupPage/>}/>
        </Routes>
  )
}

export default Router