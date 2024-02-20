import React from 'react'

const About = () => {
  return (
    <div className='w-full h-screen flex flex-col md:flex-row mt-20'>
        <div className='right flex-1 bg-ocean-blue-100 flex items-center justify-center'>
            <h1 className='text-white text-8xl m-5'>Clubsy</h1>
        </div>
        <div className='left flex-1 bg-teeth'>
            <div className='flex flex-col items-center justify-center h-full px-20'>
                <h1 className='text-5xl md:text-8xl m-5 '>About</h1>
                <p className='text-xl m-5 px-20'>Clubsy is a platform for students to find and join clubs at their school. It is a place for students to connect with other students who share similar interests and passions. It is also a place for clubs to find new members and grow their community. Clubsy is a place for students to find their people.</p>
            </div>
        </div>
    </div>
  )
}

export default About