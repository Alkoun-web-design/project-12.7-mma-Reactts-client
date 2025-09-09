import React, { useState } from 'react';
// import { FileText, BookOpen, Users, Calendar, UserCog, BookDown, Home, FileQuestion } from 'lucide-react';
// import { handleGetData, handleDeleteData, handleAddOrUpdateData, handleFormChange } from '../components/Utilities'
import PagesAdminSection from '../components/admin section/PagesAdminSection';
import SubjectsAdminSection from '../components/admin section/SubjectsAdminSection';
import AdminAdminSection from '../components/admin section/AdminAdminSection';
import TutorAdminSection from '../components/admin section/TutorAdminSection';
import CounsellorAdminSection from '../components/admin section/CounsellorAdminSection';
import SchedulesAdminSection from '../components/admin section/SchedulesAdminSection';
import UsersAdminSection from '../components/admin section/UsersAdminSection';
import EducationalServicesAdminSection from '../components/admin section/EducationalServicesAdminSection';
import StandardizedTestPrepAdminSection from '../components/admin section/StandardizedTestPrepAdminSection';
import StudyCoachingAdminSection from '../components/admin section/StudyCoachingAdminSection';
import StudentActivitiesAdminSection from '../components/admin section/StudentActivitiesAdminSection';
import AcademicResourcesAdminSection from '../components/admin section/AcademicResourcesAdminSection';
import LanguagesAdminSection from '../components/admin section/LanguagesAdminSection';
import TestimonialsAdminSection from '../components/admin section/TestimonialsAdminSection';
import FaqsAdminSection from '../components/admin section/FaqsAdminSection';
import PricingAdminSection from '../components/admin section/PricingAdminSection';
import ServicePricingAdminSection from '../components/admin section/ServicePricingAdminSection.';


const sidebarTabs = [
  { id: 'pages', label: 'Pages' },
  { id: 'academic-resources', label: 'Academic Resources'},
  { id: 'educational-services', label: 'Educational Services'},
  { id: 'coaching-areas', label: 'Coaching Areas'},  
  { id: 'faqs', label: 'FAQs'},
  { id: 'languages', label: 'Languages'},
  { id: 'pricing-plans', label: 'Pricing Plans'},
  { id: 'schedule', label: 'Classroom Schedule'},
  { id: 'service-pricing', label: 'Servicing Pricing' }, 
  { id: 'standardized-test-prep', label: 'Standardized Test Prep'},
  { id: 'student-activities', label: 'Student Activities'},
  { id: 'subjects', label: 'Subjects'},
  { id: 'testimonials', label: 'Testimonials'},   
  { id: 'counsellors', label: 'Counsellors'},  
  { id: 'tutors', label: 'Tutors'},
  { id: 'admins', label: 'Admins'},
  { id: 'users', label: 'Users'},
];

const AdminDashboard: React.FC = () => {

  const [selectedTab, setSelectedTab] = useState('pages');
 
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
        <>
      <aside className="w-64 bg-white border-r flex flex-col py-8 px-4">
        <div className="mb-8 text-2xl font-bold text-primary-700">Admin Dashboard</div>
        <nav className="flex flex-col gap-2">
          {sidebarTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`text-sm flex items-center px-4 py-2 rounded-lg text-left transition font-medium ${
                selectedTab === tab.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {/* {tab.icon} */}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}

      <main className="w-full flex flex-col items-center border-gray-300 border-l-1">
        {selectedTab === 'pages' && (
          <PagesAdminSection />
        )}
        {selectedTab === 'faqs' && (
          <FaqsAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'subjects' && (
          <SubjectsAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'admins' && (
          <AdminAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'tutors' && (
          <TutorAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'counsellors' && (
          <CounsellorAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'schedule' && (
          <SchedulesAdminSection
            apiEndpoint = {selectedTab}
          />
        )}
        {selectedTab === 'educational-services' && (
          <EducationalServicesAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'languages' && (
          <LanguagesAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'testimonials' && (
          <TestimonialsAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'standardized-test-prep' && (
          <StandardizedTestPrepAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'academic-resources' && (
          <AcademicResourcesAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'student-activities' && (
          <StudentActivitiesAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'coaching-areas' && (
          <StudyCoachingAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'pricing-plans' && (
          <PricingAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'service-pricing' && (
          <ServicePricingAdminSection
            apiEndpoint={selectedTab}
          />
        )}
        {selectedTab === 'users' && (
          <UsersAdminSection
            apiEndpoint={selectedTab}
          />
        )}
      </main>
    </>
    </div>
  );
};

export default AdminDashboard;
