import React, { useState, useEffect } from 'react';
import { FaChartPie, FaCcDinersClub, FaSun, FaUserCircle, FaCalendar , FaAd ,FaBell} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const StudentDashboardLinks = [



    {
        title: 'Clubs',
        link: '/clubs',
        icon: <FaCcDinersClub />
    },
    {
        title: 'Events',
        link: '/events',
        icon: <FaCalendar />
    },
    {
        title: 'Profile',
        link: '/profile',
        icon: <FaUserCircle />
    },
    {
        title: 'Settings',
        link: '/settings',
        icon: <FaSun />
    },
];

const getUserData = async (id) => {
    try {
        const response = await axios.get(`/api/user/${id}`);
        
        return response.data.user;
    } catch (error) {
        return null;
    }
}





const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    axios.defaults.withCredentials = true;
    const [userId , setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/verify');

                if (response.data.success) {
                    setIsAuthenticated(true);
                    
                }else{
                    navigate("/404", { replace: true } , { state: { message: "You need to be logged in to access this page" } } , { message: "You need to be logged in to access this page" });

                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, []);
   

    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
    //get user id 
    useEffect(() => {
        const fetchUserId = async () => {
          try {
            const response = await axios.get('/api/user/id');
            console.log(response.data.id)
            setUserId(response.data.id);
          } catch (error) {


          }
        };
    
        fetchUserId();
      }, []);
    
    //get user data

       useEffect(() => {
        if (userId) {
            getUserData(userId).then((user) => {
                setUser(user);
                setUserData(user);
                setNotifications(user.notifications);
  
            });
        }
    }
    , [userId]);



     
     
  
    return (

        <div className="h-full w-full mt-20">
            <div className='studentDash w-full flex flex-col md:flex-row h-full'>
                <div className='leftMenu md:h-full dark:bg-darky px-5 h-[20%]  md:w-[20%] md:h-screen flex flex-col justify-evenly items-center'>
                    <Link to="/student-dashboard/" className='mt-5 text-4xl font-bold text-ocean-blue-100'>Clubsy</Link>
                    <div className='Menulinks'>
                    <div className="profileSection flex flex-col items-center justify-center">
                    <Link to="/student-dashboard" className="text-ocean-blue-100 flex items-center space-x-2 ">
                        <FaUserCircle className="text-xl" />
                        <span>Profile</span>
                    </Link>
                </div>
                <div className="clubsSection flex flex-col items-center justify-center mt-5">
                    <Link to="/student-dashboard/clubs" className="text-white flex items-center space-x-2">
                        <FaCcDinersClub className="text-xl" />
                        <span>Clubs</span>
                    </Link>
                </div>

                <div className="clubsSection flex flex-col items-center justify-center mt-5">
                    <Link to="/student-dashboard/create-club-application" className="text-white flex items-center space-x-2">
                        <FaCcDinersClub className="text-xl" />
                        <span>Club Create Application</span>
                    </Link>
                </div>
                <div className="clubsSection flex flex-col items-center justify-center mt-5">
                    <Link to="/student-dashboard/news" className="text-white flex items-center space-x-2">
                        <FaAd className="text-xl" />
                        <span>News</span>
                    </Link>
                </div>
                <div className="clubsSection flex flex-col items-center justify-center mt-5">
                    <Link to="/student-dashboard/events" className="text-white flex items-center space-x-2">
                        <FaCalendar className="text-xl" />
                        <span>Events</span>
                    </Link>
                </div>
                </div>

                    </div>
                <div className='rightSection h-[80%] md:h-full md:w-[80%] '>
                    <div className='px-10 flex justify-between items-center h-20 bg-teeth
                    shadow-md'>
                        <div className='flex items-center space-x-2'>
                            <button className='text-3xl text-ocean-blue-100' onClick={handleLogout}>Logout</button>
                        </div>
                        <div className='flex items-center space-x-2 mr-5'>
                            
                            <Link to="/profile" className='text-3xl text-ocean-blue-100'>{user.userName}</Link>
                            <FaUserCircle className='text-3xl text-ocean-blue-100' />
                        </div>
                        {/* //notifications bell */}
                        <div className='flex items-center space-x-2'>
                            <Link to="/student-dashboard/notifications" className='text-3xl text-ocean-blue-100'>
                            <FaBell className='text-3xl text-ocean-blue-100' /></Link>
                            <span className='text-3xl text-ocean-blue-100'>{notifications.length}</span>
                            
                        </div>

                        

                    </div>
                    <div className='mainContent h-[80%] md:h-full'>
                      {/* Create edit profile form with placeholders as current user details  */}
                      <form className="flex flex-col items-center justify-center h-full mt-10">

                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="id">Identity Card</label>
                            <input type="text" id="id" name="id" placeholder={userData?.identityCard} readOnly className="border-2 rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" placeholder={userData?.userName} readOnly className="border-2 rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" placeholder={userData?.phoneNumber} className="border-2 rounded-md p-2" />
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="Enter new password" className="border-2 rounded-md p-2" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder={userData?.email} className="border-2 rounded-md p-2" />
                        </div>
                        <button type="submit" className="bg-ocean-blue-100 text-white rounded-md p-2 mt-10 hover:bg-ocean-blue-500">Update Profile</button>
                    </form>
                      
                    </div>


               
                </div>
            </div>
        </div>
    )
}




export default StudentDashboard;