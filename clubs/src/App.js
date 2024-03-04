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

import ClubsList from "./pages/ClubsList.js";
import AdminLogin from "./pages/Admin/AdminLogin.js";
import AdminHome from "./pages/Admin/AdminHome.js";
import ClubDashboard, {CLubDashboard} from './pages/ResponsableClub/ClubDashboard';
import StudentList from "./pages/Admin/StudentsList.js";
import ClubCreationRequests from "./pages/Admin/ClubCreationRequests.js";
import AdminClubsList from "./pages/Admin/AdminClubsList.js";
import RequestFinance from "./pages/Admin/RequestFinance.js";
import AddClub from "./pages/Admin/AddClub.js";
import CreateClubApplication from "./pages/Etudiant/CreateClubApplication.js";
import News from "./pages/Etudiant/News.js";
import Events from "./pages/Etudiant/Events.js";
import Notifications from "./pages/Etudiant/Notifications.js";
import ClubMemebers from "./pages/ResponsableClub/ClubMemebers.js";
import PostNews from "./pages/ResponsableClub/PostNews.js";
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
          <Route path="student-dashboard/clubs" element={<ClubsList />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<AdminLogin />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin/admin-dashboard" element={<AdminHome />} />
          <Route path="admin/admin-dashboard/students" element={<StudentList />} />
          <Route path="admin/admin-dashboard/finance" element={<RequestFinance />} />
          <Route path="admin/admin-dashboard/clubs" element={<AdminClubsList />} />
          <Route path="admin/admin-dashboard/club-creation-requests" element={<ClubCreationRequests />} />
          <Route path="admin-dashboard/add-club" element={<AddClub />} />
          <Route path="student-dashboard" element={<StudentDashboard /> } />
          <Route path="student-dashboard/news" element={<News />} />
          <Route path="student-dashboard/events" element={<Events />} />
          <Route path="student-dashboard/create-club-application" element={<CreateClubApplication />} />
          <Route path="student-dashboard/notifications" element={<Notifications />} />
          <Route path="club-dashboard" element={<ClubDashboard   />} />
          <Route path="club-dashboard/members" element={<ClubMemebers />} />7
          <Route path={'club-dashboard/post-news/:clubId'} element={<PostNews />} />

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