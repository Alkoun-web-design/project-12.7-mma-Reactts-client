import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useQuery } from '@tanstack/react-query';
import { queryData, queryPageContent } from '../components/Utilities';

interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const Faqs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All Questions');

  const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery({
      queryKey: ['faqs'], 
      queryFn: () => queryPageContent('faqs'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: faqs, isLoading: faqsLoading, error: faqsError } = useQuery({
      queryKey: ['faqItemss'], 
      queryFn: () => queryData('faqs'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
  });

  const filteredFaqs = activeCategory === 'All Questions'
    ? faqs
    : faqs.filter((item:Faq) => item.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'turtoring', label: 'Tutoring' },
    { id: 'services', label: 'Our Services' },
    { id: 'payments', label: 'Payments & Pricing' },
    { id: 'logistics', label: 'Scheduling & Logistics' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'programs', label: 'Programs' },
    { id: 'communication', label: 'Communication' },
    { id: 'financial', label: 'Financial' },
    { id: 'homeschooling', label: 'Homeschooling' },
    { id: 'study-coaching', label: 'Study Coaching' }    
  ];

  return (
    <div>
      { pageContentLoading && 
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading Page...</p>
          </div>
        </div>}

        { pageContentError && 
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="mt-4 text-lg text-red-600">Eroor loading page.</p>
          </div>
        </div> }

        { pageContent && 
        <>
      <PageHeader
        title={pageContent.main_title}
        subtitle={pageContent.main_subtitle}
        imageUrl={pageContent.main_background_image}
      />

      <section className="mb-16">
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.label)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.label
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqsLoading && <div className="text-center text-gray-400">Loading...</div>}
          {faqsError && <div className="text-center text-red-500">Error loading faqs.</div>}
          {filteredFaqs && filteredFaqs.map((faq:Faq, index:number) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full p-4 text-left text-gray-900 font-medium hover:bg-gray-50 transition-colors"
              >
                <span>{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp size={20} className="text-primary-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>

              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4 text-gray-600"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="bg-primary-50 p-8 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{pageContent.second_title}</h2>
            <p className="text-gray-700 mb-6">
              {pageContent.second_subtitle}
            </p>
            <div className="flex justify-center">
              <a href="/get-in-touch" className="btn btn-primary">
                Contact Us
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

export default Faqs;