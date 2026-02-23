import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import './LoginPage.css'
import { authenticateUser } from '../../services/authService'
import { useLocation, useNavigate } from 'react-router-dom'
import { getItem} from '../../util/StorageUtil'
// Define schema for validation
const loginErrorSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"), 
})

const Authentication = () => {
     if(getItem("token")) {
       return window.location = "/"; 
    }
    const [error, seterror] = useState('');
    const {register, handleSubmit, formState: {errors} } = useForm({resolver: zodResolver(loginErrorSchema)});
    const location = useLocation();
    const onSubmit = (data) => {
        authenticateUser(data).then((res) => {
            const {state} = location;
            window.location = state ? state.from : "/";
        }).catch((error) => {
            console.log("login error", error);
            seterror(error.response.data.message);
        })
    }

   
  return (
    <section className="align-items login_form">
        <form className="login_form_group" onSubmit={handleSubmit(onSubmit)}>
            <h2>Login Form</h2>
            <div className="form_inputs">
                <div className="form_input">
                    <label htmlFor="email" className="form_label">Email</label>
                    <input placeholder='Enter your email' id="email" type="text" className="form_label_input" {...register("email")}/>
                    {errors.email && (<p className='error_message'>{errors.email.message}</p>)} 
                </div>
                <div className="form_input">
                    <label htmlFor="password" className="form_label">Password</label>
                    <input placeholder='Enter your password' id="password" type="password" className="form_name_input" {...register("password")}/>
                    {errors.password && (<em className='error_message'>{errors.password.message}</em>)}
                </div>
                <button className="form_submit_btn">Submit</button>
            </div>
        {error && <p style={{color: 'red', fontfamily: 'italic'}}>error login: {error}</p>}
        </form>
    </section>
  )
}

export default Authentication