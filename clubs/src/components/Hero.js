import React from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='h-full w-full bg-teeth mt-20'>

    
    <div className=' h-[78vh] w-full bg-ocean-blue-100 flex flex-col items-center justify-evenly pr-20 pl-20 mt-5%'>
        <div className='motivation flex flex-col md:flex-row justify-center items-center'>
          <h1 className='text-white text-5xl md:text-7xl m-5'>Join.</h1>
          <h1 className='text-white text-5xl md:text-7xl m-5'>Create.</h1>
          <h1 className='text-white text-5xl md:text-7xl m-5'>Manage.</h1>
        </div>
        <div className='text-white text-center px-5 md:px-100'>
          <p className='text-white  opacity-90 text-sm md:text-xl'>
            At ClubSy, we understand the pulse of vibrant communities, and we've crafted the perfect solution for seamless club joining and management. Whether you're a student organization, sports club, or hobby enthusiasts, ClubSy is designed to streamline your club-related activities with efficiency and ease.
          </p>
        </div>


        <div className='buttons flex flex-col md:flex-row items-center mb-10'>
          <Link to='/clubs' className="mb-2 w-full px-8 py-1.5 text-md md:mr-2 md:mb-0 md:ml-2 whitespace-nowrap bg-indigo-950 text-white rounded-md hover:bg-white hover:text-ocean-blue-100 transition-colors ease-linear delay-5">
            Check out existing clubs
          </Link>
          <Link to='/signup' className="mb-2 w-full px-8 py-1.5 text-md md:mr-2 md:mb-0 md:ml-2 whitespace-nowrap bg-white rounded-md text-indigo-950 hover:bg-indigo-950 hover:text-white transition-colors ease-linear delay-5">
            Sign up to join or create a new club
          </Link>
          <Link  to='/login' className="w-full px-8 py-1.5 text-md md:mr-2 md:mb-0 md:ml-2 whitespace-nowrap bg-white rounded-md text-indigo-950 hover:bg-indigo-950 hover:text-white transition-colors ease-linear delay-5">
            Login to manage your club
          </Link>
        </div>



    </div>
    <div className='flex items-center justify-center '>
        <img className='size-96 absolute top-[75%] md:size-[900px] md:top-[70%]' src="/images/dashboard.svg" alt="Hero Image" />
    </div>
    </div>
  );
};

export default Hero;