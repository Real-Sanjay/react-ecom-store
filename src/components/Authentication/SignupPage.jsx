import "./SignupPage.css";
import user from "../../assets/user.webp";
import {registerUser} from "../../services/authService";

import { useForm } from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.

const signUpSchema = z.object({
    name: z.string().min(3, {message: "Name should be at least 3 characters."}),
    email: z.email({message: "Please enter valid email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters."}),
    confirmPassword: z.string().min(8, {message: "Password must be at least 8 characters."}),
    deliveryAddress: z.string()
})


const SignupPage = () => {
    const [loading, setloading] = useState('');
    const [error, seterror] = useState('');
    const [userPic, setUserPic] = useState(null);
    const {register, handleSubmit, formState: {errors}, reset} = useForm({resolver: zodResolver(signUpSchema)})

    const onSubmit = (data) => {
        setloading(true);

        if(data.errors) {
            console.log("Errors:", data.errors);
        }
        const formData =  new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        })

        if(userPic) {
            formData.append('profilePic', userPic);
        }

        registerUser(formData).then((res) => {
            window.location = "/"
        }).catch((error) => {
            seterror(error.response.data.message);
        })
        reset();
        setloading(false);
    }


    return (
        <section className='align-items form_page'>
            <form className='authentication_form signup_form' onSubmit={handleSubmit(onSubmit)}>
                <h2>SignUp Form</h2>

                <div className='image_input_section'>
                    <div className='image_preview'>
                        <img src={userPic ? URL.createObjectURL(userPic) : user} id='file-ip-1-preview' />
                    </div>
                    <label htmlFor='file-ip-1' className='image_label'>
                        Upload Image
                    </label>
                    <input onChange={(e) => setUserPic(e.target.files[0])} type='file' id='file-ip-1' className='image_input' />
                </div>
                {/* Form Inputs */}
                <div className='form_inputs signup_form_input'>
                    <div  className='user_input'>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter your name'
                            {...register("name")}
                        />
                        {errors.name && (<p className='error_message'>{errors.name.message}</p>)}
                    </div>

                    <div className='user_input'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            className='form_text_input'
                            type='email'
                            placeholder='Enter your email address'
                            {...register("email")}
                        />
                        {errors.email && (<p className='error_message'>{errors.email.message}</p>)}

                    </div>

                    <div className='user_input'>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter your password'
                            {...register("password")}
                        />
                        {errors.password && (<p className='error_message'>{errors.password.message}</p>)}

                    </div>

                    <div  className='user_input'>
                        <label htmlFor='cpassword'>Confirm Password</label>
                        <input
                            id='cpassword'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter confirm password'
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (<p className='error_message'>{errors.confirmPassword.message}</p>)}

                    </div>

                    <div className='user_input signup_textares_section'>
                        <label htmlFor='address'>Delivery Address</label>
                        <textarea
                            id='address'
                            className='input_textarea'
                            placeholder='Enter delivery address'
                            {...register("deliveryAddress")}
                        />
                        {errors.deliveryAddress && (<p className='error_message'>{errors.deliveryAddress.message}</p>)}

                    </div>
                </div>

                <button className='search_button form_submit' type='submit' disabled={loading}>
                    Submit
                </button>

            </form>
                {error && <p style={{color: "red"}}>Error registering user : {error}</p>}
        </section>
    );
};

export default SignupPage;

