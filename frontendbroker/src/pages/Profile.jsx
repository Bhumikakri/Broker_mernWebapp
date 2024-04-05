import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { updateuserSuccess, deleteuserSuccess } from '../Redux/user/userSlice';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.users)
  // console.log(user);
  const [username, setUsername] = useState(user.userDetails.username);
  const [email, setEmail] = useState(user.userDetails.email);
  const [password, setPassword] = useState("");
  const [showedite, setShowedit] = useState(false);

  const dispatch = useDispatch();


  const onClickfuntion = async () => {
    try {
      const res = await fetch("http://localhost:10000/api/v1/user/signout", {
        method: "GET",
      });
      const resData = await res.json();
      Cookies.remove('access_token');

      navigate("/signin");
      localStorage.clear();
      window.location.reload();

      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault();
    const option = {
      username,
      email,
      password,
    };
    const token = Cookies.get('access_token');
    // console.log(token);
    try {
      const res = await fetch("http://localhost:10000/api/v1/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": token,
        },
        body: JSON.stringify(option),
      });
      const resData = await res.json();

      if (resData.success) {
        console.log(resData);
        dispatch(updateuserSuccess(resData));
        toast.success("profile updated successfully!", {
          position: "bottom-right",
          className: 'foo-bar'
        });
        return;

      }
      toast.error("something went wrong!");
    } catch (error) {
      console.log(error);
    }
  }

  const deleteAcount = async () => {

    try {
      const token = Cookies.get('access_token');

      const res = await fetch("http://localhost:10000/api/v1/user/delete", {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "authorization": token,
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteuserSuccess(null));
      toast.success("Account deleted successfully!", {
        position: "bottom-right",
        className: 'foo-bar'
      });
      window.location.reload();
      navigate("/signup")
      Cookies.remove('access_token');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full min-h-lvh bg-slate-300'>
      <p className=' text-center p-4 text-5xl font-semibold underline text-slate-950'>Profile</p>
      <div className='w-full flex flex-col lg:flex-row h-full'>
        <div className=' gap-2 flex flex-col items-center justify-center p-3  lg:w-1/2 lg:h-fit'>
          <p className=' text-center p-4 text-xl font-semibold underline text-slate-950'>Personal Details</p>
          <img className=' w-24 rounded-full h-24 object-cover' src={user.userDetails.avatar} />
          <h1 className='mt-4 bg-slate-400 px-4 py-1 rounded-md text-3xl font-bold text-slate-800'>NAME :- {username}</h1>
          <h1 className=' mt-4 bg-slate-400 px-4 py-1 rounded-md  text-1xl font-bold text-slate-800'>EMAIL:- {email}</h1>
          <h1 className=' mt-4 bg-slate-400 px-4 py-1 rounded-md  text-1xl font-bold text-slate-800'>USER_ID:- {user.userDetails._id}</h1>
          <div className='mt-4 flex flex-col-reverse gap-5 lg:flex-row items-center justify-between w-full'>
            <span className=' cursor-pointer bg-red-500 p-2 rounded-md text-lg font-bold text-white' onClick={deleteAcount}>Delete Account</span>
            <span className=' cursor-pointer bg-red-500 p-2 rounded-md text-lg font-bold text-white' onClick={onClickfuntion}>logout</span>
          </div>


        </div>
        <div className=' gap-2 flex flex-col items-center justify-center p-3  lg:w-1/2 lg:h-fit'>
          <p onClick={() => setShowedit(pre => !pre)} className='hover:cursor-pointer text-center p-4 text-xl font-semibold underline text-slate-950'>Edit profile</p>
          {showedite === true ? <div className=' w-11/12 backdrop-blur-0'>
            <Form className=' flex flex-col gap-4 mt-20'>
              <input className=' bg-slate-200 p-2 rounded-md' value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='username' />
              <input className=' bg-slate-200 p-2 rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='email' />
              <input className=' bg-slate-200 p-2 rounded-md' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' />
              <button onClick={updateProfile} className=' bg-slate-800 text-2xl text-white p-2 rounded-md' type='submit'>UPDATE</button>
            </Form>
          </div> : ''
          }

        </div>
      </div>
      <ToastContainer theme="light" />
    </div>
  )
}

export default Profile