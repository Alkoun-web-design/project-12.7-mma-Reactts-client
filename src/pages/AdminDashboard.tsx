import React, { useState, useEffect } from 'react';
// import { FileText, BookOpen, Users, Calendar, UserCog, BookDown, Home, FileQuestion } from 'lucide-react';
import { handleGetData, handleDeleteData, handleAddOrUpdateData, handleFormChange } from '../components/Utilities'
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
import type { Admin, CounsellorMember, Tutor } from '../types/types'


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

// Types for fetched data
interface Subject { id: number; name: string; level: string; }

interface User { 
  id: number;  
  email: string; 
  password?: string;
  user_type: "admin" | "tutor" | "counsellor";
}

interface Schedule { 
  id: number; 
  subject_id: number;
  tutor_id: number;
  timing: string; 
  timeframe: string;
  description: string;
  status: "Now Enrolling" | "Starting Next Month" | "Enrollment Closed";
}

type FaqItem = {
  id: number;
  question: string;
  answer: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  created_at?: string;
  updated_at?: string;
}

interface TestPrepOption {
  id: number;
  test: string;
  description: string;
  format: string;
  duration: string;
  features: string[];
  is_active: boolean;
}

const AdminDashboard: React.FC = () => {

  const blankUsersForm = { email: '', password: '', user_type: '' };
  const blankTutorsForm = { name: '', bio: '', education: '', subject_speciality: '', teaching_style: '', languages: '', work_experience: '', certifications: '', achievements: '', avatar_url: '', email: '' };
  const blankAdminsForm = { name: '', bio: '', education: '', languages: '', work_experience: '', certifications: '', achievements: '', avatar_url: '', email: '' }
  const blankCounsellorsForm = { id: 0, name: '', bio: '', education: '', languages: '', work_experience: '', certifications: '', achievements: '', avatar_url: '', email: '' }
  const blankScheduleForm = { subject_id: '', teacher_id: '', timing: '', timeframe: '' };
  const blankSubjectForm = { name: '', level: '' };
  const blankTestimonialForm = { student_name: '', testimonial: '', service_id: '' };
  const blankLanguageForm = { name: '', code: '', is_active: true };
  const blankEducationalServiceForm = { name: '', service_key: '', short_description: '', details: '', is_active: true };
  const blankFaqForm = { question: '', answer: '', category_id: 0 };
  const blankStudentActivityForm = { question: '', answer: '', category_id: 0 };
  const blankTestPrepForm = { question: '', answer: '', category_id: 0 };
  const blankCoachingAreaForm = { question: '', answer: '', category_id: 0 };
  const blankPricingPlanForm = { question: '', answer: '', category_id: 0 };
  const blankServicePricingForm = { question: '', answer: '', category_id: 0 };
  const blankAcademicResourceForm = { question: '', answer: '', category_id: 0 };

    // Dashboard Settings
  const [selectedTab, setSelectedTab] = useState('pages');
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [counsellors, setCounsellors] = useState<CounsellorMember[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [studentActivities, setStudentActivities] = useState<any[]>([]);
  const [coachingAreas, setCoachingAreas] = useState<any[]>([]);
  const [pricingPlans, setPricingPlans] = useState<any[]>([]);
  const [servicePricing, setServicePricing] = useState<any[]>([]);
  const [academicResources, setAcademicResources] = useState<any[]>([]);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [educationalServices, setEducationalServices] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);  
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [testPrepOptions, setTestPrepOptions] = useState<TestPrepOption[]>([]);

  const [loading, setLoading] = useState(false);


  // States for forms and Ids
  const [usersForm, setUsersForm] = useState<any>(blankUsersForm);
  const [userId, setUserId] = useState<number | null>(null);
  const [adminForm, setAdminForm] = useState<any>(blankAdminsForm);
  const [adminId, setAdminId] = useState<number | null>(null);
  const [tutorForm, setTutorForm] = useState<any>(blankTutorsForm);
  const [tutorId, setTutorId] = useState<number | null>(null);
  const [counsellorForm, setCounsellorForm] = useState<any>(blankCounsellorsForm);
  const [counsellorId, setCounsellorId] = useState<number | null>(null);
  const [faqForm, setFaqForm] = useState<any>(blankFaqForm);
  const [faqId, setFaqId] = useState<number | null>(null);
  const [educationalServiceForm, setEducationalServiceForm] = useState<any>(blankEducationalServiceForm);
  const [educationalServiceId, setEducationalServiceId] = useState<number | null>(null);
  const [languageForm, setLanguageForm] = useState<any>(blankLanguageForm);
  const [languageId, setLanguageId] = useState<number | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<any>(blankTestimonialForm);
  const [testimonialId, setTestimonialId] = useState<number | null>(null);
  const [subjectForm, setSubjectForm] = useState<any>(blankSubjectForm);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [scheduleForm, setScheduleForm] = useState<any>(blankScheduleForm);
  const [scheduleId, setScheduleId] = useState<number | null>(null);
  const [studentActivityForm, setStudentActivityForm] = useState<any>(blankStudentActivityForm);
  const [studentActivityId, setStudentActivityId] =useState<number | null>(null);
  const [testPrepForm, setTestPrepForm] = useState<any>(blankTestPrepForm);
  const [testPrepId, setTestPrepId] = useState<number | null>(null); 
  const [coachingAreaForm, setCoachingAreaForm] = useState<any>(blankCoachingAreaForm);
  const [coachingAreaId, setCoachingAreaId] = useState<number | null>(null);
  const [pricingPlanForm, setPricingPlanForm] = useState<any>(blankPricingPlanForm);
  const [pricingPlanId, setPricingPlanId] = useState<number | null>(null); 
  const [servicePricingForm, setServicePricingForm] = useState<any>(blankServicePricingForm);  
  const [servicePricingId, setServicePricingId] = useState<number | null>(null); 
  const [academicResourceForm, setAcademicResourceForm] = useState<any>(blankAcademicResourceForm);  
  const [academicResourceId, setAcademicResourceId] = useState<number | null>(null); 

  useEffect(() => {
    // Fetch all data
    handleGetData('subjects', setSubjects, setLoading);
    handleGetData('users', setUsers, setLoading);
    handleGetData('admins', setAdmins, setLoading);
    handleGetData('tutors', setTutors, setLoading);
    handleGetData('counsellors', setCounsellors, setLoading);
    handleGetData('schedules', setSchedules, setLoading);
    handleGetData('educational-services', setEducationalServices, setLoading);
    handleGetData('languages', setLanguages, setLoading);
    handleGetData('student-testimonials', setTestimonials, setLoading);
    handleGetData('faqs', setFaqs, setLoading);
    handleGetData('standardized-test-prep', setTestPrepOptions, setLoading);
    handleGetData('student-activities', setStudentActivities, setLoading );  
    handleGetData('coaching-areas', setCoachingAreas, setLoading );  
    handleGetData('pricing-plans', setPricingPlans, setLoading );  
    handleGetData('service-pricing', setServicePricing, setLoading );  
    handleGetData('academic-resources', setAcademicResources, setLoading );  

  }, []);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {loading ? <div className="text-gray-900 mb-2">Loading...</div> : (
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
            data={faqs}
            form={faqForm}
            id={faqId}
            setForm={setFaqForm}
            setId={setFaqId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setFaqForm, faqForm)}
            // handleEdit={handleEdit}
            handleSubmit={(e:React.FormEvent) =>handleAddOrUpdateData(e, faqId, setFaqId, 'faqs', setFaqForm, faqForm, blankFaqForm, setFaqs )}
            handleDelete={(id:number) => handleDeleteData(id, 'faqs', setFaqs)}
          />
        )}
        {selectedTab === 'subjects' && (
          <SubjectsAdminSection
            data={subjects}
            form={subjectForm}
            id={subjectId}
            setForm={setSubjectForm}
            setId={setSubjectId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setSubjectForm, subjectForm)}
            handleSubmit={(e:React.FormEvent) => handleAddOrUpdateData(e, subjectId, setSubjectId, 'subjects', setSubjectForm, subjectForm, blankSubjectForm, setSubjects )}
            handleDelete={(id:number) => handleDeleteData(id, 'subjects', setSubjects)}
          />
        )}
        {selectedTab === 'admins' && (
          <AdminAdminSection
            data={admins}
            form={adminForm}
            id={adminId}
            setForm={setAdminForm}
            setId={setAdminId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setAdminForm, adminForm)}
            handleSubmit={(e:React.FormEvent) => handleAddOrUpdateData(e, adminId, setAdminId, 'admins', setAdminForm, adminForm, blankAdminsForm, setAdminForm)}
            handleDelete={(id:number) => handleDeleteData(id, 'admins', setAdmins)}
          />
        )}
        {selectedTab === 'tutors' && (
          <TutorAdminSection
            data={tutors}
            form={tutorForm}
            id={tutorId}
            setForm={setTutorForm}
            setId={setTutorId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setTutorForm, tutorForm)}
            handleSubmit={(e:React.FormEvent) => handleAddOrUpdateData(e, tutorId, setTutorId, 'tutors', setTutorForm, tutorForm, blankTutorsForm, setTutors )}
            handleDelete={(id:number) => handleDeleteData(id, 'tutors', setTutors)}
          />
        )}
        {selectedTab === 'counsellors' && (
          <CounsellorAdminSection
            data={counsellors}
            form={counsellorForm}
            id={counsellorId}
            setForm={setCounsellorForm}
            setId={setCounsellorId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setCounsellorForm, counsellorForm)}
            handleSubmit={(e:React.FormEvent) => handleAddOrUpdateData(e, counsellorId, setCounsellorId, 'counsellors', setCounsellorForm, counsellorForm, blankCounsellorsForm, setCounsellors )}
            handleDelete={(id:number) => handleDeleteData(id, 'counsellors', setCounsellors)}
          />
        )}
        {selectedTab === 'schedule' && (
          <SchedulesAdminSection
            data={schedules}
            form={scheduleForm}
            id={scheduleId}
            setForm={setScheduleForm}
            setId={setScheduleId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setScheduleForm, scheduleForm)}
            handleSubmit={(e:React.FormEvent) => handleAddOrUpdateData(e, scheduleId, setScheduleId, 'schedules', setScheduleForm, scheduleForm, blankScheduleForm, setSchedules )}
            handleDelete={(id) => handleDeleteData(id, 'schedules', setSchedules)}
          />
        )}
        {selectedTab === 'educational-services' && (
          <EducationalServicesAdminSection
            data={educationalServices}
            form={educationalServiceForm}
            id={educationalServiceId}
            setForm={setEducationalServiceForm}
            setId={setEducationalServiceId}
            // handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setLanguageForm, languageForm)}
            // handleEdit={handleEdit}
            handleSubmit={(e:React.FormEvent) => handleAddOrUpdateData(e, educationalServiceId, setEducationalServiceId, 'educational-services', setEducationalServices, educationalServiceForm, blankEducationalServiceForm, setEducationalServices)}
            handleDelete={(id) => handleDeleteData(id, 'educational-services', setEducationalServices)}
          />
        )}
        {selectedTab === 'languages' && (
          <LanguagesAdminSection
            data={languages}
            form={languageForm}
            id={languageId}
            setForm={setLanguageForm}
            setId={setLanguageId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setLanguageForm, languageForm)}
            handleSubmit={(e:React.FormEvent) =>handleAddOrUpdateData(e, languageId, setLanguageId, 'languages', setLanguageForm, languageForm, blankLanguageForm, setLanguages )}
            handleDelete={(id) => handleDeleteData(id, 'languages', setLanguages)}
          />
        )}
        {selectedTab === 'testimonials' && (
          <TestimonialsAdminSection
            data={testimonials}
            form={testimonialForm}
            id={testimonialId}
            setForm={setTestimonialForm}
            setId={setTestimonialId}
            handleSubmit={(e:React.FormEvent) =>handleAddOrUpdateData(e, testimonialId, setTestimonialId, 'testimonials', setTestimonialForm, testimonialForm, blankTestimonialForm, setTestimonials )}
            handleDelete={(id) => handleDeleteData(id, 'testimonials', setTestimonials)}
          />
        )}
        {selectedTab === 'standardized-test-prep' && (
          <StandardizedTestPrepAdminSection
            data={testPrepOptions}
            form={testPrepForm}
            id={testPrepId}
            setForm={setTestPrepForm}
            setId={setTestPrepId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setTestPrepForm, testPrepForm)}
            handleSubmit={(e:React.FormEvent) =>handleAddOrUpdateData(e, testPrepId, setTestPrepId, 'standardized-test-rep', setTestPrepForm, testPrepForm, blankTestPrepForm, setTestPrepOptions )}
            handleDelete={(id:number) => handleDeleteData(id, 'standardized-test-prep', setTestPrepOptions)}
          />
        )}
        {selectedTab === 'academic-resources' && (
          <AcademicResourcesAdminSection
            data={academicResources}
            form={academicResourceForm}
            id={academicResourceId}
            setForm={setAcademicResourceForm}
            setId={setAcademicResourceId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setAcademicResourceForm, academicResourceForm)}
            handleSubmit={(e:React.FormEvent) =>handleAddOrUpdateData(e, academicResourceId, setAcademicResourceId, 'academic-resources', setAcademicResourceForm, academicResourceForm, blankAcademicResourceForm, setAcademicResources )}
            handleDelete={(id:number) => handleDeleteData(id, 'academic-resources', setAcademicResources)}
          />
        )}
        {selectedTab === 'student-activities' && (
          <StudentActivitiesAdminSection
            data={studentActivities}
            form={studentActivityForm}
            id={studentActivityId}
            setForm={setStudentActivityForm}
            setId={setStudentActivityId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setStudentActivityForm, studentActivityForm)}
            handleSubmit={(e:React.FormEvent) => handleAddOrUpdateData(e, studentActivityId, setStudentActivityId, 'student-activities', setStudentActivityForm, studentActivityForm, blankStudentActivityForm, setStudentActivities )}
            handleDelete={(id:number) => handleDeleteData(id, 'student-activities', setStudentActivities)}
          />
        )}
        {selectedTab === 'coaching-areas' && (
          <StudyCoachingAdminSection
            data={coachingAreas}
            form={coachingAreaForm}
            id={coachingAreaId}
            setForm={setCoachingAreaForm}
            setId={setCoachingAreaId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setCoachingAreaForm, coachingAreaForm)}
            handleSubmit={(e:React.FormEvent) => handleAddOrUpdateData(e, coachingAreaId, setCoachingAreaId, 'coaching-areas', setCoachingAreaForm, coachingAreaForm, blankCoachingAreaForm, setCoachingAreas )}
            handleDelete={(id:number) => handleDeleteData(id, 'coaching-areas', setCoachingAreas)}
          />
        )}
        {selectedTab === 'pricing-plans' && (
          <PricingAdminSection
            data={pricingPlans}
            form={pricingPlanForm}
            id={pricingPlanId}
            setForm={setPricingPlanForm}
            setId={setPricingPlanId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setPricingPlanForm, pricingPlanForm)}
            handleSubmit={(e:React.FormEvent) => handleAddOrUpdateData(e, pricingPlanId, setPricingPlanId, 'pricing-plans', setPricingPlanForm, pricingPlanForm, blankPricingPlanForm, setPricingPlans )}
            handleDelete={(id:number) => handleDeleteData(id, 'pricing', setPricingPlans)}
          />
        )}
        {selectedTab === 'service-pricing' && (
          <ServicePricingAdminSection
            data={servicePricing}
            form={servicePricingForm}
            id={servicePricingId}
            setForm={setServicePricingForm}
            setId={setServicePricingId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setServicePricingForm, servicePricingForm)}
            handleSubmit={(e:React.FormEvent) => handleAddOrUpdateData(e, servicePricingId, setServicePricingId, 'pricing-plans', setServicePricingForm, servicePricingForm, blankServicePricingForm, setServicePricing )}
            handleDelete={(id:number) => handleDeleteData(id, 'service-pricing', setServicePricing)}
          />
        )}
        {selectedTab === 'users' && (
          <UsersAdminSection
            data={users}
            form={usersForm}
            id={userId}
            setForm={setUsersForm}
            setId={setUserId}
            handleFormChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFormChange(e, setUsersForm, usersForm)}
            handleSubmit={(e:React.FormEvent) => handleAddOrUpdateData(e, userId, setUserId, 'users', setUsersForm, usersForm, blankUsersForm, setUsers )}
            handleDelete={(id:number) => handleDeleteData(id, 'users', setUsers)}
          />
        )}
        {/* {selectedTab === 'users' && (
          <AdminDataSection
            title={selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
            apiEndpoint={selectedTab}
            blankForm={blankUsersForm}
          />
        )} */}
      </main>
    </>)}
    </div>
  );
};

export default AdminDashboard;
