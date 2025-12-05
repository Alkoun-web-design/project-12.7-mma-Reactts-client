import React from 'react';
import PageHeader from '../../components/PageHeader';
import SignupForm from '../../components/SignupForm';
import { useQuery } from '@tanstack/react-query';
import { queryData, queryPageContent } from '../../components/Utilities';

interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const HomeschoolingPage: React.FC = () => {
  const formFields = [
    { name: "studentName", label: "Student Name", type: "text", required: true },
    { name: "studentAge", label: "Student Age", type: "number", required: true },
    { name: "grade", label: "Current Grade Level", type: "select", required: true, options: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] },
    { name: "parentName", label: "Parent/Guardian Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "startDate", label: "Preferred Start Date", type: "date" },
    { name: "subjects", label: "Subjects of Interest", type: "text" },
    { name: "specialNeeds", label: "Any Special Learning Needs", type: "textarea" },
    { name: "additionalInfo", label: "Questions or Comments", type: "textarea" }
  ];
    
    const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery({
      queryKey: ['homeschooling'], 
      queryFn: () => queryPageContent('homeschooling'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
    });

    const { data: faqs, isLoading: faqsLoading, error: faqsError } = useQuery({
      queryKey: ['schedules'], 
      queryFn: () => queryData('schedules'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
    });

  return (
    <div>
      { pageContentLoading && 
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading Page...</p>
          </div>
        </div> }

        { pageContentError && 
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="mt-4 text-lg text-red-500">Error loading page...</p>
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
              {JSON.parse(pageContent.third_details).map((content:string, index:number) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fourth_title}</h3>
            <p className="mb-4">
              {pageContent.fourth_subtitle}
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mb-6">
              {JSON.parse(pageContent.fourth_details).map((content: {heading:string, description:string}, index:number) => (
                <li key={index}><strong>{content.heading}</strong> {content.description}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fifth_title}</h3>
            <p className="mb-4">
              {pageContent.fifth_subtitle}
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              {JSON.parse(pageContent.fifth_details).map((content: {heading:string, description:string}, index:number) => (
                <li key={index}><strong>{content.heading}</strong> {content.description}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <SignupForm 
            title="Request Home-schooling Information"
            description="Fill out the form below to learn more about our home-schooling program and how we can support your child's education."
            fields={formFields}
            serviceType="Home-schooling"
          />
        </div>
      </div>
      
      <div className="bg-primary-50 p-8 rounded-2xl mb-16">
        <h2 className="section-title">{pageContent.seventh_title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqsLoading && <div className="text-center text-gray-400">Loading...</div>}
          {faqsError && <div className="text-center text-red-500">Error loading faqs.</div>}
          {faqs &&
            faqs.map((faq:Faq, index:number) => (
              faq.category === 'Homeschooling' ? 
              (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-700">
                    {faq.answer}
                  </p>
                </div>
              ) :  null
            )) 
          }
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="section-title">{pageContent.sixth_title}</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          {pageContent.sixth_subtitle}
        </p>
        <a href="#signup-form" className="btn btn-primary inline-block">
          Get Started Today
        </a>
      </div>
      </>
      }
    </div>
  );
};

export default HomeschoolingPage;