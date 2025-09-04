import React from 'react';
import PageHeader from '../../components/PageHeader';
import SignupForm from '../../components/SignupForm';
import { useQuery } from '@tanstack/react-query';
import { queryData, queryPageContent } from '../../components/Utilities';

interface StudentActivity {
  id: number;
  name: string;
  age_groups: string[];
  description: string;
  schedule: string;
  image_url: string;
  is_active: boolean;
}

const StudentActivitiesPage: React.FC = () => {

  const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery({
    queryKey: ['student-activities'], 
    queryFn: () => queryPageContent('student-activities'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: activities, isLoading: activitiesLoading, error: activitiesError } = useQuery({
    queryKey: ['activities'], 
    queryFn: () => queryData('student-activities'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const formFields = [
    { name: "studentName", label: "Student Name", type: "text", required: true },
    { name: "studentAge", label: "Student Age", type: "number", required: true },
    { name: "grade", label: "Current Grade Level", type: "select", required: true, options: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] },
    { name: "clubInterest", label: "Club Interest", type: "select", required: true, options: [
      "Debate & Public Speaking", "Robotics & Engineering", "Creative Writing", "Math Olympiad",
      "Science Explorers", "Art & Design", "Chess Club", "Coding & Game Development",
      "Environmental Club", "Model UN", "Book Club", "Multiple Clubs"
    ]},
    { name: "parentName", label: "Parent/Guardian Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "availability", label: "Availability (days/times)", type: "text" },
    { name: "studentInterests", label: "Student's Interests & Experience", type: "textarea" },
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

      { pageContent &&
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
              {pageContent.third_details.map((content: {description:string}, index:number) => (
                <li key={index}>{content.description}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fourth_title}</h3>
            <p className="mb-4">
              {pageContent.fourth_subtitles}
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mb-6">
              {pageContent.fourth_details.map((content: {heading:string, description:string}, index:number) => (
                <li key={index}><strong>{content.heading}</strong> {content.description}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fifth_title}</h3>
            <p className="mb-4">
              {pageContent.fifth_subtitle}
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              {pageContent.fifth_details.map((content: {description:string}, index:number) => (
                <li key={index}>{content.description}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <SignupForm 
            title="Club Enrollment Request"
            description="Sign up for one of our engaging student clubs. We'll contact you with information about schedules, fees, and enrollment details."
            fields={formFields}
            serviceType="Student Activities"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="section-title text-center mb-8">{pageContent.sixth_title}</h2>
        {activitiesLoading && <div className="text-center text-gray-400">Loading...</div>}
        {activitiesError && <div className="text-center text-red-500">Error loading faqs.</div>}
        {activities &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity:StudentActivity) => (
              <div key={activity.id} className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={activity.image_url} 
                    alt={activity.name} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.name}</h3>
                  <p className="text-primary-600 text-sm font-medium mb-3">
                    {Array.isArray(activity.age_groups) 
                      ? activity.age_groups.join(" • ")
                      : JSON.parse(activity.age_groups).join(" • ")}
                  </p>
                  <p className="text-gray-700 mb-4">{activity.description}</p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Schedule: </span>{activity.schedule}
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <a 
                    href="#signup-form" 
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Join this Club →
                  </a>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      
      <div className="bg-primary-50 p-8 rounded-2xl mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">{pageContent.seventh_title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageContent.seventh_details.map((content: {heading:string, description:string}, index:number) => (
              <div key={index} className="bg-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{content.heading}</h3>
                <p className="text-gray-700 mb-4">
                  {content.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center mb-16">
        <h2 className="section-title">{pageContent.eighth_title}</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          {pageContent.eighth_subtitle}
        </p>
        <a href="#signup-form" className="btn btn-primary inline-block">
          Explore Club Options
        </a>
      </div>
      </>
      }
    </div>
  );
};

export default StudentActivitiesPage;