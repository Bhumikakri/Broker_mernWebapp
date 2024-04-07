import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

const Propertyitem = ({ listing }) => {
    return (
        <div className='  w-7/12 md:w-6/12 h-fit lg:w-4/12 border-2  bg-white overflow-hidden rounded-md shadow-lg hover:shadow-black '>
            <Link to={`/listing ${listing._id}`} >
                <img src={listing.imageUrls[0]} alt='listing cover' className='w-full h-64 object-cover hover:scale-105 transition-scale duration-300' />

                <div className=' p-2'>
                    <p className='truncate text-lg font-bold text-slate-700'>{listing.title}</p>
                    <div className='flex items-center gap-1'>
                        <MdLocationOn className='h-4 w-4 text-lime-600' />
                        <p className='text-sm text-gray-600 truncate w-full'>
                            {listing.location}
                        </p>
                    </div>
                    <p className=' truncate w-full text-sm text-gray-900 line-clamp-2'>
                        {listing.discription}
                    </p>
                    <p className=' text-xl underline mb-4 mt-2 font-semibold  '>
                        Rs.
                        {
                            listing.Price.toLocaleString('en-US')
                        }
                        {listing.type === 'rent' && ' / month'}
                    </p>
                    <div className='text-slate-700 flex gap-4'>
                        <div className='font-bold text-xs'>
                            {listing.bedrooms > 1
                            ? `${listing.bedrooms} beds `
                            : `${listing.bedrooms} bed `}
                        </div>
                        <div className='font-bold text-xs'>
                            {listing.bathrooms > 1
                            ? `${listing.bathrooms} baths `
                            : `${listing.bathrooms} bath `}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Propertyitem