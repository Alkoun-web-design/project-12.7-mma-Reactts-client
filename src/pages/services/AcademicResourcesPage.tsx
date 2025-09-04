import React from 'react';
import PageHeader from '../../components/PageHeader';
import SignupForm from '../../components/SignupForm';
import { BookOpen, Video, Download, FileText, HeadphonesIcon, FileQuestion } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { queryData, queryPageContent } from '../../components/Utilities';

interface ResourceCategory {
  id: number;
  category_title: string;
  description: string;
  icon: string;
  features: string[];
}


const AcademicResourcesPage: React.FC = () => {

  const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery({
      queryKey: ['academic-resources'], 
      queryFn: () => queryPageContent('academic-resources'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: resourceCategories, isLoading: resourcesLoading, error: resourcesError } = useQuery({
      queryKey: ['resource-categfories'], 
      queryFn: () => queryData('academic-resources'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
  });

  const formFields = [
    { name: "name", label: "Your Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "role", label: "I am a", type: "select", required: true, options: [
      "Student", "Parent", "Teacher", "School Administrator", "Other"
    ]},
    { name: "gradeLevel", label: "Grade Level (if applicable)", type: "select", options: [
      "Elementary", "Middle School", "High School", "College", "N/A"
    ]},
    { name: "resourceInterest", label: "Resources of Interest", type: "select", required: true, options: [
      "Study Materials", "Practice Tests", "Digital Library", "Educational Videos", 
      "Interactive Learning Tools", "Printable Worksheets", "Multiple Resources"
    ]},
    { name: "subjects", label: "Subject Areas", type: "text" },
    { name: "specificNeeds", label: "Specific Resource Needs", type: "textarea" },
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Error loading academic resources</p>
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
            
            
            <div className="space-y-4 mb-6">
              {pageContent.third_details.map((content :{description:string, heading:string, price:string}, index:number) => (
                <div key={index} className="bg-primary-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">{content.heading}</h4>
                  <p className="text-gray-700">
                    {content.description}
                  </p>
                  <p className="text-primary-600 font-medium mt-1">{content.price}</p>
                </div>
              ))}  
              
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fourth_title}</h3>
            <p className="mb-4">
              {pageContent.fourth_subtitle}
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              {pageContent.fourth_details.map((content: {description:string}, index:number) => (
                <li key={index}>{content.description}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <SignupForm 
            title="Access Academic Resources"
            description="Complete this form to learn more about our academic resources and how to access them for your educational needs."
            fields={formFields}
            serviceType="Academic Resources"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="section-title text-center mb-8">{pageContent.fifth_title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourcesLoading && <div>Loading...</div>}
          {resourcesError && <div className='text-red-500'>Error Loading.</div>} 
          {resourceCategories && resourceCategories.map((category:ResourceCategory) => (
            <div key={category.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow h-full">
              <div className="mb-4">
                {/* Map icon names to actual components */}
                {category.icon === 'BookOpen' && <BookOpen size={40} className="text-primary-500" />}
                {category.icon === 'Video' && <Video size={40} className="text-primary-500" />}
                {category.icon === 'Download' && <Download size={40} className="text-primary-500" />}
                {category.icon === 'FileText' && <FileText size={40} className="text-primary-500" />}
                {category.icon === 'HeadphonesIcon' && <HeadphonesIcon size={40} className="text-primary-500" />}
                {category.icon === 'FileQuestion' && <FileQuestion size={40} className="text-primary-500" />}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.category_title}</h3>
              <p className="text-gray-700 mb-4">{category.description}</p>
              <h4 className="font-medium text-gray-900 mb-2">Includes:</h4>
              <ul className="space-y-1">
                {category.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-primary-50 p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{pageContent.sixth_title}</h2>
          <p className="text-gray-700 mb-4">
            {pageContent.sixth_subtitle}
          </p>
          <ul className="space-y-2">
            {pageContent.sixth_details.map((content: {description:string}, index:number) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span className="text-gray-700">{content.description}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6">
            <a href="#signup-form" className="btn btn-primary">
              Get Student Access
            </a>
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{pageContent.seventh_title}</h2>
          <p className="text-gray-700 mb-4">
            {pageContent.seventh_subtitle}
          </p>
          <ul className="space-y-2">
            {pageContent.seventh_details.map((content :{description:string}, index:number) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span className="text-gray-700">{content.description}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6">
            <a href="#signup-form" className="btn bg-gray-700 hover:bg-gray-800 text-white">
              Educator Resources
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-16">
        <h2 className="section-title">{pageContent.eighth_title}</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          {pageContent.eighth_subtitle}
        </p>
        <a href="#signup-form" className="btn btn-primary inline-block">
          Sign Up for Access
        </a>
      </div>
      </>
    }
       
    </div>
  );
};

export default AcademicResourcesPage;