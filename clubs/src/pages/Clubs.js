import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Clubs = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    axios.defaults.withCredentials = true;
    const [userId, setUserId] = useState(null);
    const [allClubs, setAllClubs] = useState([]);
    const [searchedClubs, setSearchedClubs] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/verify');

                if (response.data.success) {
                    setIsAuthenticated(true);
                    setUser(response.data.user);
                    setUserId(response.data.user.id);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [navigate]);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await axios.get('/api/club/clubs');

                if (response.data.success) {
                    setAllClubs(response.data.clubs);
                    console.log(response.data.clubs);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchClubs();
    }, [navigate]);
    
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/club/clubs/name/${e.target.value}`);
            
            if (response.data.success) {
                if (e.target.value === '') {
                    setSearchedClubs([]);
                } else {
                    setSearchedClubs(response.data.club);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return ( 
        <div className='w-full min-h-screen flex flex-col md:flex-row mt-20'>
            <div className='left flex-1 bg-teeth'>
                <div className='flex flex-col items-center justify-center h-full'>
                    <h1 className='text-5xl md:text-8xl m-5'>Clubs</h1>
                    <form className='flex flex-col items-center justify-center'>
                        <input className='w-80 h-10 p-2 m-2 rounded-md' type='text' placeholder='Search for a club' onChange={handleSearch} />
                    </form>
                </div>
            </div>
            <div className='right flex-1 bg-ocean-blue-800 flex items-center justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                    {(searchedClubs.length > 0 ? searchedClubs : allClubs).map((club) => (
                        <div key={club.id} className='bg-white rounded-md p-4 flex flex-col items-center justify-center'>
                            <h1 className='text-2xl font-bold'>{club.clubName}</h1>
                            <p className='text-md'>{club.clubDescription}</p>
                            <img className='w-32 h-32 m-2' src={club.clubImage} alt={club.clubName} />
                            <button className='w-32 h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>Join</button>
                        </div>
                    ))}
                    {allClubs.length === 0 && <h1 className='text-2xl font-bold text-white'>No clubs found</h1>}
                </div>
            </div>
        </div>
    );
}

export default Clubs;
