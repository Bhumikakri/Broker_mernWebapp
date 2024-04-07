import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import Propertyitem from '../Component/Propertyitem';

const Searching = () => {
    const navigate = useNavigate();

    const [searchdata, setsearchdata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        sort: 'created_at',
        order: 'desc',
    });

    const [properties, setProperties] = useState([]);

    console.log(properties);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const urlSearchTerm = urlParams.get('searchTerm');
        const urlType = urlParams.get('type');
        const urlParking = urlParams.get('parking');
        const urlSort = urlParams.get('sort');
        const urlOrder = urlParams.get('order');

        if (
            urlSearchTerm ||
            urlType ||
            urlParking ||
            urlSort ||
            urlOrder
        ) {
            setsearchdata({
                searchTerm: urlSearchTerm || '',
                type: urlType || 'all',
                parking: urlParking === 'true' ? true : false,
                sort: urlSort || 'created_at',
                order: urlOrder || 'desc',
            });
        }

        const fetchpropertyData = async () => {
            const searchQuery = urlParams.toString();
            const token = Cookies.get('access_token')
            const res = await fetch(`http://localhost:10000/api/v1/property/get?${searchQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": token,
                },
            });
            const data = await res.json();
            setProperties(data.result);
        };

        fetchpropertyData();

    }, [location.search])

    console.log(searchdata);
    const handleChange = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'rent' ||
            e.target.id === 'sale'
        ) {
            setsearchdata({ ...searchdata, type: e.target.id });
        }

        if (e.target.id === 'searchTerm') {
            setsearchdata({ ...searchdata, searchTerm: e.target.value });
        }

        if (
            e.target.id === 'parking'
        ) {
            setsearchdata({
                ...searchdata,
                [e.target.id]:
                    e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setsearchdata({ ...searchdata, sort, order });
        }
    };

    const submitSearchdata = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', searchdata.searchTerm);
        urlParams.set('type', searchdata.type);
        urlParams.set('parking', searchdata.parking);
        urlParams.set('sort', searchdata.sort);
        urlParams.set('order', searchdata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    return (
        <div className='searchPage w-full min-h-screen flex flex-col gap-3 lg:flex-row'>
            <div className=' h-fit lg:min-h-svh bg-slate-100 w-full lg:w-3/12 border-2 border-neutral-50 p-2'>
                <Form className=' flex flex-col gap-4'>
                    <div className=' flex gap-2 items-center'>
                        <lable>Search Term :</lable>
                        <input type='search' id='searchTerm' onChange={handleChange} value={searchdata.searchTerm} placeholder=' Search...' className=' w-4/6 p-2 rounded-md bg-slate-200' />
                    </div>
                    <div className=' flex gap-2 flex-wrap items-center'>
                        <lable>Type :</lable>
                        <div className=' gap-2 flex items-center'>
                            <input type="checkbox" id='all' onChange={handleChange} checked={searchdata.type === 'all'} />
                            <span>Rent&Sell</span>
                        </div>
                        <div className=' gap-2 flex items-center'>
                            <input type="checkbox" id='rent' onChange={handleChange} checked={searchdata.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className=' gap-2 flex items-center'>
                            <input type="checkbox" id='sale' onChange={handleChange} checked={searchdata.type === 'sale'} />
                            <span>Sell</span>
                        </div>
                    </div>
                    <div className=' flex gap-2 items-center'>
                        <lable>Amenities :</lable>
                        <div className=' gap-2 flex items-center'>
                            <input type="checkbox" id='parking' onChange={handleChange} checked={searchdata.parking === true} />
                            <span>Parking</span>
                        </div>
                    </div>
                    <div className=' flex-wrap flex gap-2 items-center'>
                        <label>Sort :</label>
                        <select
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            id='sort_order'
                            className='border rounded-lg p-3'
                        >
                            <option value='Price_desc'>Price high to low</option>
                            <option value='Price_asc'>Price low to hight</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>
                    <button onClick={submitSearchdata} className='mt-4 p-1 w-8/12 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95' type='submit'>Search</button>
                </Form>
            </div>
            <div className=' min-h-svh w-full lg:w-9/12  p-2'>
                <h1 className=' text-white text-2xl font-semibold'>Show Property search List :</h1>
                <div  className=' mt-8 flex flex-col lg:flex-row md:flex-row gap-8 flex-wrap items-center'>
                    {
                        properties.length === 0 && (
                            <h1 className=' text-center text-3xl text-white'> No Property founds</h1>
                        )
                    }
                    {
                       properties && properties.map((item) => (
                        <Propertyitem  key={item._id} listing={item} />
                       )) 
                    }

                </div>
            </div>
        </div>
    )
}

export default Searching