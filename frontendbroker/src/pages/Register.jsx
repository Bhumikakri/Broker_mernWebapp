import React, { useState } from 'react';
import logo from '../assets/logo.png.webp'
import { Form, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("seller");
    const [image, setImage] = useState("null");

    const handleRegister = async (e) => {
        e.preventDefault();
        const option = {
            username,
            email,
            password,
            role,
            image,
        };

        try {
            const res = await fetch("http://localhost:10000/api/v1/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(option),
            });

            const resData = await res.json();

            if (resData.success) {
                console.log(resData);

                return toast.success("user created successfully!", {
                    position: "top-right",
                    className: 'foo-bar'
                });

            }
            console.log(resData);
            toast.error(" something went wrong!");
        } catch (error) {
            toast.error(" something went wrong!");
            console.log(error.message)
            console.error(error);
        }

    }

    return (
        <div className='Signpage p-4 '>
            <div>
                <Link to='/'>
                    <div>
                        <img src={logo} className=' text-sm' />
                        <span className=' text-xl font-semibold text-white'>THE ESTATE</span>
                    </div>
                </Link>
            </div>

            <div>
                <h1 className=' text-center text-4xl text-white font-bold underline-offset-1 underline'>Sign Up</h1>
                <div className=' w-full h-full flex align-bottom justify-center mt-4 '>
                    <Form className=' shadow-slate-800 shadow-2xl lg:w-2/6 md:w-2/3 flex flex-col gap-5 p-10  bg-white rounded-xl'>
                        <input type='text' className=' bg-slate-200 p-2 rounded-md' placeholder='User Name' value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        <input type='email' className=' bg-slate-200 p-2 rounded-md' placeholder='Email' value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' className=' bg-slate-200 p-2 rounded-md' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type='password' className=' bg-slate-200 p-2 rounded-md' placeholder='Confirm password' />
                        <select className=' w-2/3 bg-slate-200 p-2 rounded-md ' value={role}
                            onChange={(e) => setRole(e.target.value)}>
                            <option value="seller">Seller</option>
                            <option value="buyer">Buyer</option>
                        </select>
                        <input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} />

                        <button type='submit' onClick={handleRegister} className='  hover:bg-transparent border-slate-700 hover:border-2 hover:text-slate-700 bg-gray-900 text-white mt-4 w-1/2 h-10 rounded-md' >Submit</button>

                        <p>already have an account  ?<Link className=' text-lg text-teal-900 hover:text-green-400' to="/SignIn">  Sign In</Link></p>
                    </Form>
                </div>
                <ToastContainer theme="dark" />
            </div>

        </div>
    )
}

export default Register