import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import SignupForm from '../../components/SignupForm';
import { TestPrepOptionSkeleton } from '../../components/SkeletonLoaders';
import { useQuery } from '@tanstack/react-query';
import { queryData, queryPageContent } from '../../components/Utilities';

interface TestPrepOption {
  id: number;
  test: string;
  description: string;
  format: string;
  duration: string;
  features: string[];
  is_active: boolean;
}

interface Testimonial {
  id: number;
  student_name: string;
  testimonial: string;
  success_stories: string;
}

const StandardizedTestPrepPage: React.FC = () => {

  const [expandedFeatures, setExpandedFeatures] = useState<Record<number, boolean>>({});

  const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery({
    queryKey: ['standardized-test-prep'], 
    queryFn: () => queryPageContent('standardized-test-prep'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: testPrepOptions, isLoading: testPrepOptionsLoading, error: testPrepOptionsError } = useQuery({
    queryKey: ['test-prep-options'], 
    queryFn: () => queryData('standardized-test-prep'),
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

  const formFields = [
    { name: "studentName", label: "Student Name", type: "text", required: true },
    { name: "studentAge", label: "Student Age", type: "number", required: true },
    { name: "grade", label: "Current Grade Level", type: "select", required: true, options: ["8", "9", "10", "11", "12", "College"] },
    { name: "testType", label: "Test Type", type: "select", required: true, options: [
      "SAT", "ACT", "AP Exams", "SAT Subject Tests", "GRE", "GMAT", "LSAT", "MCAT", "State Standardized Tests", "Other"
    ]},
    { name: "specificTest", label: "Specific Test (if AP or other)", type: "text" },
    { name: "testDate", label: "Planned Test Date (if known)", type: "date" },
    { name: "parentName", label: "Parent/Guardian Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "currentScores", label: "Current Scores (if any)", type: "text" },
    { name: "goalScores", label: "Goal Scores", type: "text" },
    { name: "additionalInfo", label: "Additional Information", type: "textarea" }
  ];

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
            <ul className="list-disc pl-6 space-y-2 mb-6">
              {pageContent.fourth_details.map((content, index:number) => (
                <li key={index}>{content.description}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fifth_title}</h3>
            <p className="mb-4">
              {pageContent.fifth_subtitle}
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              {pageContent.fifth_details.map((content, index:number) => (
                <li key={index}><strong>{content.heading}</strong> {content.description}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <SignupForm 
            title="Register for Test Prep"
            description="Complete this form to learn more about our test preparation programs and schedule an initial consultation."
            fields={formFields}
            serviceType="Standardized Test Prep"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="section-title text-center mb-8">{pageContent.sixth_title}</h2>
        
        {testPrepOptionsLoading && 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TestPrepOptionSkeleton />
            <TestPrepOptionSkeleton />
            <TestPrepOptionSkeleton />
            <TestPrepOptionSkeleton />
          </div>
        }
        {testPrepOptionsError && <div className="text-center text-red-500">Error loading test prep options.</div>}
        {testPrepOptions && 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testPrepOptions.map((option:TestPrepOption) => (
              <div key={option.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-primary-600 text-white px-6 py-4">
                  <h3 className="text-xl font-semibold">{option.test} Preparation</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{option.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Format</p>
                      <p className="text-gray-800">{option.format}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="text-gray-800">{option.duration}</p>
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {option.features.slice(0, expandedFeatures[option.id] ? undefined : 3).map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {option.features.length > 3 && (
                    <button
                      onClick={() => toggleFeatures(option.id)}
                      className="mt-4 text-sm text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      {expandedFeatures[option.id] ? 'Show less' : `Show ${option.features.length - 3} more`}
                      <svg 
                        className={`w-4 h-4 ml-1 transition-transform ${expandedFeatures[option.id] ? 'transform rotate-180' : ''}`} 
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
      
      <div className="mb-16">
        <h2 className="section-title text-center">{pageContent.seventh_title}</h2>
        {testimonialsLoading && <div className="text-center text-gray-400">Loading...</div>}
        {testimonialsError && <div className="text-center text-red-500">Error loading testimonials.</div>}
        {testimonials && 
          <div>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
              {pageContent.seventh_subtitle}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial:Testimonial, index:number) => {
                // Extract test name from testimonial if available
                const testMatch = testimonial.success_stories.match(/(SAT|ACT|AP [A-Za-z]+|GRE|GMAT|LSAT|MCAT)/);
                const testName = testMatch ? testMatch[0] : 'Standardized Test';
                
                // Extract scores if available in testimonial
                const scoreMatch = testimonial.testimonial.match(/(\d{3,4})/g);
                let beforeScore = 'N/A';
                let afterScore = 'N/A';
                
                if (scoreMatch && scoreMatch.length >= 2) {
                  beforeScore = scoreMatch[0];
                  afterScore = scoreMatch[1];
                }
                
                return (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={`https://picsum.photos/400/300?random=${testimonial.id}`} 
                        alt={testimonial.student_name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{testimonial.student_name}</h3>
                      <p className="text-primary-600 font-medium mb-3">{testName}</p>
                      
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Before</p>
                          <p className="text-lg font-semibold text-gray-900">{beforeScore}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">→</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">After</p>
                          <p className="text-lg font-semibold text-primary-600">{afterScore}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 italic">"{testimonial.testimonial}"</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        }
      </div>
      
      <div className="bg-primary-50 p-8 rounded-2xl mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{pageContent.eigth_title}</h2>
          <p className="text-gray-700 mb-6">
            {pageContent.eigth_subtitle}
          </p>
          <div className="flex justify-center">
            <a href="#signup-form" className="btn btn-primary">
              Get Started Today
            </a>
          </div>
        </div>
      </div>
      </>
    }
    </div>
  );
};

export default StandardizedTestPrepPage;