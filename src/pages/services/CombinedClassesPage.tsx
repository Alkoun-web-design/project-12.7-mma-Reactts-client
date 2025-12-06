import React from 'react';
import PageHeader from '../../components/PageHeader';
import SignupForm from '../../components/SignupForm';
import { useQuery } from '@tanstack/react-query';
import { queryPageContent, queryData } from '../../components/Utilities';

interface ClassroomSchedule {
  id: number;
  subject_name: string;
  tutor_name: string;
  timing: string;
  description: string;
  status: 'Now Enrolling' | 'Starting Next Month' | 'Enrollment Closed';
  timeframe: string;
}

// interface Testimonial {
//   id: number;
//   student_name: string;
//   testimonial: string;
//   success_stories?: string;
// }

const CombinedClassesPage: React.FC = () => {

  const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery({
      queryKey: ['combined-classes'], 
      queryFn: () => queryPageContent('combined-classes'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: schedules, isLoading: schedulesLoading, error: schedulesError } = useQuery({
      queryKey: ['schedules'], 
      queryFn: () => queryData('schedules'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
  });

  // const { data: testimonials, isLoading: testimonialsLoading, error: testimonialsError } = useQuery({
  //     queryKey: ['testimonials'], 
  //     queryFn: () => queryData('student-testimonials'),
  //     staleTime: 6 * 60 * 60 * 1000, 
  //     gcTime: 24 * 60 * 60 * 1000,
  //     refetchInterval: 6 * 60 * 60 * 1000,
  // });

  const formFields = [
    { name: "studentName", label: "Student Name", type: "text", required: true },
    { name: "studentAge", label: "Student Age", type: "number", required: true },
    { name: "grade", label: "Current Grade Level", type: "select", required: true, options: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "College"] },
    { name: "classInterest", label: "Class Interested In", type: "text", required: true },
    { name: "goalDescription", label: "Learning Goals", type: "textarea", required: true },
    { name: "parentName", label: "Parent/Guardian Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "preferredSchedule", label: "Preferred Schedule", type: "text" },
    { name: "additionalInfo", label: "Additional Information", type: "textarea" }
  ];


  return (
    <div>
      { pageContentLoading &&
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading Page...</p>
          </div>
        </div>
      }

      { pageContentError && 
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="mt-4 text-lg text-red-500">Error loading page.</p>
          </div>
        </div>
      }

      {  pageContent &&
        <>
      <PageHeader 
        title={pageContent.main_title}
        subtitle={pageContent.main_subtitle}
        imageUrl={pageContent.main_background_image}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="section-title">{pageContent.second_title}</h2>
          <div className="prose text-gray-700 max-w-none">
            <p className="mb-4">
              {pageContent.second_subtitle}
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.third_title}</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              {JSON.parse(pageContent.third_details).map((content: {description: string}, index: number) => (
                <li key={index}>{content.description}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fourth_title}</h3>
            <p className="mb-4">
              {pageContent.fourth_subttile}
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              {JSON.parse(pageContent.fourth_details).map((content: {description: string}, index: number) => (
                <li key={index}>{content.description}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <SignupForm 
            title="Register for a Class"
            description="Complete this form to enroll in one of our group classes."
            fields={formFields}
            serviceType="Combined Classes"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="section-title text-center mb-8">{pageContent.fifth_title}</h2>
          {schedulesLoading && <div className="text-center text-gray-400">Loading...</div>}
          {schedulesError && <div className="text-center text-red-500">Error loading scheduled classes.</div>}
          {schedules &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map((schedule:ClassroomSchedule) => (
              <div key={schedule.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-primary-600">{schedule.subject_name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      schedule.status === 'Now Enrolling' ? 'bg-green-100 text-green-800' :
                      schedule.status === 'Starting Next Month' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {schedule.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{schedule.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Teacher:</span> {schedule.tutor_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Schedule:</span> {schedule.timing}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Duration:</span> {schedule.timeframe}
                    </p>
                  </div>
                </div>
                {/* <div className="bg-gray-50 px-6 py-4">
                  <button
                    className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    onClick={() => {
                      // Scroll to the signup form
                      document.querySelector('#signup-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Register Now
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        }
      </div>
      
      {/* <div className="bg-primary-50 p-8 rounded-2xl mb-16">
        <h2 className="section-title">{pageContent.sixth_title}</h2>
          {testimonialsLoading && <div className="text-center text-gray-400">Loading...</div>}
          {testimonialsError && <div className="text-center text-red-500">Error loading testimonials.</div>}
          {testimonials &&
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial:Testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={`https://picsum.photos/200/300?random=${testimonial.id}`} 
                    alt="Student" 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.student_name}</p>
                    <p className="text-sm text-gray-500">Student</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div> */}
      </>
      }
    </div>
  );
};

export default CombinedClassesPage; 