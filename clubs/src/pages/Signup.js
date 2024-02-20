import React from 'react'
import { useState } from 'react'

import { Link , useNavigate } from 'react-router-dom'




const Signup = () => {
   
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
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();

        setLoading(false);
        console.log(data);
        if (data.success === false){
          setError(data.message);
          
          return;
        }

        setError(false);
        
        navigate('/login');
        
      }
      catch (error) {
        
        setLoading(false);
        setError(true);
      }
    }
  



  return (
    <div className='w-full h-screen flex flex-col md:flex-row mt-20'>
        <div className='right flex-1 bg-ocean-blue-100 flex items-center justify-center'>
            <h1 className='text-white text-8xl m-5'>Clubsy</h1>
        </div>
        <div className='left flex-1 bg-teeth'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-5xl md:text-8xl m-5'>Signup</h1>
                {/* form with Identity card drop list of grade and email and phone number and username */}
                <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit} >
                    <input className='w-96 h-10 m-2 p-2 rounded-md md:text-xl' type="text" placeholder="Identity Card" name='identityCard' onChange={handleChange}/>
        
                    <label className='w-96 h-10 m-2 p-2 rounded-md md:text-xl text-black opacity-50' for="grade">Choose current grade:</label>
               
                    <select className='w-96 h-10 m-2 p-2 rounded-md md:text-xl text-black opacity-50' name="grade" id="grade" onChange={handleChange}>

                        <option value="L1" className='text-black opacity-50 hover:bg-ocean-blue-100'>L1</option>
                        <option value="L2" className='text-black opacity-50 hover:bg-ocean-blue-100'>L2</option>
                        <option value="L3" className='text-black opacity-50 hover:bg-ocean-blue-100'>L3</option>
                        <option value="CPI1" className='text-black opacity-50 hover:bg-ocean-blue-100'>CPI 1</option>
                        <option value="CPI2" className='text-black opacity-50 hover:bg-ocean-blue-100'>CPI 2</option>
                        <option value="ING1" className='text-black opacity-50 hover:bg-ocean-blue-100'>ING 1</option>
                        <option value="ING2" className='text-black opacity-50 hover:bg-ocean-blue-100'>ING 2</option>
                        <option value="ING3" className='text-black opacity-50 hover:bg-ocean-blue-100'>ING 3</option>
                        <option value="MP1" className='text-black opacity-50 hover:bg-ocean-blue-100'>MP 1</option>
                        <option value="MP2" className='text-black opacity-50 hover:bg-ocean-blue-100'>MP 2</option>
                        <option value="MR1" className='text-black opacity-50 hover:bg-ocean-blue-100'>MR 1</option>
                        <option value="MR2" className='text-black opacity-50 hover:bg-ocean-blue-100'>MR 2</option>
                    </select>
                    <input className='w-96 h-10 m-2 p-2 rounded-md md:text-xl' type="email" placeholder="Email" name='email' onChange={handleChange} />
       
                    <input className='w-96 h-10 m-2 p-2 rounded-md md:text-xl' type="text" placeholder="Phone Number +216 96154061" name='phoneNumber' onChange={handleChange} />
                    
                    <input className='w-96 h-10 m-2 p-2 rounded-md md:text-xl' type="text" placeholder="Username" name='userName' onChange={handleChange}/>
            
                    <input className='w-96 h-10 m-2 p-2 rounded-md md:text-xl' type="password" placeholder="Password" name='password' onChange={handleChange}/>
            
                    <button disabled={loading} className='w-96 h-10 m-2 p-2 bg-indigo-950 text-white rounded-md' type='submit'>{ loading ? 'Loading..' : 'Sign up'}</button>
                    <p className='text-red-600'>{error && 'Something went wrong '} </p>
                    <p className='text-red-600'>{error} </p>
                    </form>
            </div>
        </div>
    </div>
  )
}

export default Signup