import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import Cookies from 'js-cookie';
import Propertyitem from '../Component/Propertyitem';


const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  const searchHandle = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search])

  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        const token = Cookies.get('access_token')
        const res = await fetch('http://localhost:10000/api/v1/property/get?type=rent&limit=3', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "authorization": token,
          },
        });
        const data = await res.json();
        setRentListings(data.result);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const token = Cookies.get('access_token')
        const res = await fetch('http://localhost:10000/api/v1/property/get?type=sale&limit=3', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "authorization": token,
          },
        });
        const data = await res.json();
        setSaleListings(data.result);
      } catch (error) {
        log(error);
      }
    };
    fetchRentListings();
  }, [])

  return (
    <div className=' Homepage max-w-full h-fit min-h-screen flex flex-col gap-9 items-center justify-center'>
      <div className=' w-11/12 flex flex-col items-center py-36'>
        <h1 className=' break-words font-semibold text-4xl text-center text-white lg:text-6xl'>Easiest way to find your dream home</h1>
        <div className=' lg:flex-row flex-col items-center md:flex-row w-8/12 mt-7 flex gap-5 p-10'>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className=' lg:w-11/12 w-full h-12 rounded-3xl pl-4 text-xl' type='search' placeholder='search your home ' />
          <button type="submit" onClick={searchHandle} className=' hover:border-2 hover:bg-transparent hover:text-slate-700 hover:border-slate-700 h-12 w-40 bg-slate-700 rounded-3xl text-white text-2xl' >Search</button>
        </div>
      </div>
      
      <div className=' w-full lg:w-5/6  rounded-3xl'>
        <h1 className=' mb-10 text-3xl font-semibold text-white '>Popular Properties</h1>
        <Swiper modules={[Navigation]} navigation spaceBetween={10}
          slidesPerView={1}
          >
          {saleListings.length > 0 &&
            saleListings.map((items) => (
              <SwiperSlide>
                <div
                  style={{ 
                    background: `url(${items.imageUrls[0]}) center no-repeat `,backgroundSize: 'cover',backgroundPosition: 'center'
                  }}
                  className='h-[400px] rounded-3xl relative'
                  key={items._id}
                >
                  <h1 className=' text-3xl font-semibold text-slate-800 absolute bottom-5 left-3 '>All the papers you need to own a house</h1>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className=' flex flex-col gap-12 lg:w-5/6 my-7 p-4  w-full'>
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl mb-3 font-semibold text-white'>Recent places for rent</h2>
              <Link className='text-md bg-white rounded-md p-1  text-blue-900 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <Propertyitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl mb-3 font-semibold text-white'>Recent places for sale</h2>
              <Link className='text-md bg-white rounded-md p-1  text-blue-900 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex gap-6'>
              {saleListings.map((listing) => (
                <Propertyitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home



{/* <div className=' w-full h-fit bg-slate-300 min-h-5'>
        <div>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
        </div>
        <div>

        </div>
      </div> */}