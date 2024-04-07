import React from 'react'

const About = () => {
  return (
    <div className='  h-screen flex flex-col items-center'>
      <h1 className=' text-center text-3xl my-14 p-3 text-white bg-slate-600 w-2/12'> About us</h1>
      <div className='bg-white max-w-4xl mx-auto p-7 rounded-md shadow-lg shadow-slate-900'>
        <h1 className='text-4xl font-bold mb-1 text-slate-800'>The Estate Promise</h1>
        <p className='mb-4 text-2xl font-semibold text-slate-700'>Sed vestibulum lectus ut leo molestie, id suscipit magna</p>
        <p className='mb-4 text-slate-700'>
        Donec ullamcorper nulla non metus auctor fringi lla. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus eros, placerat quis fermentum et, viverra sit amet lacus. Nam gravida semper augue id sagittis. Cras nec arcu quis velit tempor porttitor sit amet vel risus. Sed vestibulum lectus ut leo molestie, id suscipit magna mattis. Vivamus nisl ligula, varius congue dui sit amet, vestibulum sollicitudin mauris. Vestibulum quis ligula in nunc varius maximus ac et nunc. Nulla sed magna turpis.        </p>
        <p className='mb-4 text-slate-700'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>
      </div>

    </div>
  )
}

export default About