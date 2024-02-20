import React from 'react';
import { useState } from 'react';

const Clubs = () => {
  
  return ( 
    <div className='w-full min-h-screen flex flex-col md:flex-row mt-20'>
                <div className='left flex-1 bg-teeth'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-5xl md:text-8xl m-5'>Clubs</h1>
                <form className='flex flex-col items-center justify-center'>
                    <input className='w-96 h-10 m-2 p-2 rounded-md md:text-xl' type="text" placeholder="Search Clubs" />
                    <button className='w-96 h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>Search</button>
                </form>
            </div>
        </div>
        <div className='right flex-1 bg-ocean-blue-800 flex items-center justify-center'>
            {/* Liste of clubs found as a grid with club name description image and join button*/}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                <div className='bg-white p-4 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold'>IEE</h2>
                    <p className='text-lg hidden'>Description of the club</p>
                    <img className='w-full h-60' src="/images/iee.jpg" alt="club1" />
                    <button className='w-full h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>Join</button>
                </div>
                <div className='bg-white p-4 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold'>TUNIVISONS</h2>
                    <p className='text-lg hidden'>Description of the club</p>
                    <img className='w-full h-60 object-cover' src="/images/club2.png" alt="club2" />
                    <button className='w-full h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>Join</button>
                </div>
                <div className='bg-white p-4 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold'>CPU</h2>
                    <p className='text-lg hidden'>Description of the club</p>
                    <img className='w-full h-60 object-cover' src="/images/club3.jpg" alt="club3" />
                    <button className='w-full h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>Join</button>
                </div>
                <div className='bg-white p-4 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold'>CRI</h2>
                    <p className='text-lg hidden'>Description of the club</p>
                    <img className='w-full h-60 object-cover' src="/images/club4.jpg" alt="club4" />
                    <button className='w-full h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>Join</button>
                </div>
                <div className='bg-white p-4 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold'>THE CODE BEY</ h2>
                    <p className='text-lg hidden'>Description of the club</p>
                    <img className='w-full h-60 object-cover' src="/images/club5.jpg" alt="club5" />
                    <button className='w-full h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>Join</button>
                </div>
                <div className='bg-white p-4 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold'>ENGLISTICS</ h2>
                    <p className='text-lg hidden'>Description of the club</p>
                    <img className='w-full h-60 object-cover' src="/images/club6.jpg" alt="club5" />
                    <button className='w-full h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>Join</button>
                </div>
                <div className='bg-white p-4 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold'>Binary Beats Club </ h2>
                    <p className='text-lg hidden'>Description of the club</p>
                    <img className='w-full h-60 object-cover' src="/images/club7.jpg" alt="club5" />
                    <button className='w-full h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>Join</button>
                </div>
                <div className='bg-white p-4 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold'>ATIA AI CLUB </ h2>
                    <p className='text-lg hidden'>Description of the club</p>
                    <img className='w-full h-60 object-cover' src="/images/club8.jpg" alt="club5" />
                    <button className='w-full h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>Join</button>
                </div>
                </div>


        </div>

    </div>

  )
}

export default Clubs