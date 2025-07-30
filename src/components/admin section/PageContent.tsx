import React, { useState, useEffect } from 'react';
import { handleGetData, handleSaveContent, serverAPI } from '../Utilities';
import { LucideArrowLeft } from 'lucide-react';

interface Details{
  icon: string;
  heading:  string;
  description: string;
}

interface Content {
  main_title?: string;
  main_subtitle?: string;
  main_background_image?: string;
  second_title?: string;
  second_subtitle?: string;
  second_details?: Details[] | null;
  third_title?: string;
  third_subtitle?: string;
  third_details?: Details[] | null;
  fourth_title?: string;
  fourth_subtitle?: string;
  fourth_details?: Details[] | null;
  fifth_title?: string;
  fifth_subtitle?: string;
  fifth_details?: Details[] | null;
  sixth_title?: string;
  sixth_subtitle?: string;
  sixth_details?: Details[] | null;
  seventh_title?: string;
  seventh_subtitle?: string;
  seventh_details?: Details[] | null;
  eighth_title?: string;
  eighth_subtitle?: string;
  eighth_details?: Details[] | null;
  ninth_title?: string;
  ninth_subtitle?: string;
  ninth_details?: Details[] | null;
  tenth_title?: string;
  tenth_subtitle?: string;
  tenth_details?: Details[] | null;
  left_column_title?: string;
  left_column_subtitle?: string;
  left_column_logo?: string;
  center_column_title?: string;
  right_column_title?: string;
}

export default function PageContent ({
  page,
  label,
  setPage
}) {

  const [content, setContent ] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Content>({});
  const [saveStatus, setSaveStatus] = useState<string>('');

  const handleSaveContent = async (e: React.FormEvent, page:string) => {
  e.preventDefault();
    if (!page) return;
    const fixedForm = ({
      ...form, 
      second_details : JSON.stringify(form.second_details),
      third_details : JSON.stringify(form.third_details),
      fourth_details : JSON.stringify(form.fourth_details),
      fifth_details : JSON.stringify(form.fifth_details),
      sixth_details : JSON.stringify(form.sixth_details),
      seventh_details : JSON.stringify(form.seventh_details),
      eighth_details : JSON.stringify(form.eighth_details),
      ninth_details : JSON.stringify(form.ninth_details),
      tenth_details : JSON.stringify(form.tenth_details)
    })
    try {
      const response = await fetch(`${serverAPI}pages/${page}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(fixedForm),
      });
      console.log(form);

      if (!response.ok) {
        throw new Error('Failed to save page content');
      }

      setSaveStatus('Content saved successfully');
    } catch (error) {
      console.error('Error saving page content:', error);
      setSaveStatus('Error saving content');
    }
  };  

  useEffect(() => {

    const getPagesData = async () => {
      const api = `pages/${page}`
      try {
        const response = await fetch(`${serverAPI}${api}`);
        const data = await response.json();
        setContent(data);
        setForm(f => ({ ...f, ...data[0] }));
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getPagesData()
  }, [page]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

  return (

  <div className="w-full bg-white rounded-lg shadow p-8">
    <button className="p-2 rounded-sm my-2 hover:bg-gray-100 hover:cursor-pointer" onClick={() => setPage('none')} >
      <div className='inline'><LucideArrowLeft /></div>
      Back to Pages
    </button>
    <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
      {label}
    </h2>
    { loading ? <div className="text-gray-700 mb-2">Loading...</div> :
      <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={(e) => handleSaveContent(e, page, form, setSaveStatus)}>
        <div>

            {content.map((data) => (
              <>
                {data.main_title && (
                  <div key={`main_title`}>
                    <label htmlFor={`main_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Main Title
                    </label>
                    <input
                      name='main_title'
                      value={form.main_title}                     
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      required
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.main_title}
                    </div>
                  </div>
                )}

                {data.main_subtitle && (
                  <div key={`main_subtitle`}>
                    <label htmlFor={`main_subtitle`} className="block text-sm font-medium text-gray-700 my-2">
                      Main Subtitle
                    </label>
                    <input
                      name='main_subtitle'
                      value={form.main_subtitle}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      required
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {typeof data.main_subtitle === 'object' ? JSON.stringify(data.main_subtitle) : String(data.main_subtitle)}
                    </div>
                  </div>
                )}

                {data.main_background_image && (
                  <div key={`main_backgorund_image`}>
                    <label htmlFor={`main_backgorund_image`} className="block text-sm font-medium text-gray-700 my-2">
                      Main Background Image
                    </label>
                    <input
                      name='main_backgorund_image'
                      value={form.main_background_image}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.main_background_image}
                    </div>
                  </div>
                )}

                {data.second_title && (
                  <div key={`second_title`}>
                    <label htmlFor={`second_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Second Title
                    </label>
                    <input
                      name='second_title'
                      value={form.second_title}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.second_title}
                    </div>
                  </div>
                )}

                {data.second_subtitle && (
                  <div key={`second_subtitle`}>
                    <label htmlFor={`second_subtitle`} className="block text-sm font-medium text-gray-700 my-2">
                      Second Subtitle
                    </label>
                    <input
                      name='second_subtitle'
                      value={form.second_subtitle}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.second_subtitle}
                    </div>
                  </div>
                )}

                {data.second_details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-2 pt-2 pb-4">Second Details</label>
                    {data.second_details.map((details, index) => (
                      <div key={`second_details_${index}`}>
                        <label 
                          htmlFor={`second_details_heading_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Heading {index + 1}
                        </label>
                        <input
                          name={`second_details_heading_${index}`}
                          value={form.third_details?.[index]?.heading || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.second_details || []];
                            updatedDetails[index] = {...updatedDetails[index], heading: e.target.value};
                            return { ...form, second_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.heading}
                        </div>
                        <label 
                          htmlFor={`second_details_description_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Description {index  + 1}
                        </label>
                        <input
                          name={`second_details_description_${index}`}
                          value={form.third_details?.[index]?.description || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.second_details || []];
                            updatedDetails[index] = {...updatedDetails[index], description: e.target.value};
                            return { ...form, second_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.third_title && (
                  <div key={`third_title`}>
                    <label htmlFor={`third_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Third Title
                    </label>
                    <input
                      name='third_title'
                      value={form.third_title}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.third_title}
                    </div>
                  </div>
                )}

                {data.third_subtitle && (
                  <div key={`third_subtitle`}> 
                    <label htmlFor={`third_subtitle`} className="block text-sm font-medium text-gray-700 my-2">
                      Third Subtitle
                    </label>
                    <input
                      name='third_subtitle'
                      value={form.third_subtitle}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.third_subtitle}
                    </div>
                  </div>
                )}

                {data.third_details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-2 pt-2 pb-4">Third Details</label>
                    {data.third_details.map((details, index) => (
                      <div key={`third_details_${index}`}>
                        <label 
                          htmlFor={`third_details_heading_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Heading {index + 1}
                        </label>
                        <input
                          name={`third_details_heading_${index}`}
                          // onChange={e => setForm(form => ({ ...form, third_details: e.target.value }))}
                          value={form.third_details?.[index]?.heading || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.third_details || []];
                            updatedDetails[index] = ({...updatedDetails[index], heading: e.target.value});
                            return { ...form, third_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.heading}
                        </div>
                        <label 
                          htmlFor={`third_details_description_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Description {index  + 1}
                        </label>
                        <input
                          name={`third_details_description_${index}`}
                          value={form.third_details?.[index]?.description || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.third_details || []];
                            updatedDetails[index] = {...updatedDetails[index], description: e.target.value};
                            return { ...form, third_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.fourth_title && (
                  <div key={`fourth_title`}>
                    <label htmlFor={`fourth_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Fourth Title
                    </label>
                    <input
                      name='fourth_title'
                      value={form.fourth_title}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.fourth_title}
                    </div>
                  </div>
                )}

                {data.fourth_subtitle && (
                  <div key={`fourth_subtitle`}>
                    <label htmlFor={`fourth_subtitle`} className="block text-sm font-medium text-gray-700 my-2">
                      Fourth Subtitle
                    </label>
                    <input
                      name='fourth_subtitle'
                      value={form.fourth_subtitle}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.fourth_subtitle}
                    </div>
                  </div>
                )}

                {data.fourth_details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-2 pt-2 pb-4">Fourth Details</label>
                    {data.fourth_details.map((details, index) => (
                      <div key={`fourth_details_${index}`}>
                        <label 
                          htmlFor={`fourth_details_heading_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Heading {index + 1}
                        </label>
                        <input
                          name={`fourth_details_heading_${index}`}
                          value={form.fourth_details?.[index]?.heading || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.fourth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], heading: e.target.value};
                            return { ...form, fourth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.heading}
                        </div>
                        <label 
                          htmlFor={`fourth_details_description_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Description {index  + 1}
                        </label>
                        <input
                          name={`fourth_details_description_${index}`}
                          value={form.fourth_details?.[index]?.description || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.fourth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], description: e.target.value};
                            return { ...form, fourth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.fifth_title && (
                  <div key={`fifth_title`}>
                    <label htmlFor={`fifth_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Fifth Title
                    </label>
                    <input
                      name='fifth_title'
                      value={form.fifth_title}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.fifth_title}
                    </div>
                  </div>
                )}

                {data.fifth_subtitle && (
                  <div key={`fifth_subtitle`}>
                    <label htmlFor={`fifth_subtitle`} className="block text-sm font-medium text-gray-700 my-2">
                      Fifth Subtitle
                    </label>
                    <input
                      name='fifth_subtitle'
                      value={form.fifth_subtitle}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.fifth_subtitle}
                    </div>
                  </div>
                )}

                {data.fifth_details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-2 pt-2 pb-4">Fifth Details</label>
                    {data.fifth_details.map((details, index) => (
                      <div key={`fifth_details_${index}`}>
                        <label 
                          htmlFor={`fifth_details_heading_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Heading {index + 1}
                        </label>
                        <input
                          name={`fifth_details_heading_${index}`}
                          value={form.fifth_details?.[index]?.heading || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.fifth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], heading: e.target.value};
                            return { ...form, fifth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.heading}
                        </div>
                        <label 
                          htmlFor={`fifth_details_description_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Description {index  + 1}
                        </label>
                        <input
                          name={`fifth_details_description_${index}`}
                          value={form.fifth_details?.[index]?.description || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.fifth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], description: e.target.value};
                            return { ...form, fifth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.sixth_title && (
                  <div key={`sixth_title`}>
                    <label htmlFor={`sixth_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Sixth Title
                    </label>
                    <input
                      name='sixth_title'
                      value={form.sixth_title}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.sixth_title}
                    </div>
                  </div>
                )}

                {data.sixth_subtitle && (
                  <div key={`sixth_subtitle`}>
                    <label htmlFor={`sixth_subtitle`} className="block text-sm font-medium text-gray-700 my-2">
                      Sixth Subtitle
                    </label>
                    <input
                      name='sixth_subtitle'
                      value={form.sixth_subtitle}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.sixth_subtitle}
                    </div>
                  </div>
                )}

                {data.sixth_details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-2 pt-2 pb-4">Sixth Details</label>
                    {data.sixth_details.map((details, index) => (
                      <div key={`sixth_details_${index}`}>
                        <label 
                          htmlFor={`sixth_details_heading_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Heading {index + 1}
                        </label>
                        <input
                          name={`sixth_details_heading_${index}`}
                          value={form.sixth_details?.[index]?.heading || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.sixth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], heading: e.target.value};
                            return { ...form, sixth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.heading}
                        </div>
                        <label 
                          htmlFor={`sixth_details_description_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Description {index  + 1}
                        </label>
                        <input
                          name={`sixth_details_description_${index}`}
                          value={form.sixth_details?.[index]?.description || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.sixth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], description: e.target.value};
                            return { ...form, sixth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.seventh_title && (
                  <div key={`seventh_title`}>
                    <label htmlFor={`seventh_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Seventh Title
                    </label>
                    <input
                      name='seventh_title'
                      value={form.seventh_title}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.seventh_title}
                    </div>
                  </div>
                )}

                {data.seventh_subtitle && (
                  <div key={`seventh_subtitle`}>
                    <label htmlFor={`seventh_subtitle`} className="block text-sm font-medium text-gray-700 my-2">
                      Seventh Subtitle
                    </label>
                    <input
                      name='seventh_subtitle'
                      value={form.seventh_subtitle}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.seventh_subtitle}
                    </div>
                  </div>
                )}

                {data.seventh_details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-2 pt-2 pb-4">Seventh Details</label>
                    {data.seventh_details.map((details, index) => (
                      <div key={`seventh_details_${index}`}>
                        <label 
                          htmlFor={`seventh_details_heading_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Heading {index + 1}
                        </label>
                        <input
                          name={`seventh_details_heading_${index}`}
                          value={form.seventh_details?.[index]?.heading || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.seventh_details || []];
                            updatedDetails[index] = {...updatedDetails[index], heading: e.target.value};
                            return { ...form, seventh_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.heading}
                        </div>
                        <label 
                          htmlFor={`seventh_details_description_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Description {index  + 1}
                        </label>
                        <input
                          name={`seventh_details_description_${index}`}
                          value={form.seventh_details?.[index]?.description || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.seventh_details || []];
                            updatedDetails[index] = {...updatedDetails[index], description: e.target.value};
                            return { ...form, seventh_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.eighth_title && (
                  <div key={`eighth_title`}>
                    <label htmlFor={`eighth_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Eighth Title
                    </label>
                    <input
                      name='eighth_title'
                      value={form.eighth_title}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.eighth_title}
                    </div>
                  </div>
                )}

                {data.eighth_subtitle && (
                  <div key={`eighth_subtitle`}>
                    <label htmlFor={`eighth_subtitle`} className="block text-sm font-medium text-gray-700 my-2">
                      Eighth Subtitle
                    </label>
                    <input
                      name='eighth_subtitle'
                      value={form.eighth_subtitle}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.eighth_subtitle}
                    </div>
                  </div>
                )}

                {data.eighth_details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-2 pt-2 pb-4">Eighth Details</label>
                    {data.eighth_details.map((details, index) => (
                      <div key={`eighth_details_${index}`}>
                        <label 
                          htmlFor={`eighth_details_heading_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Heading {index + 1}
                        </label>
                        <input
                          name={`eighth_details_heading_${index}`}
                          value={form.eighth_details?.[index]?.heading || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.eighth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], heading: e.target.value};
                            return { ...form, eighth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.heading}
                        </div>
                        <label 
                          htmlFor={`eighth_details_description_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Description {index  + 1}
                        </label>
                        <input
                          name={`eighth_details_description_${index}`}
                          value={form.eighth_details?.[index]?.description || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.eighth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], description: e.target.value};
                            return { ...form, eighth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.ninth_title && (
                  <div key={`ninth_title`}>
                    <label htmlFor={`ninth_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Ninth Title
                    </label>
                    <input
                      name='ninth_title'
                      value={form.ninth_title}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.ninth_title}
                    </div>
                  </div>
                )}

                {data.ninth_subtitle && (
                  <div key={`ninth_subtitle`}>
                    <label htmlFor={`ninth_subtitle`} className="block text-sm font-medium text-gray-700 my-2">
                      Ninth Subtitle
                    </label>
                    <input
                      name='ninth_subtitle'
                      value={form.ninth_subtitle}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.ninth_subtitle}
                    </div>
                  </div>
                )}

                {data.ninth_details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-2 pt-2 pb-4">Ninth Details</label>
                    {data.ninth_details.map((details, index) => (
                      <div key={`ninth_details_${index}`}>
                        <label 
                          htmlFor={`ninth_details_heading_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Heading {index + 1}
                        </label>
                        <input
                          name={`ninth_details_heading_${index}`}
                          value={form.ninth_details?.[index]?.heading || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.ninth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], heading: e.target.value};
                            return { ...form, ninth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.heading}
                        </div>
                        <label 
                          htmlFor={`ninth_details_description_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Description {index  + 1}
                        </label>
                        <input
                          name={`ninth_details_description_${index}`}
                          value={form.ninth_details?.[index]?.description || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.ninth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], description: e.target.value};
                            return { ...form, ninth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.tenth_title && (
                  <div key={`tenth_title`}>
                    <label htmlFor={`tenth_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Tenth Title
                    </label>
                    <input
                      name='tenth_title'
                      value={form.tenth_title}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.tenth_title}
                    </div>
                  </div>
                )}

                {data.tenth_subtitle && (
                  <div key={`tenth_subtitle`}>
                    <label htmlFor={`tenth_subtitle`} className="block text-sm font-medium text-gray-700 my-2">
                      Tenth Subtitle
                    </label>
                    <input
                      name='tenth_subtitle'
                      value={form.tenth_subtitle}
                      onChange={e => handleChange(e)}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.tenth_subtitle}
                    </div>
                  </div>
                )}

                {data.tenth_details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 my-2 pt-2 pb-4">Tenth Details</label>
                    {data.tenth_details.map((details, index) => (
                      <div key={`tenth_details_${index}`}>
                        <label 
                          htmlFor={`tenth_details_heading_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Heading {index + 1}
                        </label>
                        <input
                          name={`tenth_details_heading_${index}`}
                          value={form.tenth_details?.[index]?.heading || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.tenth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], heading: e.target.value};
                            return { ...form, tenth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.heading}
                        </div>
                        <label 
                          htmlFor={`tenth_details_description_${index}`} 
                          className="block text-sm font-medium text-gray-700 my-2 ml-6">
                          Description {index  + 1}
                        </label>
                        <input
                          name={`tenth_details_description_${index}`}
                          value={form.tenth_details?.[index]?.description || ''}
                          onChange={e => setForm(form => {
                            const updatedDetails = [...form.tenth_details || []];
                            updatedDetails[index] = {...updatedDetails[index], description: e.target.value};
                            return { ...form, tenth_details: updatedDetails };
                          })}
                          className="border rounded px-2 py-1 w-full h-auto ml-6"
                        />
                        <div className="text-xs text-gray-400 mt-2 mb-6 ml-6">
                          {details.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.left_column_title && (
                  <div key={`left_column_title`}>
                    <label htmlFor={`left_column_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Left Column Title
                    </label>
                    <input
                      name='left_column_title'
                      onChange={e => handleChange(e)}
                      value={form.left_column_title}
                      className="border rounded px-2 py-1 w-full h-auto"
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.left_column_title}
                    </div>
                  </div>
                )}

                {data.left_column_subtitle && (
                  <div key={`left_column_subtitle`}>
                    <label htmlFor={`left_column_subtitle`} className="block text-sm font-medium text-gray-700 my-2">
                      Left Column Subtitle
                    </label>
                    <input
                      name='left_column_subtitle'
                      onChange={e => handleChange(e)}
                      value={form.left_column_subtitle}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.left_column_subtitle}
                    </div>
                  </div>
                )}

                {data.left_column_logo && (
                  <div key={`left_column_logo`}>
                    <label htmlFor={`left_column_logo`} className="block text-sm font-medium text-gray-700 my-2">
                      Left Column Logo
                    </label>
                    <input
                      name='left_column_logo'
                      onChange={e => handleChange(e)}
                      value={form.left_column_logo}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.left_column_logo}
                    </div>
                  </div>
                )}

                {data.center_column_title && (
                  <div key={`center_column_title`}>
                    <label htmlFor={`center_column_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Center Column Title
                    </label>
                    <input
                      name='center_column_title'
                      onChange={e => handleChange(e)}
                      value={form.center_column_title}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.center_column_title}
                    </div>
                  </div>
                )}

                {data.right_column_title && (
                  <div key={`right_column_title`}>
                    <label htmlFor={`right_column_title`} className="block text-sm font-medium text-gray-700 my-2">
                      Right Column Title
                    </label>
                    <input
                      name='right_column_title'
                      onChange={e => handleChange(e)}
                      value={form.right_column_title}
                      className="border rounded px-2 py-1 w-full h-auto"
                      
                    />
                    <div className="text-xs text-gray-400 mt-2 mb-6">
                      {data.right_column_title}
                    </div>
                  </div>
                )}

              </>

            ))}

          </div>
        
        <button className="btn btn-primary btn-sm my-6" type="submit">Update Content</button>
        {/* {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({ name: '', service_key: '', short_description: '', details: '', is_active: true }); }}>Cancel</button>} */}
      </form> }

    {/* <button className="btn btn-xs btn-primary" onClick={() => { setForm(service); setId(service.id); }}>Edit</button> */}
    {/* <button className="btn btn-xs btn-danger bg-red-600 text-white" type="button" onClick={() => handleDelete(service.id)}>Delete</button> */}
            
  </div>
);
}

// export default PageContent;
