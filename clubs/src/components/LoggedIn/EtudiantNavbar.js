import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from "react-router-dom";


const EtudiantNavbar = () => {

    const [open, setOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ menuLinks, setMenuLinks] = useState([
        {
            title: 'Student Dashboard',
            link: '/student-dashboard/'
        },
        {
            title:'Check out existing clubs',
            link: '/clubs'
        },
        {
            title: 'Joined clubs',
            link: '/student-dashboard/clubs'
        }

    ]);



    const handleMenu = () => {
        setOpen((prev) => !prev);
    };
    //change links if authenticated
    if (isAuthenticated) {
        setMenuLinks([
            {
                title: 'Home',
                link: '/',
            },
            {
                title: 'Clubs',
                link: '/clubs',
            },
            {
                title: 'Events',
                link: '/events',
            },
            {
                title: 'Profile',
                link: '/profile',
            },
            {
                title: 'Settings',
                link: '/settings',
            },
        ]);
    }

    return (
        <div className='  h-20 w-full flex bg-teeth justify-between items-center shadow-md fixed top-0 left-0 z-10'>

            
            <div className=' ml-5 md:ml-20 '>
                <Link to='/' onClick={() => setOpen(false)}>
                <img className='hover:cursor-pointer' src="/images/logo.png" alt="Docplanner Group" />
                </Link>
            </div>
            <div>
                <div className='mr-5 md:mr-20'>
                    <button
                        type='button'
                        onClick={handleMenu}
                        className='inline-flex items-center justify-center rounded-md text-ocean-blue-900 hover:text-ocean-blue-100 transition-all ease-linear duration-300'
                    >
                        <span className='sr-only'>Open main menu</span>
                        {open ? (
                            <FaTimes className='text-brick size-9 transform rotate-90' />
                        ) : (
                            <FaBars className='text-brick size-9 transform rotate-0' />
                        )}
                    </button>
                </div>

                {/* Menu mobile */}
                <div
                    className={`absolute top-20 left-0 w-full h-fit w-full bg-black ${
                        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    } transition-opacity ease-in-out duration-300`}
                >
                    <ul className='flex flex-col items-center'>
                        {menuLinks.map((link, index) => (
                            <Link to={link.link}
                            onClick={() => setOpen(false)}
                                key={index}
                                className='p-6 w-full inline-flex justify-center items-center transition-all ease-in-out delay-100 hover:bg-ocean-blue-100 hover:cursor-pointer'
                            >
                                <Link to={link.link} className='text-brick text-lg uppercase text-white'>
                                    {link.title}
                                </Link>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default EtudiantNavbar;
