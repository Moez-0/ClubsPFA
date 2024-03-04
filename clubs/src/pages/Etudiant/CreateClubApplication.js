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





const CreateClubApplication = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    axios.defaults.withCredentials = true;
    const [userId , setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})

      }
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
  
            });
        }
    }
    , [userId]);



     const handleSubmit = async (e) => {
        
    setFormData({...formData, clubPresident: user.email});
        console.log(formData);

        e.preventDefault();
        try {
            const response = await axios.post('/api/clubCreation/create-club-creation-request', formData);
            if (response.data.success) {
                navigate('/student-dashboard/clubs');
            }
        }
        catch (error) {
            console.log(error);
        }
    }


  
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
                    <Link to="/clubs" className="text-ocean-blue-100 flex items-center space-x-2">
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
                    <Link to="/student-dashboard/news" className="text-white flex items-center space-x-2">
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
                      {/* Create edit profile form with placeholders as current user details  */}
                      <form className="flex flex-col items-center justify-center h-full mt-10" onSubmit={handleSubmit}>
                        
                        <div className="flex flex-col items-center justify-center w-full">
                            <label htmlFor="clubName" className="text-ocean-blue-100">Club Name</label>
                            <input type="text" id="clubName" name="clubName" className="w-1/2 rounded-md p-2 border-2 rounded-md p-2" placeholder="Club Name" required onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full mt-5">
                            <label htmlFor="clubDescription" className="text-ocean-blue-100">Club Description</label>
                            <textarea type="text" id="clubDescription" name="clubDescription" className="w-1/2 rounded-md p-2 border-2 rounded-md p-2" placeholder="Club Description" required onChange={handleChange}/>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center w-full mt-5">
                            <label htmlFor="clubMission" className="text-ocean-blue-100">Club Mission</label>
                            <textarea type="text" id="clubMission" name="clubMission" className="w-1/2 rounded-md p-2 border-2 rounded-md p-2" placeholder="Club Mission" required onChange={handleChange}/>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full mt-5">
                            <label htmlFor="clubVision" className="text-ocean-blue-100">Club Vision</label>
                            <textarea type="text" id="clubVision" name="clubVision" className="w-1/2 rounded-md p-2 border-2 rounded-md p-2" placeholder="Club Vision" required onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full mt-5">
                            <label htmlFor="clubGoals" className="text-ocean-blue-100">Club Goals</label>
                            <textarea type="text" id="clubGoals" name="clubGoals" className="w-1/2 rounded-md p-2 border-2 rounded-md p-2" placeholder="Club Goals" required onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full mt-5">
                            <label htmlFor="clubActivities" className="text-ocean-blue-100">Club Activities</label>
                            <textarea type="text" id="clubActivities" name="clubActivities" className="w-1/2 rounded-md p-2 border-2 rounded-md p-2" placeholder="Club Activities" required onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full mt-5">
                            <label htmlFor="clubEvents" className="text-ocean-blue-100">Club Executives </label>

                            <input type="file" id="clubExectutiveMembers" name="clubExectutiveMembers" className="w-1/2 rounded-md p-2 border-2 rounded-md p-2" placeholder="Club Events" required onChange={handleChange}/>
                            
                        </div>

                            
                        <button type="submit" className="bg-ocean-blue-100 text-white rounded-md p-2 mt-10 border-2 rounded-md p-2 hover:bg-ocean-blue-500">Send Application</button>
                    </form>
                      
                    </div>


               
                </div>
            </div>
        </div>
    )
}




export default CreateClubApplication;