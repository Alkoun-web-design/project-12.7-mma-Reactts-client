// import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { BookOpen, Users, Award, ChevronRight, ChevronLeft } from 'lucide-react';
import { BookOpen, Users, Award, ChevronRight } from 'lucide-react';
// import { queryData, queryPageContent } from '../components/Utilities';
import { queryPageContent } from '../components/Utilities';
import { useQuery } from '@tanstack/react-query';
import EducationalServicesSection from '../components/EducationalServicesGrid';

// Custom Carousel for Testimonials
// const TestimonialsSlideshow: React.FC = () => {

//   const [current, setCurrent] = useState(0);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['testimonials'], 
//     queryFn: () => queryData('student-testimonials'),
//     staleTime: 6 * 60 * 60 * 1000, 
//     gcTime: 24 * 60 * 60 * 1000,
//     refetchInterval: 6 * 60 * 60 * 1000,
// });

//   useEffect(() => {
//     if (!data || data.length < 2) return;
//     const timer = setInterval(() => setCurrent(c => (c + 1) % data.length), 6000);
//     return () => clearInterval(timer);
//   }, [data]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[260px]">
//         <div className="w-full h-48 rounded-xl bg-gray-100 animate-pulse" />
//       </div>
//     );
//   };

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-[260px]">
//         <p className="mt-4 text-lg text-red-600">Error loading testimonials.</p>
//       </div>
//     );
//   };

//   if (!data || !data.length) {
//     return <div className="text-gray-500 text-center min-h-[260px]">No testimonials available.</div>;
//   }

//   const t = data[current];
//   return (
    
//     <div className="flex flex-col items-center justify-center h-full min-h-[260px] relative">
//       <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full mx-auto transition-all duration-500">
//         <div className="flex items-center mb-4">
//           <div>
//             <h3 className="font-semibold text-gray-900">{t.student_name}</h3>
//             {t.service_name && <p className="text-sm text-primary-600">{t.service_name}</p>}
//           </div>
//         </div>
//         <p className="text-gray-600 italic">"{t.testimonial}"</p>
//       </div>
//       <div className="flex gap-2 mt-4 justify-center">
//         {data.map((i:number) => (
//           <button
//             key={i}
//             className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 border border-gray-300 focus:outline-none ${i === current ? 'bg-primary-600' : 'bg-gray-300'}`}
//             onClick={() => setCurrent(i)}
//             aria-label={`Go to testimonial ${i + 1}`}
//           />
//         ))}
//       </div>
//       {data.length > 1 && (
//         <>
//           <div className="absolute inset-y-0 left-0 flex items-center">
//             <button
//               className="p-2 rounded-full bg-white shadow hover:bg-gray-100 text-primary-600"
//               onClick={() => setCurrent((current - 1 + data.length) % data.length)}
//               aria-label="Previous testimonial"
//             >
//               <ChevronLeft size={30} />
//             </button>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center">
//             <button
//               className="p-2 rounded-full bg-white shadow hover:bg-gray-100 text-primary-600"
//               onClick={() => setCurrent((current + 1) % data.length)}
//               aria-label="Next testimonial"
//             >
//               <ChevronRight size={30} />
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

export default function Home () {

  const { data, isLoading, error }  = useQuery({ 
    queryKey:['home'], 
    queryFn:() => queryPageContent('home'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  return (
    <div>

      { isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading Page...</p>
          </div>
        </div>) : error? (
          <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="mt-4 text-lg text-red-600">Error Loading Page.</p>
          </div>
          </div>) : data? (
        <>
        <section className="relative rounded-3xl overflow-hidden mb-16">
          <div className="absolute inset-0">
            <img 
              // src={pageContent.main_background_image}
              src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg" 
              alt="Students learning" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/70"></div>
          </div>

          <div className="relative py-20 px-8 lg:py-28 lg:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {data.main_title}
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {data.main_subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/educational-services" className="btn btn-primary">
                  Explore Our Services
                </Link>
                <Link to="/get-in-touch" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-title"
            >
              {data.second_title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              {data.second_subtitle}
            </motion.p>
          </div>
          <EducationalServicesSection limit={4} />
          <div className="text-center mt-8">
            <Link 
              to="/educational-services" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View all educational services <ChevronRight size={18} />
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-primary-50 rounded-2xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="section-title"
                >
                  {data.third_title}
                </motion.h2>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{JSON.parse(data.third_details)[0].heading}</h3>
                      <p className="text-gray-600">
                        {JSON.parse(data.third_details)[0].description}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{JSON.parse(data.third_details)[1].heading}</h3>
                      <p className="text-gray-600">
                        {JSON.parse(data.third_details)[1].description}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      <Award size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{JSON.parse(data.third_details)[2].heading}</h3>
                      <p className="text-gray-600">
                        {JSON.parse(data.third_details)[2].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="lg:w-1/2 flex items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl overflow-hidden shadow-lg"
                >
                  <img 
                    src="https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg" 
                    alt="Happy students learning" 
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="mb-16">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-title"
            >
              {data.fourth_title}
            </motion.h2>
          </div>
          <div className="min-h-[260px]">
            <TestimonialsSlideshow />
          </div>
        </section> */}

        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary-600 text-white rounded-2xl p-8 lg:p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">{data.fifth_title}</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {data.fifth_subtitle}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/get-in-touch" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Get in Touch
              </Link>
              <Link to="/educational-services" className="btn border-2 border-white text-white hover:bg-white/10">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </section>
        </>) : (null)
      } 
    </div>
  );
};

