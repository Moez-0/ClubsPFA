import { Outlet } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EtudiantNavbar from "../components/LoggedIn/EtudiantNavbar";


const Layout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  axios.defaults.withCredentials = true;

  
  useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/auth/verify');
            console.log(response.data)
            if (response.data.success) {
                setIsAuthenticated(true);
                
            }else{
              setIsAuthenticated(false);
 
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    fetchUser();
}, []);


  return (
    <div className="layout">
      {isAuthenticated ? <EtudiantNavbar /> : <Navbar />}

      <Outlet  />
      </div>
  )
};

export default Layout;