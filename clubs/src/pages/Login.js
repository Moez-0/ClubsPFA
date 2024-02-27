import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const isAdmin = (userId,array) => {
   for (let i = 0; i < array.length; i++) {
      if (array[i].clubAdmin === userId) {
         return true;
      }
   }
    return false;
}

const Login = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [allClubs, setAllClubs] = useState([]);
  const [userid , setUserId] = useState('');
  
  
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
  
    }
        //get all clubs 
        useEffect(() => {
          const fetchClubs = async () => {
              try {
                  const response = await axios.get('/api/club/clubs');
    
                  if (response.data.success) {
                      setAllClubs(response.data.clubs);
    
                  }
              } catch (error) {
                  console.error(error);
              }
          };
    
          fetchClubs();
      }, [navigate]);
    const handleSubmit = async (e) => {
  
      e.preventDefault();
      try {
        setLoading(true);
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        setLoading(false);
        // console.log(data);
        if (data.success === false){
          
          setError(data.message);
          return;
        }

        if(isAdmin(data.userId,allClubs)){
          setError(false);

          navigate('/club-dashboard');
        }else{

        setError(false);
        navigate('/student-dashboard');
      }
        // console.log(data);
      }
      catch (error) {
        setLoading(false);
        setError(true);
      }
    }
 


  return (
    <div key={2}>
    <div className='w-full h-screen flex flex-col md:flex-row mt-20' key="LoginKey">
        <div className='right flex-1 bg-ocean-blue-100 flex items-center justify-center'>
            <h1 className='text-white text-8xl m-5'>Clubsy</h1>
        </div>
        <div className='left flex-1 bg-teeth'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-5xl md:text-8xl m-5'>Login</h1>
                <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                    <input className='w-96 h-10 m-2 p-2 rounded-md md:text-xl' type="text" placeholder="Email" name="email" onChange={handleChange}/>
                    <input className='w-96 h-10 m-2 p-2 rounded-md' type="password" placeholder="Password" name='password' onChange={handleChange}  />
                    <div className='flex w-full justify-evenly m-5'>
                    <Link to='/signup' className='text-indigo-950'>Sign up</Link>
                    <Link to='/forgot-password' className='text-indigo-950'>Forgot password</Link>
                    
                    </div>
                    <button className='w-96 h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>{loading ? 'Loading' : 'Login' }</button>
                    
                    {error}
                </form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login