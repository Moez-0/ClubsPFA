import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} setUser={setUser} />

      <Outlet />
    </>
  )
};

export default Layout;