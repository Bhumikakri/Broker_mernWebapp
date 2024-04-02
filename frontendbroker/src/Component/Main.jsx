import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Cookies from 'js-cookie';

const Main = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('access_token'); 
    if (token) {
      setAuthenticated(true);
    } else {
      navigate("/signup")
    }
  }, []);

  return (
    <div className='mainpage'>
      {authenticated && (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  )
}

export default Main;
