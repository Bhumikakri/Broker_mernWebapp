import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png.webp';
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState();
  const [iconClick, setIconClick] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [])

  const showOptions = () => {
    setIconClick((prev) => !prev);
  }

  const onClickfuntion = async () => {
    try {
      const res = await fetch("http://localhost:10000/api/v1/user/signout", {
        method: "GET",
      });
      const resData = await res.json();
      Cookies.remove('access_token');
      navigate("/signin")

      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className={`px-9 py-2 w-full flex justify-between header ${isScrolled ? 'scrolled' : ''}`}>
      <div className=' w-fit'>
        <Link to='/'>
          <div>
            <img src={logo} className=' text-sm' />
            <span className=' text-xl font-semibold text-white'>THE ESTATE</span>
          </div>
        </Link>
      </div>
      <div className=' text-base font-semibold mt-6 hidden lg:flex gap-10 text-white'>
        <Link to="/">Home</Link>
        <Link to="/about">ABOUT US</Link>
        <Link to="/listing">LISTINGS</Link>
        <Link to='/contact'>CONTACT</Link>
      </div>
      <div className=' text-base font-semibold mt-6 hidden lg:flex gap-11 text-white'>
        <Link to="/Profile">
          <img src='' />
        </Link>

        <button onClick={onClickfuntion}>singOut</button>
      </div>
      <div className=' w-fit h-fit mt-6 lg:hidden'>
        <i onClick={showOptions} className=' text-white text-3xl'><FaBars /></i>
      </div>
      {
        iconClick ? <div className=' lg:hidden flex gap-3 flex-col absolute top-24 left-0 bg-white w-full h-fit text-black'>
          <Link to="/">Home</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/listing">LISTINGS</Link>
          <Link to='/contact'>CONTACT</Link>
        </div> : ''
      }

    </div>
  )
}

export default Header