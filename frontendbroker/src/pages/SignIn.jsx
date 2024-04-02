import React, { useState } from 'react';
import logo from '../assets/logo.png.webp';
import { Form, Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()


  const loginCheck = async (e) => {
    e.preventDefault();
    const option = {
      email,
      password,
    };
    try {
      const res = await fetch("http://localhost:10000/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(option),
      });
      const resData = await res.json();
      if (resData.token) {
        console.log(resData);
        // localStorage.setItem('response',resData.userDetails);
        Cookies.set('access_token', resData.token)
        navigate("/")
      }

      console.log("token not available");
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className=' Signpage'>
      <div className=' border-b-2 border-slate-400 flex justify-between pl-8 pt-6 pr-12'>
        <Link to='/' >
          <div>
            <img src={logo} className=' text-sm' />
            <span className=' text-xl font-semibold text-white'>THE ESTATE</span>
          </div>
        </Link>
      </div>

      <div className=' pt-5 '>
        <h1 className=' text-center text-4xl text-white font-bold underline-offset-1 underline'>Sign In</h1>
        <div className=' w-full h-full flex align-bottom justify-center mt-7 '>
          <Form className=' shadow-slate-800 shadow-2xl lg:w-2/6 md:w-2/3 flex flex-col gap-6 p-10  bg-white rounded-xl'>
            <label>USERNAME</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className=' bg-slate-200 p-2 rounded-md' placeholder='Email' />
            <label>PASSWORD</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className=' bg-slate-200 p-2 rounded-md' placeholder='Enter password' />
            <button type='submit' onClick={loginCheck} className=' hover:bg-transparent border-slate-700 hover:border-2 hover:text-slate-700 rounded-md ml-24 bg-gray-900 text-white mt-4 w-1/2 h-10' >Submit</button>
            <Link to="/signUp" className=' text-center text-base hover:text-green-700'>Register now</Link>
            or,
            <button className=' bg-red-400 p-3 rounded-md'>Login with Google</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SignIn