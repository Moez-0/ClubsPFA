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



const ClubCreationRequests = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    axios.defaults.withCredentials = true;
    const [adminId , setAdminId] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [allRequests, setAllRequests] = useState([]);

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

    //get club creation requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/clubCreation/club-creation-requests');

                setAllRequests(response.data.clubCreationRequests);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRequests();
    }
    , []);

    const handleAccept = async (id) => {
        try {
            const response = await axios.post(`/api/clubCreation/accept/${id}`);
            console.log(response.data);
            setAllRequests(allRequests.filter((request) => request._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const handleReject = async (id) => {
        try {
            const response = await axios.post(`/api/clubCreation/reject/${id}`);
            console.log(response.data);
            setAllRequests(allRequests.filter((request) => request._id !== id));
        } catch (error) {
            console.log(error);
        }
    }




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
                    <Link to="/admin-dashboard/clubs" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Request Finanical Report</span>
                    </Link>
                    </div>
                    <div className="adminSection flex flex-col items-center justify-center my-5">
                    <Link to="/admin/admin-dashboard/club-creation-requests" className="text-ocean-blue-100 flex items-center space-x-2 ">
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

        

{ allRequests.length > 0 ? (
    <div className='flex flex-col items-center justify-center'>
        <table className='w-full flex flex-col justify-center items-center'>
            <thead>
                <tr>
                    <th className='p-5'>Club Name</th>
                    <th className='p-5'>Club Description</th>
                    <th className='p-5'>Club Mission</th>
                    <th className='p-5'>Club Vision</th>
                    <th className='p-5'>Club Goals</th>
                    <th className='p-5'>Club Activites</th>
                    <th className='p-5'>Club President</th>
                    <th className='p-5'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allRequests.map((request) => (
                    <tr key={request._id}>
                        <td className='p-5'>{request.clubName}</td>
                        <td className='p-5'>{request.clubDescription}</td>
                        <td className='p-5'>{request.clubMission}</td>
                        <td className='p-5'>{request.clubVision}</td>
                        <td className='p-5'>{request.clubGoals}</td>
                        <td className='p-5'>{request.clubActivities}</td>
                        <td className='p-5'>{request.clubPresident}</td>
                        { request.requestStatus === 'pending' ? (
                            <td className='p-5'>Pending</td>
                        ) : request.requestStatus === 'accepted' ? (
                            <td className='p-5'>Accepted</td>
                        ) : (
                            <td className='p-5'>Rejected</td>
                        )}
                        <td className='p-5'>
                            <button  onClick={() => handleAccept(request._id)} className='bg-green-500 text-white p-2 rounded-md mx-10'>Accept</button>
                            <button onClick={() => handleReject(request._id)} className='bg-red-500 text-white p-2 rounded-md mx-10'>Reject</button>
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>
    </div>
) : (
    <div className='flex items-center justify-center h-full'>
        <h1 className='text-3xl text-ocean-blue-100'>No club creation requests</h1>
    </div>
)}
                    </div>
                </div>
            </div>
        </div>
        )
}


export default ClubCreationRequests;
