import React from 'react';
import ServiceCard from './ServiceCard';
import { BookOpen, Book, Users, Award, Lightbulb, GraduationCap, Laptop, Globe } from 'lucide-react';
import { queryData } from './Utilities';
import { useQuery } from '@tanstack/react-query';

interface EducationalService {
  id: number;
  service_key: string;
  name: string;
  details: string;
  short_description: string;
  isActive: number;
}

// interface EducationalServicesGridProps {
//   limit: number;
// }

// const ServiceSkeleton = () => (
//   <div className="card animate-pulse">
//     <div className="mb-4 h-8 w-8 bg-gray-200 rounded-full" />
//     <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
//     <div className="h-4 bg-gray-100 rounded w-full mb-4" />
//     <div className="h-4 bg-gray-100 rounded w-1/2" />
//   </div>
// );

const ICONS: Record<string, React.ReactNode> = {
  homeschooling: <BookOpen size={30} />,
  'subject-tutoring': <Book size={30} />,
  'subject-classes': <Users size={30} />,
  'standardized-test-prep': <Award size={30} />,
  'study-coaching': <Lightbulb size={30} />,
  'student-clubs': <GraduationCap size={30} />,
  'academic-resources': <Laptop size={30} />,
  'learn-languages': <Globe size={30} />,
};

function getIcon(service_key: string) {
  const key = service_key.replace(/_/g, '-').toLowerCase();
  return ICONS[key] || <BookOpen size={30} />;
}
// export default function EducationalServicesSection({limit}: EducationalServicesGridProps) {
export default function EducationalServicesSection() {

  const { data: services, isLoading: servicesLoading, error: servicesError } = useQuery({
    queryKey: ['educational-services'], 
    queryFn: () => queryData('educational-services'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {servicesLoading && <div className="text-center text-gray-400">Loading...</div>}
      {servicesError && <div className="text-center text-red-500">Error loading faqs.</div>}
      {services && services.map((service:EducationalService, idx:number) => (
        // ? (limit ? services.slice(0, limit) : services).map((service:EducationalService, idx:number) => (
        // idx < limit ?
            <ServiceCard
              key={service.id}
              title={service.name}
              description={service.short_description}
              icon={getIcon(service.service_key)}
              linkTo={`/educational-services/${service.service_key}`}
              delay={idx}
            />
        // : null
          ))
        // : Array.from({ length: limit || 4 }).map((_, i) => <ServiceSkeleton key={i} />)
      }
    </div>
  );
}