import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Clubs from "./pages/Clubs";
import About from "./pages/About";
import StudentDashboard from "./pages/StudentDashboard";
import ClubOwnerDashboard from "./pages/ClubOwnerDashboard";

import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from './redux/store.js';



export default function App() {

  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="student-dashboard" element={<StudentDashboard />} />
          <Route path="club-dashboard" element={<ClubOwnerDashboard />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </PersistGate>
    // </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);