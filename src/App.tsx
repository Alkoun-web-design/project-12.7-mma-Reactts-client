import { useState, createContext } from 'react';
import { Routes, 
  Route, 
  Outlet,
  Navigate,
  // useNavigate 
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import EducationalServices from './pages/EducationalServices';
import OurStaff from './pages/OurStaff';
import Faqs from './pages/Faqs';
import Pricing from './pages/Pricing';
import GetInTouch from './pages/GetInTouch';
import HomeschoolingPage from './pages/services/HomeschoolingPage';
import SubjectTutoringPage from './pages/services/SubjectTutoringPage';
import CombinedClassesPage from './pages/services/CombinedClassesPage';
import StandardizedTestPrepPage from './pages/services/StandardizedTestPrepPage';
import StudyCoachingPage from './pages/services/StudyCoachingPage';
import StudentActivitiesPage from './pages/services/StudentActivitiesPage';
import AcademicResourcesPage from './pages/services/AcademicResourcesPage';
import LearnLanguagesPage from './pages/services/LearnLanguagesPage';
import NotFound from './pages/NotFound';
// import SearchResults from './pages/SearchResults';
import CounsellorDashboard from './pages/CounsellorDashboard';
import TutorDashboard from './pages/TutorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TutorProfile from './pages/TutorProfile';
import CounsellorProfile from './pages/CounsellorProfile';
import AdminProfile from './pages/AdminProfile';


interface User {
  id: number;
  userType: string;
}
interface UserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContext | null>(null);

export default function App() {
const [user, setUser] = useState<User | null>(null);


  const AdminRoutes = () => { 
    return user?.userType === 'admin' ? <Outlet/> : <Navigate to='/' />
  }

  const TutorRoutes = () => { 
    return user?.userType === 'tutor' ? <Outlet/> : <Navigate to='/' />; 
  }  

  const CounsellorRoutes = () => { 
    return user?.userType === 'counsellor' ? <Outlet/> : <Navigate to='/' />; 
  }

  return (
    <UserContext.Provider value={{ user, setUser }} >
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="educational-services" element={<EducationalServices />} />
          <Route path="educational-services/homeschooling" element={<HomeschoolingPage />} />
          <Route path="educational-services/subject-tutoring" element={<SubjectTutoringPage />} />
          <Route path="educational-services/subject-tutoring/one-on-one" element={<SubjectTutoringPage />} />
          <Route path="educational-services/subject-tutoring/combined-classes" element={<CombinedClassesPage />} />
          <Route path="educational-services/standardized-test-prep" element={<StandardizedTestPrepPage />} />
          <Route path="educational-services/study-coaching" element={<StudyCoachingPage />} />
          <Route path="educational-services/student-clubs" element={<StudentActivitiesPage />} />
          <Route path="educational-services/academic-resources" element={<AcademicResourcesPage />} />
          <Route path="educational-services/learn-languages" element={<LearnLanguagesPage />} />
          <Route path="our-staff" element={<OurStaff />} />
          <Route path="tutor/:id" element={<TutorProfile />} />
          <Route path="counsellor/:id" element={<CounsellorProfile />} />
          <Route path="admin/:id" element={<AdminProfile />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="get-in-touch" element={<GetInTouch />} />
          {/* <Route path="search-results" element={<SearchResults />} /> */}
          <Route element={<AdminRoutes/>} >
            <Route path='admin-dashboard' element={<AdminDashboard />} />
          </Route>
          <Route element={<TutorRoutes/>} >
            <Route path='tutor-dashboard' element={<TutorDashboard />} />
          </Route>
          <Route element={<CounsellorRoutes/>} >
            <Route path='counsellor-dashboard' element={<CounsellorDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}