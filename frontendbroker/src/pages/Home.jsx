import React from 'react'

const Home = () => {
  return (
    <div className=' Homepage max-w-full min-h-svh flex justify-center'>
      <div className=' top-1/2 absolute'>
        <h1 className=' break-words font-semibold text-4xl text-center text-white lg:text-6xl'>Easiest way to find your dream home</h1>
        <div className=' mt-5 flex gap-4 p-10'>
          <input className=' w-7/12 h-12 rounded-3xl pl-4 text-xl' type='search' placeholder='search your home ' />
          <button type='submit' className=' hover:border-2 hover:bg-transparent hover:text-slate-700 hover:border-slate-700 h-12 w-40 bg-slate-700 rounded-3xl text-white text-2xl' >Search</button>
        </div>
      </div>
    </div>
  )
}

export default Home