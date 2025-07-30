import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryData, queryPageContent } from '../components/Utilities';

interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
  linkTo: string;
  annualPrice?: string;
  annualDescription?: string;
}

interface ServicePricing {
  id: number;
  service: string;
  description: string;
  individual: string;
  package: string;
  linkTo: string;
}

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const { data: servicesPricing, isLoading: servicesPricingLoading, error: servicesPricingError }  = useQuery({ 
    queryKey:['services-pricing'], 
    queryFn:() => queryData('pricing-plans'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: pricingPlans, isLoading: pricingPlansLoading, error: pricingPlansError }  = useQuery({ 
    queryKey:['pricing-plans'], 
    queryFn:() => queryData('pricing-plans'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  const { data: pageContent, isLoading: pageContentLoading, error: pageContentError }  = useQuery({ 
    queryKey:['pricing'], 
    queryFn:() => queryPageContent('pricing'),
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
            <p className="mt-4 text-lg text-gray-500">Error Loading Page.</p>
          </div>
        </div> }

        { pageContent && <>
      <PageHeader 
        title={pageContent.main_title}
        subtitle={pageContent.main_subtitle}
        imageUrl={pageContent.main_background_image}
      />
      {/* Switch for Monthly/Annual */}
      <div className="flex justify-center items-center mb-8 gap-4">
        <span className={isAnnual ? "text-gray-500" : "font-semibold text-primary-600"}>Monthly</span>
        <button
          className={`relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none ${
            isAnnual ? "bg-primary-600" : "bg-gray-300"
          }`}
          onClick={() => setIsAnnual((prev) => !prev)}
          aria-label={isAnnual ? "Switch to monthly pricing" : "Switch to annual pricing"}
          role="switch"
          aria-checked={isAnnual}
        >
          <span
            className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
              isAnnual ? "translate-x-7" : ""
            }`}
          />
        </button>
        <span className={isAnnual ? "font-semibold text-primary-600" : "text-gray-500"}>Annual</span>
        {isAnnual && (
          <span className="ml-2 text-xs text-green-600 font-medium">Save ~10%</span>
        )}
      </div>
      
      <section className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">{pageContent.second_title}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {pageContent.second_subtitle}
          </p>
        </motion.div>
        
        {pricingPlans &&
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan:PricingPlan, index:number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden border ${
                  plan.popular 
                    ? 'border-primary-500 shadow-lg shadow-primary-100' 
                    : 'border-gray-200'
                }`}
              >
                {/* {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-medium">
                    Popular
                  </div>
                )} */}

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name || 'Untitled Plan'}</h3>
                  <p className="text-gray-600 mb-4">
                    {isAnnual ? (plan.annualDescription || plan.description || 'No description') : (plan.description || 'No description')}
                  </p>
                  <div className="text-3xl font-bold text-primary-600 mb-6">
                    {isAnnual ? (plan.annualPrice || '$0/year') : (plan.price || '$0/month')}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features && plan.features.length > 0 ? (
                      plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1 flex-shrink-0">
                            <Check size={16} />
                          </span>
                          <span className="text-gray-700">{feature || 'Feature not available'}</span>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No features listed</p>
                    )}
                  </ul>
                  
                  <Link
                    to={plan.linkTo || '/get-in-touch'}
                    className={`btn w-full ${
                      plan.popular 
                        ? 'btn-primary' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        }

        {pricingPlansLoading && <div className="text-center mt-8">Loading...</div>}

        {pricingPlansError && <div className="text-center mt-8 text-red-500">Error loading Price Plans.</div>}

        <div className="text-center mt-8 text-gray-600">
          <p>All plans include an initial assessment and personalized learning plan.</p>
        </div>
      </section>
      
      <section className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">{pageContent.third_title}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {pageContent.third_subtitle}
          </p>
        </motion.div>
        
        { servicesPricing && 
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Individual Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package Rate
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servicesPricing.map((service:ServicePricing, index:number) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{service.service}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{service.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{service.individual}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{service.package}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Link 
                      to={service.linkTo} 
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Details
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      }

        {servicesPricingLoading && <div className="text-center mt-8">Loading...</div>}

        {servicesPricingError && <div className="text-center mt-8 text-red-500">Error loading services pricing.</div>}

      </section>
      
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary-50 p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{pageContent.fourth_title}</h3>
            <ul className="space-y-3">

              {pageContent.fourth_details.map((content, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-gray-700">{content.description}</span>
                </li>
              ))}
              
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{pageContent.fifth_title}</h3>
            <ul className="space-y-3">
              {pageContent.fifth_details.map((content, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-gray-700">{content.description}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
      
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary-600 text-white rounded-2xl p-8 lg:p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">{pageContent.sixth_title}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {pageContent.sixth_subtitle}
          </p>
          <div className="flex justify-center">
            <Link to="/get-in-touch" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Request a Quote
            </Link>
          </div>
        </motion.div>
      </section>
      </>
      }
    </div>
  );
};

export default PricingPage;