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





const AddClub = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    axios.defaults.withCredentials = true;
    const [adminId , setAdminId] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [allStudents, setAllStudents] = useState([]);
    const [formData, setFormData] = useState({});
    const [error , setError] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === 'clubImage') {

            setFormData({ ...formData, clubImage: '/images/'.concat(e.target.files[0]["name"]) });
        }else{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    }

    const validateForm = () => {
        if (!formData.clubName || !formData.clubDescription || !formData.clubAdmin || !formData.clubImage) {
            setError('All fields are required');
            return false;
        }
        return true;
    }


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

    

useEffect(() => {
    const fetchStudents = async () => {
        try {
            const response = await axios.get('/api/user/all');

            setAllStudents(response.data.users);
        } catch (error) {
            console.log(error);
        }
    };
    fetchStudents();
}, []);

const handleSubmit = async (e) => {
    if (!validateForm()) {
        e.preventDefault();
        return;
    }

    e.preventDefault();
    try {
        console.log(formData);
        const response = await axios.post('/api/club/create-club', formData);

        if (response.data.success) {
            navigate('/admin/admin-dashboard/clubs');
        }else{
            setError(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
}
    
    
  

    return (

        <div className="h-full w-full mt-20">
            <div className='studentDash w-full flex flex-col md:flex-row h-full'>
                <div className='leftMenu  dark:bg-darky px-5 h-[20%] md:h-screen  md:h-full md:w-[20%] flex flex-col justify-evenly items-center'>
                    <Link to="/" className='mt-5 text-4xl font-bold text-ocean-blue-100'>Clubsy</Link>
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
                    <Link to="/admin/admin-dashboard/club-creation-requests" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Club Creation Requests</span>
                    </Link>
                  </div>

                    <div className="adminSection flex flex-col items-center justify-center my-5">
                    <Link to="/admin-dashboard/add-club" className="text-ocean-blue-100 flex items-center space-x-2 ">
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
                        {/* Form to add a club  */}
                        <form className="flex flex-col items-center justify-center h-full mt-10" onSubmit={handleSubmit}>
                            <h1 className="text-4xl font-bold text-ocean-blue-100">Add a club</h1>
                            <div className="flex flex-col items-center justify-center w-full mt-5">
                                {/* Modern input design */}
                                <label htmlFor="clubName" className="text-2xl text-ocean-blue-100">Club Name</label>
                                <input type="text" name="clubName" id="clubName" className="w-1/2 h-10 border-2  rounded-md px-5 mt-2" onChange={handleChange}/>

                            </div>
                            <div className="flex flex-col items-center justify-center w-full mt-5">
                                <label htmlFor="clubDescription" className="text-2xl text-ocean-blue-100">Club Description</label>
                                <textarea name="clubDescription" id="clubDescription" className="w-1/2 h-32 border-2 rounded-md px-5 mt-2" onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full mt-5">
                                <select name='clubAdmin' id='clubAdmin' className="w-1/2 h-10 border-2 rounded-md px-5 mt-2" onChange={handleChange}>
                                    <option value=''>Select Club President</option>
                                    {allStudents.map((student) => {
                                        return <option value={student._id}>{student.identityCard} {student.email} {student.grade} {student.phoneNumber}</option>
                                    })}
                                </select>

                            </div>
    
                            <div className="flex flex-col items-center justify-center w-full mt-5">
                                <label htmlFor="clubLogo" className="text-2xl text-ocean-blue-100">Club Logo</label>
                                <input type="file" name="clubImage" id="clubLogo" className="w-1/2 h-10 border-2rounded-md px-5 mt-2" onChange={handleChange}/>
                            </div>
                            {error && <p className="text-red-500 text-2xl mt-5">{error}</p>
                            }

                            <button type="submit" className="w-1/2 h-10 bg-ocean-blue-100 text-white rounded-md mt-5">Add Club</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddClub;