import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
  
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
  
    }
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
        setError(false);
        navigate('/student-dashboard');
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