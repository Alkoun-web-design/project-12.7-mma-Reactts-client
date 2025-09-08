import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useQuery } from '@tanstack/react-query';
import { queryPageContent, serverAPI } from '../components/Utilities';

interface GetInTouchForm  {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  interest: string;
}

const GetInTouch: React.FC = () => {
  const [formData, setFormData] = useState<GetInTouchForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interest: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery({
    queryKey: ['get-in-touch'], 
    queryFn: () => queryPageContent('get-in-touch'),
    staleTime: 6 * 60 * 60 * 1000, 
    gcTime: 24 * 60 * 60 * 1000,
    refetchInterval: 6 * 60 * 60 * 1000,
  });

  // (e, formData, setSubmitting, setSuccess, setFormData )

  const handleFormSubmit = async (e: React.FormEvent, formData: GetInTouchForm, setSubmitting:React.Dispatch<React.SetStateAction<boolean>>, setSuccess:React.Dispatch<React.SetStateAction<boolean>>, setFormData:React.Dispatch<React.SetStateAction<GetInTouchForm>> ) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch(`${serverAPI}contact/enquiry-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setSuccess(true);
      setFormData(formData);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setSubmitting(false);
    }
  };

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
            <p className="mt-4 text-lg text-red-600">Eroor loading page.</p>
          </div>
        </div> }

        {  pageContent && 
        <>
      <PageHeader 
        title={pageContent.main_title}
        subtitle={pageContent.main_subtitle}
        imageUrl={pageContent.main_background_image}
      />
      
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">{pageContent.second_title}</h2>
            <p className="text-lg text-gray-700 mb-8">
              {pageContent.second_subtitle}
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{pageContent.second_details[0].heading}</h3>
                  <p className="text-gray-600">{pageContent.second_details[0].description1}</p>
                  <p className="text-gray-600">{pageContent.second_details[0].description2}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{pageContent.second_details[1].heading}</h3>
                  <p className="text-gray-600">{pageContent.second_details[1].description1}</p>
                  <p className="text-gray-600">{pageContent.second_details[1].description2}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{pageContent.second_details[2].heading}</h3>
                  <p className="text-gray-600">{pageContent.second_details[2].description1}</p>
                  {/* <p className="text-gray-600">{pageContent.second_details[2].description2}</p> */}
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{pageContent.second_details[3].heading}</h3>
                  <p className="text-gray-600">{pageContent.second_details[3].description1}</p>
                  <p className="text-gray-600">{pageContent.second_details[3].description2}</p>
                  <p className="text-gray-600">{pageContent.second_details[3].description3}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 text-4xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">Message Sent!</h3>
                <p className="text-green-600 mb-4">
                  Thank you for contacting EduCraft Learning. We've received your message and will get back to you shortly.
                </p>
                <button 
                  onClick={() => setSuccess(false)} 
                  className="btn btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Send Us a Message</h2>
                
                <form onSubmit={e => handleFormSubmit(e, formData, setSubmitting, setSuccess, setFormData)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                      I'm Interested In
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Please select</option>
                      <option value="Homeschooling">Homeschooling</option>
                      <option value="Subject Tutoring">Subject Tutoring</option>
                      <option value="Subject Classes">Subject Classes</option>
                      <option value="Standardized Test Prep">Standardized Test Prep</option>
                      <option value="Study Coaching">Study Coaching & Counselling</option>
                      <option value="Student Clubs">Student Clubs & Activities</option>
                      <option value="Academic Resources">Academic Resources</option>
                      <option value="Learn Languages">Learn Languages</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input"
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary w-full"
                      disabled={submitting}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      </>
      }
    </div>
  );
};

export default GetInTouch;