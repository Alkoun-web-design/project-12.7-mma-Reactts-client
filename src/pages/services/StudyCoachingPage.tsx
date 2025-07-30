// StudyCoachingPage.tsx
import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import SignupForm from '../../components/SignupForm';
import { CoachingAreaSkeleton } from '../../components/SkeletonLoaders';
import { useQuery } from '@tanstack/react-query';
import { queryData, queryPageContent } from '../../components/Utilities';

interface CoachingArea {
  id: number;
  title: string;
  description: string;
  benefits: string[];
  logo: string | null;
}

interface Testimonial {
  id: number;
  student_name: string;
  testimonial: string;
  success_stories?: string;
}

interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const StudyCoachingPage: React.FC = () => {
  const formFields = [
    { name: "studentName", label: "Student Name", type: "text", required: true },
    { name: "studentAge", label: "Student Age", type: "number", required: true },
    { name: "grade", label: "Current Grade Level", type: "select", required: true, options: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "College"] },
    { name: "coachingType", label: "Type of Coaching Needed", type: "select", required: true, options: [
      "Study Skills Development", "Time Management", "Academic Counseling", "Test Anxiety Support", 
      "Organization Skills", "College Planning", "Career Exploration", "Comprehensive Support"
    ]},
    { name: "currentChallenges", label: "Current Academic Challenges", type: "textarea", required: true },
    { name: "parentName", label: "Parent/Guardian Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "additionalInfo", label: "Additional Information", type: "textarea" }
  ];

  // State for success stories and other components
  const [expandedFeatures, setExpandedFeatures] = useState<Record<number, boolean>>({});

  const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery({
    queryKey: ['study-coaching'], 
    queryFn: () => queryPageContent('study-coaching'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: faqs, isLoading: faqsLoading, error: faqsError } = useQuery({
    queryKey: ['faqs'], 
    queryFn: () => queryData('faqs'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: coachingAreas, isLoading: coachingAreasLoading, error: coachingAreasError } = useQuery({
    queryKey: ['coaching-areas'], 
    queryFn: () => queryData('coaching-areas'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: testimonials, isLoading: testimonialsLoading, error: testimonialsError } = useQuery({
    queryKey: ['testimnoials'], 
    queryFn: () => queryData('student-testimonials'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

    if (!faqs) return null; 
  // Toggle function for expanding features
  const toggleFeatures = (id: number) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
            
            <ol className="list-decimal pl-6 space-y-4 mb-6">
              {pageContent.third_details.map((content, index:number) => (
                <li key={index}>
                  <strong className="text-gray-900">{content.heading}</strong>
                  <p className="mt-1">{content.description}</p>
                </li>
              ))}
            </ol>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fourth_title}</h3>
            <p className="mb-4">
              {pageContent.fourth_subtitle}
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mb-6">
              {pageContent.fourth_details.map((content, index:number) => (
                <li key={index}>{content.description}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fifth_title}</h3>
            <p className="mb-4">
              {pageContent.fifth_subtitle}
            </p>
          </div>
        </div>
        
        <div>
          <SignupForm 
            title="Request Study Coaching"
            description="Complete this form to learn more about our study coaching programs and schedule an initial consultation."
            fields={formFields}
            serviceType="Study Coaching"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="section-title text-center mb-8">{pageContent.sixth_title}</h2>

        {coachingAreasLoading && 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CoachingAreaSkeleton />
            <CoachingAreaSkeleton />
            <CoachingAreaSkeleton />
            <CoachingAreaSkeleton />
            <CoachingAreaSkeleton />
            <CoachingAreaSkeleton />
          </div>}
        {coachingAreasError && <div className="text-center text-red-500">Error loading coaching areas.</div>}
        {coachingAreas &&
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coachingAreas.map((area:CoachingArea) => (
              <div key={area.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary-600 mb-3">{area.title}</h3>
                  <p className="text-gray-700 mb-4">{area.description}</p>
                  <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {area.benefits.slice(0, expandedFeatures[area.id] ? undefined : 3).map((benefit:string, i:number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {area.benefits.length > 3 && (
                    <button
                      onClick={() => toggleFeatures(area.id)}
                      className="mt-4 text-sm text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      {expandedFeatures[area.id] ? 'Show less' : `Show ${area.benefits.length - 3} more`}
                      <svg 
                        className={`w-4 h-4 ml-1 transition-transform ${expandedFeatures[area.id] ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      
      <div className="bg-primary-50 p-8 rounded-2xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{pageContent.seventh_title}</h2>
            {testimonialsLoading && <div className="text-center text-gray-400">Loading...</div>}
            {testimonialsError && <div className="text-center text-red-500">Error loading testimonials.</div>}
            {testimonials &&
              <div className="space-y-6">
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
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{pageContent.eighth_title}</h2>
            <div className="space-y-4">
              {faqsLoading && <div className="text-center text-gray-400">Loading...</div>}
              {faqsError && <div className="text-center text-red-500">Error loading faqs.</div>}
              {faqs &&
                faqs.map((faq:Faq, index:number) => (
                  faq.category === 'Study Coaching' ? 
                  (<div key={index}>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{faq.question}</h3>
                    <p className="text-gray-700">
                      {faq.answer}
                    </p>
                  </div>) :  null
                )) 
              }
              
            </div>
          </div>
        </div>
      </div>
      </>
      }
    </div>
  );
};

export default StudyCoachingPage;