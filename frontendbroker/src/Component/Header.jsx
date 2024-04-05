import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png.webp';
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
  const { user } = useSelector(state => state.users)
  // console.log(user);

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

  }, []);

  const showOptions = () => {
    setIconClick((prev) => !prev);
  }

  return (
    <div className={`px-9 py-2 w-full flex justify-between items-center header ${isScrolled ? 'scrolled' : ''}`}>
      <div className=' w-fit'>
        <Link to='/'>
          <div>
            <img src={logo} className=' text-sm' />
            <span className=' text-xl font-semibold text-white'>THE ESTATE</span>
          </div>
        </Link>
      </div>
      <div className=' text-base font-semibold hidden lg:flex gap-10 text-white'>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT US</Link>
        <Link to="/listing">LISTINGS</Link>
        <Link to='/contact'>CONTACT</Link>
      </div>
      <div className=' text-base font-semibold  hidden lg:flex items-center gap-11 text-white'>
        <Link to="/Profile">
          <img className=' w-9 rounded-full h-9 object-cover' src={user.userDetails.avatar} />
        </Link>
      </div>
      <div className=' w-fit h-fit mt-6 lg:hidden'>
        <i onClick={showOptions} className=' text-white text-3xl'><FaBars /></i>
      </div>
      {
        iconClick ? <div className=' lg:hidden flex gap-3 flex-col absolute top-24 left-0 bg-white w-full h-fit text-black'>
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/listing">LISTINGS</Link>
          <Link to='/contact'>CONTACT</Link>
          <Link to='/profile'>PROFILE</Link>
        </div> : ''
      }

    </div>
  );
}

export default Header