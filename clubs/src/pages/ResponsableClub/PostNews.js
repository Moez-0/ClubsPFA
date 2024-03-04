import React, { useState, useEffect } from 'react';
import { FaChartPie, FaCcDinersClub, FaSun, FaUserCircle, FaCalendar , FaAd , FaAccessibleIcon , FaAddressCard} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios, { all } from 'axios';


const filterClubs = (userId, clubs) => {
    return clubs.filter((club) => club.clubAdmin === userId);
}


const getUserData = async (id) => {
    try {
        const response = await axios.get(`/api/user/${id}`);
        
        return response.data.user;
    } catch (error) {
        return null;
    }
}

const PostNews = () => {
    const clubId = useParams().clubId;
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    axios.defaults.withCredentials = true;
    const [userId , setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [allClubs, setAllClubs] = useState([]);
    const [ClubNews, setClubNews] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        cover: '',
    });
    const handleChange = (e) => {
        if (e.target.name === 'cover') {

            setFormData({ ...formData, cover: '/images/'.concat(e.target.files[0]["name"]) });
        }else{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
                setNotifications(user.notifications);
  
            });
        }
    }
    , [userId]);

    //get clubNews
//get clubNews
useEffect(() => {
    const fetchClubNews = async () => {
        if (clubId) {
            try {
                const response = await axios.get(`/api/club/clubs/${clubId}/news`);
                setClubNews(response.data.clubNews);
            } catch (error) {
                console.error("Error fetching club news:", error);
            }
        }
    };

    fetchClubNews();

}, [clubId]);




    const handleSubmit = async (e) => {
        e.preventDefault();

        const news = {
            title: formData.title,
            content: formData.content,
            cover: formData.cover,
        }
        try {
            const response = await axios.put(`/api/club/clubs/${clubId}/add-news`, { news });

            setClubNews([...ClubNews, news]);

        } catch (error) {
            console.error("Error posting news:", error);
        }
    }

    
    return (

        <div className="h-full w-full mt-20">
            <div className='studentDash h-full w-full flex flex-col md:flex-row'>

                <div className='leftMenu md:h-full bg-darky px-5 h-[20%]  md:w-[20%] md:h-screen flex flex-col justify-evenly items-center flex-1 '>
                    <Link to="/club-dashboard/" className='mt-5 text-4xl font-bold text-ocean-blue-100'>Clubsy</Link>
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
                    <Link to="/club-dashboard/members/" className="text-white flex items-center space-x-2 ">
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
                <div className='rightSection h-[80%] md:h-full md:w-[80%] '>
                    <div className='px-10 flex justify-between items-center h-20 bg-teeth
                    shadow-md'>
                        <div className='flex items-center space-x-2'>
                            <button className='text-3xl text-ocean-blue-100' onClick={handleLogout}>Logout</button>
                        </div>
                        <div className='flex items-center space-x-2 mr-5'>
                            { user.userName}
                            <Link to="/profile" className='text-3xl text-ocean-blue-100'></Link>
                            <FaUserCircle className='text-3xl text-ocean-blue-100' />
                        </div>

                        

                    </div>
                    <div className='mainContent h-[80%] md:h-full  w-full flex justify-evenly items-center'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full m-10'>
                            <div className='bg-white shadow-md rounded-md p-5'>
                                <h1 className='text-3xl font-bold text-ocean-blue-100' >Post News</h1>
                                <form className='flex flex-col space-y-5 mt-5' onSubmit={handleSubmit}>
                                    <input type='text' name='title' placeholder='Title' className='w-full h-10 border-2  rounded-md p-5' onChange={handleChange}/>
                                    <textarea placeholder='Content' name='content' className='w-full h-40 border-2 rounded-md p-5' onChange={handleChange}></textarea>
                                    <input type='file' name='cover' className='w-full h-10  p-2 inline' onChange={handleChange}/>
                                    <button className='w-full h-10 bg-ocean-blue-100 text-white rounded-md'>Post</button>
                                </form>
                            </div>
                            
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full'>
                            {ClubNews.map((news) => {
                                return (
                                    <div className="bg-white
                                    shadow-md rounded-md p-5">
                                        <img src={news.cover} className="w-full h-50 object-cover rounded-md" alt="news" />
                                        <h1 className="text-xl font-bold text-ocean-blue-100">{news.title}</h1>
                                        <p className="text-gray-600">{news.content}</p>
                                    </div>
                                );
                            })}
                        
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default PostNews;