import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { useQuery } from '@tanstack/react-query';
import { queryPageContent } from "../components/Utilities"
import EducationalServicesGrid from '../components/EducationalServicesGrid';

const EducationalServices: React.FC = () => {

  const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery({
    queryKey: ['educational-services-content'], 
    queryFn: () => queryPageContent('educational-services'),
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
        </div>
      }

      { pageContentError &&
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="mt-4 text-lg text-red-500">Error loading educational services.</p>
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
       <section className="mb-16">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-center mb-12"
         >
           <p className="text-lg text-gray-700 max-w-3xl mx-auto">
             {pageContent.second_subtitle}
           </p>
         </motion.div>
         {/* <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{Array.from({ length: 8 }).map((_, i) => 
           <div key={i} className="card animate-pulse">
             <div className="mb-4 h-8 w-8 bg-gray-200 rounded-full" />
               <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
             <div className="h-4 bg-gray-100 rounded w-full mb-4" />
             <div className="h-4 bg-gray-100 rounded w-1/2" />
           </div>
         )}</div>}> */}
           <EducationalServicesGrid limit={12} />
         {/* </Suspense> */}
        </section>
        <section className="mb-16">
          <div className="bg-primary-50 p-8 rounded-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{pageContent.third_title}</h2>
              <p className="text-gray-700 mb-6">
                {pageContent.third_subtitle}
              </p>
              <div className="flex justify-center">
                <a href="/get-in-touch" className="btn btn-primary">
                  Schedule a Consultation
                </a>
              </div>
            </div>
          </div>
        </section>
      </>}
    </div>
  );
};

export default EducationalServices;