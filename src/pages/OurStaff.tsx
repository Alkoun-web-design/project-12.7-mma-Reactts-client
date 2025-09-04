import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useQuery } from '@tanstack/react-query';
import { handleGetPageContent, queryData, uploadsURL } from '../components/Utilities';
import type { Content } from '../types/types'

// Staff member type based on backend API
interface Admin {
  id: number;
  name: string;
  email: string;
  bio: string;
  education: string | null;
  languages: string | null;
  work_experience: string | null;
  certifications: string | null;
  achievements: string | null;
  avatar_url: string | null;
}
interface Tutor {
  id: number;
  name: string;
  email: string;
  subjectSpeciality: string | null;
  bio: string;
  education: string | null;
  teaching_style: string | null;
  languages: string | null;
  work_experience: string | null;
  certifications: string | null;
  achievements: string | null;
  avatar_url: string | null;
}

interface Counsellor {
  id: number;
  name: string;
  email: string;
  bio: string;
  education: string | null;
  languages: string | null;
  work_experience: string | null;
  certifications: string | null;
  achievements: string | null;
  avatar_url: string | null;
}

// Skeleton loader for staff cards
const StaffGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={`skeleton-card-${i}`} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
        <div className="w-full h-64 bg-gray-200" />
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
          <div className="h-4 bg-gray-100 rounded w-full mb-2" />
          <div className="h-4 bg-gray-100 rounded w-5/6 mb-2" />
          <div className="flex flex-wrap gap-2 mt-4">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={`skeleton-specialty-${i}-${j}`} className="h-6 w-20 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// StaffGrid: fetches staff data with hooks instead of React.lazy
const StaffGrid: React.FC = () => {

  const { data: admins, isLoading: adminsLoading, error: adminsError }  = useQuery({ 
    queryKey:['admins'], 
    queryFn:() => queryData('admins'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: tutors, isLoading: tutorsLoading, error: tutorsError }  = useQuery({ 
      queryKey:['tutors'], 
      queryFn:() => queryData('tutors'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
    });

  const { data: counsellors, isLoading: counsellorsLoading, error: counsellorsError }  = useQuery({ 
      queryKey:['counsellors'], 
      queryFn:() => queryData('counsellors'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
    });

  const navigate = useNavigate();
 
  return (
    <>
      <h3 className='text-center text-2xl text-primary-600'>Admins</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 mb-12">  
        {adminsLoading && <StaffGridSkeleton />}
        {admins &&  
        admins.map((admin:Admin, index:number) => (
          <motion.div
            key={admin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/admin/${admin.id}`)}
          >
            <img
              src={`${uploadsURL}${admin.avatar_url}` || 'https://images.pexels.com/photos/5212640/pexels-photo-5212640.jpeg'}
              alt={admin.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{admin.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{admin.bio}</p>
            </div>
          </motion.div>
        ))}
        {adminsError && <div className="text-center mt-8 text-red-500">Error loading Admins.</div>}
      </div>
      
      <h3 className='text-center text-2xl text-primary-600'>Tutors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 mb-12">  
        {tutorsLoading && <StaffGridSkeleton />}
        {tutors &&  
          tutors.map((tutor:Tutor, index:number) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/tutor/${tutor.id}`)}
            >
              <img
                src={`${uploadsURL}${tutor.avatar_url}` || 'https://images.pexels.com/photos/5212640/pexels-photo-5212640.jpeg'}
                alt={tutor.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{tutor.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{tutor.bio}</p>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjectSpeciality
                      ? tutor.subjectSpeciality.split(',').map((specialty: string, i: number) => (
                          <span
                            key={`${tutor.id}-${specialty.trim()}-${i}`}
                            className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                          >
                            {specialty.trim()}
                          </span>
                        ))
                      : <span className="text-gray-400">N/A</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {tutorsError && <div className="text-center mt-8 text-red-500">Error loading Tutors.</div>}
      </div>

      <h3 className='text-center text-2xl text-primary-600'>Counsellors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 mb-12">  
        {counsellorsLoading && <StaffGridSkeleton />}
        {counsellors &&  
          counsellors.map((counsellor:Counsellor, index:number) => (
            <motion.div
              key={counsellor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/counsellor/${counsellor.id}`)}
            >
              <img
                src={`${uploadsURL}${counsellor.avatar_url}` || 'https://images.pexels.com/photos/5212640/pexels-photo-5212640.jpeg'}
                alt={counsellor.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{counsellor.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{counsellor.bio}</p>
              </div>
            </motion.div>
          ))}
          {counsellorsError && <div className="text-center mt-8 text-red-500">Error loading Counsellors.</div>}


      </div>
    </>
  );
};

const OurStaff: React.FC = () => {

  const [pageContent, setPageContent] = useState<Content | null>(null);
  const [pageContentLoading, setPageContentLoading] = useState(true);
  
  useEffect(() => {
    handleGetPageContent('our-staff', setPageContent, setPageContentLoading);
  }, []);

  return (
    <div>
      { pageContentLoading ? 
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading Page...</p>
          </div>
        </div> :
        <>
      <PageHeader
        title={pageContent?.main_title}
        subtitle={pageContent?.main_subtitle}
        imageUrl={pageContent?.main_background_image}
      />

      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {pageContent?.second_subtitle}
          </p>
        </motion.div>

        <StaffGrid />
      </section>

      <section className="mb-16">
        <div className="bg-primary-50 p-8 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{pageContent?.third_title}</h2>
            <p className="text-gray-700 mb-6">
              {pageContent?.third_subtitle}
            </p>
            <div className="flex justify-center">
              <a href="/get-in-touch" className="btn btn-primary">
                Apply to Teach
              </a>
            </div>
          </div>
        </div>
      </section>
      </>
      }
    </div>
  );
};

export default OurStaff;