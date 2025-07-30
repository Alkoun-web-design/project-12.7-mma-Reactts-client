import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Users, HelpCircle, DollarSign, Mail, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar: React.FC = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  // const { auth } = useAuth();
  // const userAvatar = auth?.user?.avatar_url 
  //   ? `/avatars/${auth.user.avatar_url.split('/').pop()}` 
  //   : '/avatars/default.png';
  
  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };
  
  return (
    <div className="fixed top-0 left-0 z-20 w-60 h-screen bg-white shadow-md flex flex-col">
      <div className="px- py-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          {/* <GraduationCap className="text-primary-500" size={32} /> */}
          <img src="/logo3.svg" alt="Logo" className="w-full px-6" />
          {/* <div>
            <div className="font-bold text-gray-900">Mind Muscles Academy</div>
            <div className="text-xs text-gray-500">Learning Solutions</div>
          </div> */}
        </Link>
      </div>
      
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <NavLink to="/" className={({isActive}) => 
              isActive ? "sidebar-link active" : "sidebar-link"
            }>
              <Home size={18} />
              <span>Home</span>
            </NavLink>
          </li>
          
          <li>
            <button 
              onClick={toggleServices}
              className="sidebar-link w-full flex justify-between"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span className='text-left'>Educational Services</span>
              </div>
              {servicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            <AnimatePresence>
              {servicesOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pl-6 mt-1 overflow-hidden"
                >
                  {[
                    { path: "/educational-services/homeschooling", label: "Home-schooling" },
                    { path: "/educational-services/subject-tutoring/one-on-one", label: "Subject Tutoring", submenu: [
                      { path: "/educational-services/subject-tutoring/one-on-one", label: "1 on 1" },
                      { path: "/educational-services/subject-tutoring/combined-classes", label: "Combined Classes" },
                    ] },
                    { path: "/educational-services/standardized-test-prep", label: "Standardized Test Prep" },
                    { path: "/educational-services/study-coaching", label: "Study Coaching & Counselling" },
                    { path: "/educational-services/student-clubs", label: "Student Clubs & Activities" },
                    { path: "/educational-services/academic-resources", label: "Academic Resources" },
                    { path: "/educational-services/learn-languages", label: "Learn Languages" }
                  ].map((item, index) => (
                    <li key={index} className="my-1">
                      <NavLink
                        to={item.path}
                        className={({isActive}) =>
                          isActive
                            ? "block py-2 px-3 text-sm text-white bg-primary-500 rounded-lg transition-colors"
                            : "block py-2 px-3 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        }
                      >
                        {item.label}
                      </NavLink>
                      {item.submenu && (
                        <ul className="pl-6 mt-1">
                          {item.submenu.map((sub, subIdx) => (
                            <li key={subIdx} className="my-1">
                              <NavLink
                                to={sub.path}
                                className={({isActive}) =>
                                  isActive
                                    ? "block py-2 px-3 text-xs text-white bg-primary-400 rounded-lg transition-colors"
                                    : "block py-2 px-3 text-xs text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                }
                              >
                                {sub.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          
          <li>
            <NavLink to="/our-staff" className={({isActive}) => 
              isActive ? "sidebar-link active" : "sidebar-link"
            }>
              <Users size={18} />
              <span>Our Staff</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/faqs" className={({isActive}) => 
              isActive ? "sidebar-link active" : "sidebar-link"
            }>
              <HelpCircle size={18} />
              <span>FAQs</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/pricing" className={({isActive}) => 
              isActive ? "sidebar-link active" : "sidebar-link"
            }>
              <DollarSign size={18} />
              <span>Pricing</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/get-in-touch" className={({isActive}) => 
              isActive ? "sidebar-link active" : "sidebar-link"
            }>
              <Mail size={18} />
              <span>Get in Touch</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      {/* {auth?.authenticated && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <img 
              src={userAvatar}
              alt={auth.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{auth.user.name}</h4>
              <p className="text-xs text-gray-500 capitalize">{auth.user.role}</p>
            </div>
          </div>
        </div>
      )}
      {!auth?.authenticated && (
        <div className="p-4 border-t">
          <Link to="/get-in-touch" className="btn btn-primary w-full text-center flex items-center justify-center gap-2">
            <Mail size={16} />
            <span>Contact Us</span>
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default Sidebar;