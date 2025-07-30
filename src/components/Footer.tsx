import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryPageContent } from './Utilities';

interface FooterDetails {
  heading: string;
  description1?: string;
  description2?: string;
  description3?: string;
}
interface FooterData {
  left_column_title: string;
  left_column_subtitle:  string;
  center_column_title: string;
  right_column_title: string;
}
export default function Footer() {

    const { data: pageContent, isLoading: pageContentLoading, error: pageContentError } = useQuery<FooterData>({
      queryKey: ['footer'], 
      queryFn: () => queryPageContent('footer'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
    });

    const { data: contactData, isLoading: contactLoading, error: contactError } = useQuery({
      queryKey: ['get-in-touch'], 
      queryFn: () => queryPageContent('get-in-touch'),
      staleTime: 6 * 60 * 60 * 1000, 
      gcTime: 24 * 60 * 60 * 1000,
      refetchInterval: 6 * 60 * 60 * 1000,
    });

    if(!pageContent) {return null;}

    return(
        <footer className="bg-gray-800 text-white py-8 px-4">
          { pageContentLoading &&
            <div className="flex justify-center items-center min-h-screen">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
                <p className="mt-4 text-lg text-gray-600">Loading Footer...</p>
              </div>
            </div> 
          }

          { pageContentError &&
            <div className="flex justify-center items-center min-h-screen">
              <div className="text-center">
                <p className="mt-4 text-lg text-red-500">Error loading footer.</p>
              </div>
            </div> 
          }

          { pageContent &&
            <div className="container mx-auto"> 
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{pageContent.left_column_title}</h3>
                  <p className="text-gray-300">
                    {pageContent.left_column_subtitle}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">{pageContent.center_column_title}</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
                    <li><Link to="/educational-services" className="text-gray-300 hover:text-white transition">Educational Services</Link></li>
                    <li><Link to="/our-staff" className="text-gray-300 hover:text-white transition">Our Staff</Link></li>
                    <li><Link to="/pricing" className="text-gray-300 hover:text-white transition">Pricing</Link></li>
                    <li><Link to="/faqs" className="text-gray-300 hover:text-white transition">FAQs</Link></li>
                    <li><Link to="/get-in-touch" className="text-gray-300 hover:text-white transition">Contact Us</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">{pageContent.right_column_title}</h3>
                  <address className="not-italic text-gray-300">
                    {contactLoading && <div>Loading...</div>}
                    {contactError && <div>Error loading contact information.</div>}
                    {contactData && 
                    contactData.second_details.map((data: FooterDetails, index:number) =>(
                        <p className='py-1  text-sm' key={index}>{data.heading}: {data.description1}</p>
                    ))}
                  </address>
                </div>
              </div>
              <div className=" text-sm border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Mind Muscles Academy. All rights reserved.</p>
              </div>
            </div>    
          }
        </footer>
  )
}