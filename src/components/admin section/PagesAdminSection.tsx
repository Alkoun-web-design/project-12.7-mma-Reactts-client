import React, { useState } from 'react';
import PageContent from './PageContent';
// import { motion } from 'framer-motion';

interface Page {
  key: string;
  label: string;
}

interface PageContent {
  [key: string]: any;
}

const pageList: Page[] = [
  { key: 'home', label: 'Home' },
  { key: 'homeschooling', label: 'Homeschooling' },
  { key: 'one-on-one', label: 'One on One' },
  { key: 'combined-classes', label: 'Combined Classes' },
  { key: 'standardized-test-prep', label: 'Standardized Test Prep' },
  { key: 'study-coaching', label: 'Study Coaching & Counsellling' },
  { key: 'student-activities', label: 'Student Clubs & Activities' },
  { key: 'academic-resources', label: 'Academic Resources' },
  { key: 'learn-languages', label: 'Learn Languages' },
  { key: 'our-staff', label: 'Our Staff' },
  { key: 'faqs', label: 'FAQs' },
  { key: 'pricing', label: 'Pricing' },
  { key: 'get-in-touch', label: 'Get In Touch' },
  { key: 'footer', label: 'Footer' },
  { key: 'educational-services', label: 'Educational Services' }
];

export default function PagesAdminSection(){

  const [page, setPage] = useState('none');

  return (
    <>
      <div className="w-full text-sm bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
          Pages
        </h2>
        { page === 'none' && 
          pageList.map((page) => (
            <div className="p-2 w-auto my-2 rounded-md hover:bg-gray-100 hover:cursor-pointer" key={page.key} onClick={()=> setPage(page.key)}>
              <h2>{page.label}</h2>
            </div>
          ))
        }
        { page === 'home' && 
          <PageContent 
            page={page}
            label={pageList[0].label}
            setPage={setPage}
          />
        }
        { page === 'homeschooling' && 
          <PageContent 
            page={page}
            label={pageList[1].label}
            setPage={setPage}
          /> 
        }
        { page === 'one-on-one' && 
          <PageContent 
            page={page}
            label={pageList[2].label}
            setPage={setPage}
          /> 
        }
        { page === 'combined-classes' && 
          <PageContent 
            page={page}
            label={pageList[3].label}
            setPage={setPage}
          />
        }
        { page === 'standardized-test-prep' && 
          <PageContent 
            page={page}
            label={pageList[4].label}
            setPage={setPage}
          />
        }
        { page === 'study-coaching' && 
          <PageContent 
            page={page}
            label={pageList[5].label}
            setPage={setPage}
          />
        }
        { page === 'student-activities' && 
          <PageContent 
            page={page}
            label={pageList[6].label}
            setPage={setPage}
          />
        }
        { page === 'academic-resources' && 
          <PageContent 
            page={page}
            label={pageList[7].label}
            setPage={setPage}
          />
        }
        { page === 'learn-languages' && 
          <PageContent 
            page={page}
            label={pageList[8].label}
            setPage={setPage}
          />
        }
        { page === 'our-staff' && 
          <PageContent 
            page={page}
            label={pageList[9].label}
            setPage={setPage}
          />
        }
        { page === 'faqs' && 
          <PageContent 
            page={page}
            label={pageList[10].label}
            setPage={setPage}
          />
        }
        { page === 'pricing' && 
          <PageContent 
            page={page}
            label={pageList[11].label}
            setPage={setPage}
          />
        }
        { page === 'get-in-touch' && 
          <PageContent 
            page={page}
            label={pageList[12].label}
            setPage={setPage}
          />
        }
        { page === 'footer' && 
          <PageContent 
            page={page}
            label={pageList[13].label}
            setPage={setPage}
          />
        }
        { page === 'educational-services' && 
          <PageContent 
            page={page}
            label={pageList[14].label}
            setPage={setPage}
          />
        }
      </div>
    </>
  )
}

// const PagesAdminSection: React.FC<PagesAdminSectionProps> = ({
  // editingPageKey,
  // editForm,
  // handleEditFormChange,
  // handleSavePageContent,
  // saveStatus,
  // educationalDropdownOpen,
  // setEducationalDropdownOpen,
  // setEditingPageKey,
  // handleEditPageContent,
  // PAGE_LIST,
  // EDUCATIONAL_SERVICES_SUBPAGES,
// }) => {

  // Sync with parent editForm (when switching pages)
  // useEffect(() => {
  //   if (editingPageKey === 'faqs' && editForm?.faqs) setFaqList(editForm.faqs);
  // }, [editingPageKey, editForm]);

  // // CRUD handlers
  // const handleAddFaq = async () => {
  //   setFaqLoading(true); setFaqError(null);
  //   try {
  //     const res = await fetch('http://localhost:5000/api/pages/content/faqs', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //       body: JSON.stringify(newFaq),
  //     });
  //     if (!res.ok) throw new Error('Failed to add FAQ');
  //     const refreshed = await fetch('http://localhost:5000/api/pages/content/faqs', { credentials: 'include' });
  //     setFaqList(await refreshed.json());
  //     setNewFaq({ question: '', answer: '', category: '' });
  //   } catch (e: any) {
  //     setFaqError(e.message || 'Error adding FAQ');
  //   } finally { setFaqLoading(false); }
  // };
  // const handleEditFaq = (faq: any) => {
  //   setEditingFaqId(faq.id);
  //   setEditingFaq({ question: faq.question, answer: faq.answer, category: faq.category });
  // };
  // const handleUpdateFaq = async (id: number) => {
  //   setFaqLoading(true); setFaqError(null);
  //   try {
  //     const res = await fetch(`http://localhost:5000/api/pages/content/faqs/${id}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //       body: JSON.stringify(editingFaq),
  //     });
  //     if (!res.ok) throw new Error('Failed to update FAQ');
  //     const refreshed = await fetch('http://localhost:5000/api/pages/content/faqs', { credentials: 'include' });
  //     setFaqList(await refreshed.json());
  //     setEditingFaqId(null);
  //   } catch (e: any) {
  //     setFaqError(e.message || 'Error updating FAQ');
  //   } finally { setFaqLoading(false); }
  // };
  // const handleDeleteFaq = async (id: number) => {
  //   if (!window.confirm('Delete this FAQ?')) return;
  //   setFaqLoading(true); setFaqError(null);
  //   try {
  //     const res = await fetch(`http://localhost:5000/api/pages/content/faqs/${id}`, { 
  //       method: 'DELETE',
  //       credentials: 'include'
  //     });
  //     if (!res.ok) throw new Error('Failed to delete FAQ');
  //     setFaqList(faqList.filter(f => f.id !== id));
  //   } catch (e: any) {
  //     setFaqError(e.message || 'Error deleting FAQ');
  //   } finally { setFaqLoading(false); }
  // };

  // const renderEditForm = () => {
  //   if (!editingPageKey) return null;

  //   const commonFields = (
  //     <>
  //       <div className="mb-4">
  //         <label className="block text-sm font-medium text-gray-700">Title</label>
  //         <input
  //           type="text"
  //           name="title"
  //           value={editForm.title || ''}
  //           onChange={handleEditFormChange}
  //           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-sm font-medium text-gray-700">Subtitle</label>
  //         <textarea
  //           name="subtitle"
  //           value={editForm.subtitle || ''}
  //           onChange={handleEditFormChange}
  //           rows={3}
  //           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //         />
  //       </div>
  //     </>
  //   );

  //   switch (editingPageKey) {
  //     case 'home':
  // return (
  //         <>
  //           {commonFields}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700">Hero Title</label>
  //             <input
  //               type="text"
  //               name="hero_title"
  //               value={editForm.hero_title || ''}
  //               onChange={handleEditFormChange}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
  //             <textarea
  //               name="hero_subtitle"
  //               value={editForm.hero_subtitle || ''}
  //               onChange={handleEditFormChange}
  //               rows={3}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700">About Title</label>
  //             <input
  //               type="text"
  //               name="about_title"
  //               value={editForm.about_title || ''}
  //               onChange={handleEditFormChange}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700">About Content</label>
  //             <textarea
  //               name="about_content"
  //               value={editForm.about_content || ''}
  //               onChange={handleEditFormChange}
  //               rows={5}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //             />
  //             </div>
  //         </>
  //       );

  //     case 'pricing':
  //       return (
  //         <>
  //           {commonFields}
  //           {['basic', 'standard', 'premium'].map((plan) => (
  //             <div key={plan} className="mb-6 p-4 border rounded-lg">
  //               <h3 className="text-lg font-medium mb-4 capitalize">{plan} Plan</h3>
  //               <div className="mb-4">
  //                 <label className="block text-sm font-medium text-gray-700">Plan Name</label>
  //                 <input
  //                   type="text"
  //                   name={`${plan}_plan_name`}
  //                   value={editForm[`${plan}_plan_name`] || ''}
  //                   onChange={handleEditFormChange}
  //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //                 />
  //               </div>
  //               <div className="mb-4">
  //                 <label className="block text-sm font-medium text-gray-700">Price</label>
  //                 <input
  //                   type="text"
  //                   name={`${plan}_plan_price`}
  //                   value={editForm[`${plan}_plan_price`] || ''}
  //                   onChange={handleEditFormChange}
  //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //                 />
  //           </div>
  //               <div className="mb-4">
  //                 <label className="block text-sm font-medium text-gray-700">Features</label>
  //                 <textarea
  //                   name={`${plan}_plan_features`}
  //                   value={editForm[`${plan}_plan_features`] || ''}
  //                   onChange={handleEditFormChange}
  //                   rows={4}
  //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //                 />
  //               </div>
  //               </div>
  //             ))}
  //         </>
  //       );

  //     case 'staff':
  //       return (
  //         <>
  //           {commonFields}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700">Team Introduction</label>
  //             <textarea
  //               name="team_intro"
  //               value={editForm.team_intro || ''}
  //               onChange={handleEditFormChange}
  //               rows={5}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //             />
  //           </div>
  //         </>
  //       );

  //     case 'contact':
  //       return (
  //         <>
  //           {commonFields}
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700">Address</label>
  //             <textarea
  //               name="address"
  //               value={editForm.address || ''}
  //               onChange={handleEditFormChange}
  //               rows={3}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700">Phone</label>
  //             <input
  //               type="text"
  //               name="phone"
  //               value={editForm.phone || ''}
  //               onChange={handleEditFormChange}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //             />
  //           </div>
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700">Email</label>
  //             <input
  //               type="email"
  //               name="email"
  //               value={editForm.email || ''}
  //               onChange={handleEditFormChange}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //             />
  //               </div>
  //           <div className="mb-4">
  //             <label className="block text-sm font-medium text-gray-700">Hours</label>
  //             <textarea
  //               name="hours"
  //               value={editForm.hours || ''}
  //               onChange={handleEditFormChange}
  //               rows={3}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //             />
  //           </div>
  //         </>
  //       );

  //     case 'academic_resources':
  //     case 'homeschooling':
  //     case 'learn_languages':
  //     case 'standardized_test_prep':
  //     case 'student_clubs':
  //     case 'combined_classes':
  //     case 'one_on_one':
  //       const prefix = editingPageKey === 'academic_resources' ? 'resource' :
  //                     editingPageKey === 'homeschooling' ? 'program' :
  //                     editingPageKey === 'learn_languages' ? 'language' :
  //                     editingPageKey === 'standardized_test_prep' ? 'test' :
  //                     editingPageKey === 'student_clubs' ? 'club' :
  //                     editingPageKey === 'combined_classes' ? 'class' : 'benefit';

        // return (
        //   <>
            {/* {commonFields}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Introduction Content</label>
              <textarea
                name="intro_content"
                value={editForm.intro_content || ''}
                onChange={handleEditFormChange}
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {[1, 2, 3].map((num) => (
              <div key={num} className="mb-6 p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-4 capitalize">{prefix} {num}</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name={`${prefix}${num}_title`}
                    value={editForm[`${prefix}${num}_title`] || ''}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    name={`${prefix}${num}_content`}
                    value={editForm[`${prefix}${num}_content`] || ''}
                    onChange={handleEditFormChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            ))}
          </>
        );

      default:
        return null; */}
    {/* }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PAGE_LIST.map((page) => (
          <button
            key={page.key}
            onClick={() => handleEditPageContent(page.key)}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium">{page.label}</h3>
          </button>
          ))}
        </div>

      {editingPageKey && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-bold mb-4">
            Edit {PAGE_LIST.find(p => p.key === editingPageKey)?.label} Content
          </h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSavePageContent(); }}>
            {renderEditForm()}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditingPageKey(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
            {saveStatus && (
              <div className={`mt-4 p-2 rounded ${
                saveStatus.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {saveStatus}
              </div>
            )}
          </form>
        </motion.div>
      )}
    </div>
  );
}; */}
