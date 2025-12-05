import React from 'react';
import PageHeader from '../../components/PageHeader';
import SignupForm from '../../components/SignupForm';
// import { Globe, MessageSquare, BookOpen, Video, Users, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { queryData, queryPageContent } from '../../components/Utilities';

interface LanguageContent {
  name: string;
  popular: boolean;
  beginner: boolean;
  intermediate: boolean;
  advanced: boolean;
}

// interface LanguageWithLevels extends Language {
//   beginner?: boolean;
//   intermediate?: boolean;
//   advanced?: boolean;
//   popular?: boolean;
// }

const LearnLanguagesPage: React.FC = () => {

  const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery({
    queryKey: ['learn-languages'], 
    queryFn: () => queryPageContent('learn-languages'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: languages, isLoading: languagesLoading, error: languagesError } = useQuery({
    queryKey: ['languages'], 
    queryFn: () => queryData('languages'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  // Define formFields using the languages state
  const formFields = [
    { name: "studentName", label: "Student Name", type: "text", required: true },
    { name: "studentAge", label: "Student Age", type: "number", required: true },
    { name: "language", label: "Language Interest", type: "select", required: true, options: [
      // ...languages.map(lang => lang.name),
      // "Other"
    ]},
    { name: "otherLanguage", label: "If Other, please specify", type: "text" },
    { name: "currentLevel", label: "Current Language Level", type: "select", required: true, options: [
      "Complete Beginner", "Beginner", "Elementary", "Intermediate", "Advanced", "Fluent"
    ]},
    { name: "learningGoals", label: "Learning Goals", type: "textarea", required: true },
    { name: "parentName", label: "Parent/Guardian Name", type: "text" },
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
            <p className="mt-4 text-lg text-red-50000">Error loading page.</p>
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
            
            <p className="mb-4">
              {pageContent.third_details[0].heading}
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mb-6">
              {JSON.parse(pageContent.third_details).map((content: {description:string}, index:number) => (
                <li key={index}>{content.description}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fourth_title}</h3>
            <div className="space-y-4 mb-6">
              {JSON.parse(pageContent.fourth_details).map((content: {heading:string, description:string, schedule:string}, index:number) => (
                <div key={index} className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">{content.heading}</h4>
                <p className="text-gray-700">
                  {content.description}
                </p>
                <p className="text-gray-700 mt-2">
                  {content.schedule}
                </p>
              </div>  
              ))}
              
              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">{pageContent.fourth_details[3].heading}</h4>
                <p className="text-gray-700">
                  {pageContent.fourth_details[3].description}
                </p>
                <p className="text-gray-700 mt-2">
                  {pageContent.fourth_details[3].schedule}
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{pageContent.fifth_title}</h3>
            <p className="mb-4">
              {pageContent.fifth_subtitle}
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              {JSON.parse(pageContent.fifth_details).map((content: {description:string}, index:number) => (
                <li key={index}>{content.description}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <SignupForm 
            title="Start Learning a New Language"
            description="Complete this form to learn more about our language programs and schedule an initial assessment."
            fields={formFields}
            serviceType="Language Learning"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="section-title text-center mb-8">{pageContent.sixth_title}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
            <thead className="bg-primary-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Language</th>
                <th className="py-3 px-6 text-center">Beginner</th>
                <th className="py-3 px-6 text-center">Intermediate</th>
                <th className="py-3 px-6 text-center">Advanced</th>
                <th className="py-3 px-6 text-center">Group Classes</th>
                <th className="py-3 px-6 text-center">Private Tutoring</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {languagesLoading && <div className="text-center text-gray-400">Loading...</div>}
            {languagesError && <div className="text-center text-red-500">Error loading langauges.</div>}
            {languages &&
              languages.map((language:LanguageContent, index:number) => (
                <tr key={index} className={language.popular ? "bg-primary-50" : ""}>
                  <td className="py-3 px-6 text-gray-900 font-medium">
                    {language.name}
                    {language.popular && (
                      <span className="ml-2 text-xs bg-primary-100 text-primary-800 py-1 px-2 rounded-full">
                        Popular
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {language.beginner ? "✓" : "-"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {language.intermediate ? "✓" : "-"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {language.advanced ? "✓" : "-"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {language.beginner ? "✓" : "-"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    ✓
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center mt-4 text-gray-600">
          {pageContent.sixth_subtitle}        
        </p>
      </div>
      
      <div className="mb-16">
        <h2 className="section-title text-center mb-8">{pageContent.seventh_title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JSON.parse(pageContent.seventh_details).map((content: {heading:string, description:string}, index:number) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="mb-4">
                {/* {content.icon} */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{content.heading}</h3>
              <p className="text-gray-700">{content.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-primary-50 p-8 rounded-2xl mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{pageContent.eigth_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{pageContent.ninth_title}</h3>
              <ul className="space-y-2">
                {JSON.parse(pageContent.ninth_details).map((content: {description:string}, index:number) => (
                  <li key={index} className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  <span className="text-gray-700">{content.description}</span>
                </li>
                ))}
                
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{pageContent.tenth_title}</h3>
              <ul className="space-y-2">
                {JSON.parse(pageContent.tenth_details).map((content: {description:string}, index:number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span className="text-gray-700">{content.description}</span>
                  </li>  
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <a href="#signup-form" className="btn btn-primary">
              {languagesLoading ? 'Loading...' : 'Start Your Language Journey'}
            </a>
          </div>
        </div>
      </div>
      </>
      }
    </div>
  );
};

export default LearnLanguagesPage;

// [
//   {
//     "heading": "Immersive Learning",
//     "icon": "<Globe size={40} className='text-primary-500' />",
//     "description": "Our language programs create immersive environments where students naturally absorb vocabulary, grammar, and cultural context through everyday usage."
//   },
//   {
//     "heading": "Conversation Practice",
//     "icon": "<MessageSquare size={40} className='text-primary-500' />",
//     "description": "Regular conversation sessions with native speakers and fellow students build confidence and fluency in practical, real-world communication."
//   },
//   {
//     "heading": "Comprehensive Curriculum",
//     "icon": "<BookOpen size={40} className='text-primary-500' />",
//     "description": "Our structured curriculum covers all language aspects: speaking, listening, reading, writing, grammar, and cultural understanding."
//   },
//   {
//     "heading": "Multimedia Resources",
//     "icon": "<Video size={40} className='text-primary-500' />",
//     "description": "Access to a rich library of audio, video, and interactive digital materials that reinforce classroom learning and facilitate practice at home."
//   },
//   {
//     "heading": "Small Class Sizes",
//     "icon": "<Users size={40} className='text-primary-500' />",
//     "description": "With a maximum of 8 students per class, every learner receives personalized attention and ample opportunities to practice."
//   },
//   {
//     "heading": "Proficiency Certification",
//     "icon": "<Award size={40} className='text-primary-500' />",
//     "description": "Preparation for internationally recognized language proficiency exams that validate your skills for academic and professional purposes."
//   }
// ]