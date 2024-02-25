import React, { useState, useEffect } from 'react';
import { FaChartPie, FaCcDinersClub, FaSun, FaUserCircle, FaCalendar , FaAd , FaAccessibleIcon , FaAddressCard} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';





const ClubDashboard = () => {
   
    return (

        <div className="h-full w-full mt-20">
            <div className='studentDash w-full flex flex-col md:flex-row h-full'>
                <div className='leftMenu  dark:bg-darky px-5 h-[20%] md:h-screen  md:h-full md:w-[20%] flex flex-col justify-evenly items-center'>
                    <Link to="/" className='mt-5 text-4xl font-bold text-ocean-blue-100'>Clubsy</Link>
                    <div className='Menulinks h-full flex flex-col justify-center'>


                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5 ">
                    <Link to="/club-dashboard/details" className="text-ocean-blue-100 flex items-center space-x-2 ">
                        <FaUserCircle className="text-xl" />
                        <span >Club Details</span>
                    </Link>
                    </div>
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/details" className="text-white flex items-center space-x-2 ">
                        <FaCcDinersClub className="text-xl" />
                        <span>Administrative autorization application</span>
                    </Link>
                    </div>
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/details" className="text-white flex items-center space-x-2 ">
                        <FaChartPie className="text-xl" />
                        <span>Club Members</span>
                    </Link>
                    </div>  
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/details" className="text-white flex items-center space-x-2 ">
                        <FaCalendar className="text-xl" />
                        <span>Club Events</span>
                    </Link>
                    </div>
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/details" className="text-white flex items-center space-x-2 ">
                        <FaAd className="text-xl" />
                        <span>Club News</span>
                    </Link>
                    </div>
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/details" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Club Statistics</span>
                    </Link>

                    </div>
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/details" className="text-white flex items-center space-x-2 ">
                        <FaAccessibleIcon className="text-xl" />
                        <span>Recrute memebers</span>
                    </Link>

                    </div>

                    


                    </div>




           
                    </div>
                <div className='rightSection h-[80%] md:h-full md:w-[80%] h-full '>
                    <div className='px-10 flex justify-between items-center h-20 bg-teeth
                    shadow-md'>
                        <div className='flex items-center space-x-2'>
                            <button className='text-3xl text-ocean-blue-100'>Logout</button>
                        </div>
                        <div className='flex items-center space-x-2 mr-5'>
                            <Link to="/profile" className='text-3xl text-ocean-blue-100'></Link>
                            <FaUserCircle className='text-3xl text-ocean-blue-100' />
                        </div>

                        

                    </div>
                    <div className='mainContent h-[80%] md:h-full'>
                        
                    </div>


               
                </div>
            </div>
        </div>
    )
}




export default ClubDashboard;
