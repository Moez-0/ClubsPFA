import React, { useState, useEffect } from 'react';
import { FaChartPie, FaCcDinersClub, FaSun, FaUserCircle, FaCalendar , FaAd , FaAccessibleIcon , FaAddressCard} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const getAdminId = async () => {
    try {
        const response = await axios.get('/api/admin/id');
        return response.data.id;
    } catch (error) {
        return null;  
    }
}


const getAdminData = async (id) => {

    try {
        const response = await axios.get(`/api/admin/data/${id}`);

        return response.data;
    } catch (error) {

        return null;
    }
}



const AdminHome = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    axios.defaults.withCredentials = true;
    const [adminId , setAdminId] = useState(null);
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
      const fetchUser = async () => {
          try {
              const response = await axios.get('/api/admin/verify');

              if (response.data.success) {
                  setIsAuthenticated(true);
                  
              }else{
                  navigate("/admin/login", { replace: true } , { state: { message: "You need to be logged in to access this page" } } , { message: "You need to be logged in to access this page" });

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
          await axios.get('/api/admin/logout');
          //navigate to admin login page
          navigate('/admin/login');
      } catch (error) {
          console.log(error);
      }
  }
   
  //get admin id
  useEffect(() => {
      const fetchAdminId = async () => {
        try {
          const response = await axios.get('/api/admin/id');

          setAdminId(response.data.id);
        } catch (error) {
          console.log(error);
        }
      }
      fetchAdminId();
    }
  , []);

  //get admin data

  useEffect(() => {
    if (adminId) {
        getAdminData(adminId).then((user) => {

            setAdmin(user);
            setAdminData(user);


        });
    }
}
, [adminId]);

    


    return (

        <div className="h-full w-full mt-20">
            <div className='studentDash w-full flex flex-col md:flex-row h-full'>
                <div className='leftMenu  dark:bg-darky px-5 h-[20%] md:h-screen  md:h-full md:w-[20%] flex flex-col justify-evenly items-center'>
                    <Link to="/admin/admin-dashboard/" className='mt-5 text-4xl font-bold text-ocean-blue-100'>Clubsy</Link>
                    <div className='Menulinks h-full flex flex-col justify-center'>

                    {/* Admin links  */}
                    <div className="adminSection flex flex-col items-center justify-center my-5">
                    <Link to="/admin/admin-dashboard/students" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Students</span>
                    </Link>
                    </div>
                    <div className="adminSection flex flex-col items-center justify-center my-5">
                    <Link to="/admin/admin-dashboard/clubs" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Clubs</span>
                    </Link>
                    </div>
                    <div className="adminSection flex flex-col items-center justify-center my-5">
                    <Link to="/admin/admin-dashboard/finance" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Request Finanical Report</span>
                    </Link>
                    </div>
                    <div className="adminSection flex flex-col items-center justify-center my-5">
                    <Link to="/admin/admin-dashboard/club-creation-requests" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Club Creation Requests</span>
                    </Link>
                  </div>

                    <div className="adminSection flex flex-col items-center justify-center my-5">
                    <Link to="/admin-dashboard/add-club" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Add club</span>
                    </Link>
                    </div>
                    <div className="adminSection flex flex-col items-center justify-center my-5">
                    <Link to="/admin-dashboard/clubs" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Reclamations</span>
                    </Link>
                    </div>
                    <div className="adminSection flex flex-col items-center justify-center my-5">
                    <Link to="/admin-dashboard/clubs" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Club Statistics</span>
                    </Link>
                    </div>
                    <div className="adminSection flex flex-col items-center justify-center my-5">
                    <Link to="/admin-dashboard/clubs" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Student Statistics</span>
                    </Link>
                    </div>
                </div>
                </div>

                <div className='rightSection h-[80%] md:h-full md:w-[80%] h-full '>
                    <div className='px-10 flex justify-between items-center h-20 bg-teeth
                    shadow-md'>
                        <div className='flex items-center space-x-2'>
                            <button className='text-3xl text-ocean-blue-100' onClick={handleLogout}>Logout</button>
                        </div>
                        <div className='flex items-center space-x-2 mr-5'>
                            <Link to="/profile" className='text-3xl text-ocean-blue-100'> {admin.adminName}</Link>
                            <FaUserCircle className='text-3xl text-ocean-blue-100' />
                        </div>

                        

                    </div>
                    <div className='mainContent h-[80%] md:h-full'>
                        <div className='flex items-center justify-center h-20 bg-teeth shadow-md'>
                            <h1 className='text-4xl font-bold text-ocean-blue-100'>Welcome to your dashboard</h1>
                        </div>
                        <div className='flex items-center justify-center h-20 bg-teeth shadow-md'>
                            <h1 className='text-4xl font-bold text-ocean-blue-100'>You can manage students and clubs from here</h1>
                        </div>
                    </div>


               
                </div>
            </div>
        </div>
    )
}




export default AdminHome;
