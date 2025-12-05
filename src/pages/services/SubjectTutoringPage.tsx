import React from 'react';
import PageHeader from '../../components/PageHeader';
import SignupForm from '../../components/SignupForm';
import { useQuery } from '@tanstack/react-query';
import { queryData, queryPageContent } from '../../components/Utilities'

interface Subject {
  id: number;
  name: string;
  level: string;
}

interface Testimonial {
  id: number;
  student_name: string;
  testimonial: string;
  success_stories?: string;
}

const SubjectTutoringPage: React.FC = () => {

  const formFields = [
    { name: "studentName", label: "Student Name", type: "text", required: true },
    { name: "studentAge", label: "Student Age", type: "number", required: true },
    { name: "grade", label: "Current Grade Level", type: "select", required: true, options: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "College"] },
    { name: "subject", label: "Subject(s) Needed", type: "text", required: true },
    { name: "goalDescription", label: "Learning Goals", type: "textarea", required: true },
    { name: "parentName", label: "Parent/Guardian Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "preferredSchedule", label: "Preferred Schedule", type: "text" },
    { name: "additionalInfo", label: "Additional Information", type: "textarea" }
  ];
    
  const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery({
    queryKey: ['one-on-one'], 
    queryFn: () => queryPageContent('one-on-one'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: subjects, isLoading: subjectsLoading, error: subjectsError } = useQuery({
    queryKey: ['subjects'], 
    queryFn: () => queryData('subjects'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: testimonials, isLoading: testimonialsLoading, error: testimonialsError } = useQuery({
    queryKey: ['testimonials'], 
    queryFn: () => queryData('student-testimonials'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  if (!subjects) return null; 

    // Group subjects by name and collect their levels
  const groupedSubjects = subjects.reduce((acc: Record<string, Set<string>>, subject:Subject) => {
    if (!acc[subject.name]) {
      acc[subject.name] = new Set();
    }
    acc[subject.name].add(subject.level);
    return acc;
  }, {} as Record<string, Set<string>>);

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
            <p className="mb-4">
              {pageContent.third_subtitle}
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mb-6">
              {JSON.parse(pageContent.third_details).map((content:{description: string}, index:number ) => (
                <li key={index}>{content.description}</li>  
              )) }
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fourth_title}</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              {JSON.parse(pageContent.fourth_details).map((content:{description: string}, index:number ) => (
                <li key={index}>{content.description}</li>  
              )) }
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fifth_title}</h3>
            <p className="mb-4">
              {pageContent.fifth_subtitle}
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              {JSON.parse(pageContent.fifth_details).map((content:{description: string}, index:number ) => (
                <li key={index}>{content.description}</li>  
              )) }
            </ul>
          </div>
        </div>
        
        <div>
          <SignupForm 
            title="Request a Tutor"
            description="Complete this form to be matched with a tutor who specializes in your subject needs."
            fields={formFields}
            serviceType="One on One"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="section-title text-center mb-8">{pageContent.sixth_title}</h2>
        {subjectsLoading && <div className="text-center text-gray-400">Loading...</div>}
        {subjectsError && <div className="text-center text-red-500">Error loading subjects.</div>}
        {subjects &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* {Object.entries(groupedSubjects).map(([subjectName, levels], index) => ( */}
            {Object.entries(groupedSubjects).map(([subjectName], index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-primary-600 mb-4">{subjectName}</h3>
                <ul className="text-gray-700 space-y-1">
                  {/* {Array.from(levels:string).map((level, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2 text-primary-500">•</span>
                      <span>{level}</span>
                    </li>
                  ))} */}
                </ul>
              </div>
            ))}
          </div>
        }
        <p className="text-center mt-6 text-gray-600">
          {pageContent.sixth_subtitle}
        </p>
      </div>
      
      {/* <div className="bg-primary-50 p-8 rounded-2xl mb-16">
        <h2 className="section-title">{pageContent.seventh_title}</h2>
        {testimonialsLoading && <div className="text-center text-gray-400">Loading...</div>}
        {testimonialsError && <div className="text-center text-red-500">Error loading student testimonials.</div>}
        {testimonials &&
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial:Testimonial, index:number) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
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

export default SubjectTutoringPage;