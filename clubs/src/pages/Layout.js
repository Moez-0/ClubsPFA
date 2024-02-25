import { Outlet } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Layout = () => {

  return (
    <div className="layout">
      <Navbar  />

      <Outlet />
      </div>
  )
};

export default Layout;