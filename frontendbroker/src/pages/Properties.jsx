import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Properties = () => {
  const [property, setProperty] = useState({
    title: '',
    discription: '',
    Price: 50,
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    type: 'rent',


  });

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setProperty({
        ...property,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking'
    ) {
      setProperty({
        ...property,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setProperty({
        ...property,
        [e.target.id]: e.target.value,
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('access_token')
      const res = await fetch('http://localhost:10000/api/v1/property/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authorization": token,
        },
        body: JSON.stringify({
          ...property,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === false) {
        toast.error(" not created");
         console.log("not created");
         return;
      }
      toast.success("Created property successfully!", {
        position: "top-right",
        className: 'foo-bar'
      });
      console.log("created list");
    } catch (error) {

    }
  }



  return (
    <div className=' bg-slate-400 w-full min-h-screen p-2'>
      <h1 className=' text-slate-800 underline text-3xl font-semibold text-center'>Create list of property</h1>
      <form className='w-full flex gap-4 flex-col lg:flex-row h-fit mt-1 p-2 '>
        <div className=' flex flex-col w-full lg:w-1/2 gap-2  items-center p-2'>
          <input type='text' id='title' required onChange={handleChange} value={property.title} className=' bg-slate-100 p-2 rounded-md w-10/12' placeholder='title' />
          <textarea name="discription" required onChange={handleChange} value={property.discription} className=' bg-slate-100 p-2 rounded-md w-10/12' placeholder='discription' id="discription" cols="20" rows="4"></textarea>
          <input type='text' id='location' required onChange={handleChange} value={property.location} className=' bg-slate-100 p-2 rounded-md w-10/12' placeholder=' location' />
          <div className='flex mt-4 gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={property.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={property.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={property.parking}
              />
              <span>Parking spot</span>
            </div>
          </div>
          <div className='flex mt-4 w-4/5 flex-wrap gap-10'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-1 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={property.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-1 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={property.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='Price'
                min='50'
                max='10000000'
                required
                className='p-1 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={property.Price}
              />
              <div className='flex flex-col items-center'>
                <p>price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className=' flex flex-col w-full lg:w-1/2 gap-2  items-center p-2'>
          <p className='font-bold'>
            Images:
            <span className='font-normal text-gray-900 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex items-center gap-4'>
            <input
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              // disabled={uploading}
              // onClick={handleImageSubmit}
              className='p-1 h-2/3 text-green-700 border border-green-700 rounded uppercase hover:bg-green-700 hover:text-white hover:shadow-lg '
            >
              upload
            </button>
          </div>
          {/* {property.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='properties image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  // onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))} */}
          <button type='submit' onClick={handleSubmit}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 '
          >
            Create Properties
          </button>
        </div>
      </form >
      <ToastContainer theme="dark" />
    </div >
  )
}

export default Properties