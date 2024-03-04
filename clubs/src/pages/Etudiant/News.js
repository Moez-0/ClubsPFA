import React, { useState, useEffect } from 'react';
import { FaChartPie, FaCcDinersClub, FaSun, FaUserCircle, FaCalendar , FaAd} from 'react-icons/fa';
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





const News = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    axios.defaults.withCredentials = true;
    const [userId , setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userClubs, setUserClubs] = useState([]);
    const [userNews, setUserNews] = useState([]);
    const [userClubsIds, setUserClubsIds] = useState([]);

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

      useEffect(() => {
        if (userId) {
            getUserData(userId).then((user) => {
                setUser(user);
                setUserData(user);
                setUserClubsIds(user.clubs);
                console.log(user.clubs);
  
            });
        }
    }
    , [userId]);

    useEffect(() => {
        if (userClubsIds.length > 0) {
            userClubsIds.forEach((clubId) => {
                axios.get(`/api/club/clubs/${clubId}`).then((response) => {
                    setUserClubs((userClubs) => [...userClubs, response.data.club]);
                });
            });
        }
    }
    , [userClubsIds]);


    const clubNews = userClubs.map((club) => {
        return club.clubNews;
    }
    );

  
    return (

        <div className="h-full w-full mt-20">
            <div className='studentDash w-full flex flex-col md:flex-row h-full'>
                <div className='leftMenu  dark:bg-darky px-5 h-[20%] md:h-screen  md:h-full md:w-[20%] flex flex-col justify-evenly items-center'>
                    <Link to="/student-dashboard/" className='mt-5 text-4xl font-bold text-ocean-blue-100'>Clubsy</Link>
                    <div className='Menulinks'>
                    <div className="profileSection flex flex-col items-center justify-center">
                    <Link to="/student-dashboard" className="text-white flex items-center space-x-2 ">
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
                    <Link to="/student-dashboard/news" className="text-ocean-blue-100 flex items-center space-x-2">
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

                        

                    </div>
                    <div className='mainContent h-[80%] md:h-full'>
                        {/* placeholders for news feed */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                            {clubNews.map((clubNews) => {
                                return clubNews.map((news) => {
                                    return (
                                        <div className="bg-white
                                        shadow-md rounded-md p-5">
                                            <img src={news.cover} className="w-full h-50 object-cover rounded-md" alt="news" />
                                            <h1 className="text-xl font-bold text-ocean-blue-100">{news.title}</h1>
                                            <p className="text-gray-600">{news.content}</p>


                                            </div>
                                    );

                                }
                                );
                            }
                            
                            )}

                            </div>
                    </div>


               
                </div>
            </div>
        </div>
    )
}




export default News;