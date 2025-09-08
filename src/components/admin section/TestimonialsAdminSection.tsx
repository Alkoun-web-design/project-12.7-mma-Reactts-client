import React, { useState, useEffect } from 'react';
import { handleGetData, serverAPI } from '../Utilities';
import type { Testimonial, TestimonialForm } from '../../types/types';

interface AdminSectionProps {
  // data: Testimonial[];
  // form: TestimonialForm;
  // id: number | null;
  // error?: string | null;
  // setForm: (form: TestimonialForm) => void;
  // setId: (id: number | null) => void;
  // handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSubmit: (e: React.FormEvent) => void;
  // handleDelete: (id: number) => void;
  apiEndpoint: string;
}
  
const blankForm = { student_name: '', success_stories: '', testimonial: '', service_id: '' };

const TestimonialsAdminSection: React.FC<AdminSectionProps> = ({
  // data,
  // form,
  // id,
  // error,
  // setForm,
  // setId,
  // handleFormChange,
  // handleSubmit,
  // handleDelete
  apiEndpoint}) => {

      const [data, setData] = useState<Testimonial[]>([]);
                    const [id, setId] = useState<number | null>(null);
                    const [loading, setLoading] = useState(true);
                    const [form, setForm] = useState<TestimonialForm>(blankForm);
                
                    useEffect(() => { 
                      handleGetData( apiEndpoint, setData, setLoading);
                    }, [id, apiEndpoint]);
                
                    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                      setForm({ ...form, [e.target.name]: e.target.value });
                    };
                    
                    const handleAddOrUpdateData = async (e: React.FormEvent) => {
                      e.preventDefault();
              
                      try {
                        const method = id ? 'PUT' : 'POST';
                        const url = id
                          ? `${serverAPI}${apiEndpoint}/${id}`
                          : `${serverAPI}${apiEndpoint}`;
                        const response = await fetch(url, {
                          method,
                          headers: {'Content-Type': 'application/json'},
                          credentials: 'include',
                          body: JSON.stringify(form)
                        });
                        if (!response.ok) throw new Error('Failed to save data');
                        setForm(f => ({ ...f, ...data }));
                        setId(null);
                        const refreshed = await fetch(`${serverAPI}${apiEndpoint}`, { credentials: 'include' });
                        setData(await refreshed.json());
                      } catch (err: unknown) {
                        console.error(err || 'Error saving data.');
                      }
                    };
              
                const handleDelete = async (id:number) => {
                  if (!window.confirm(`Delete this data`)) return;
                  try {
                    const res = await fetch(`${serverAPI}${apiEndpoint}/${id}`, { method: 'DELETE', credentials: 'include' });
                    if (!res.ok) throw new Error(`Failed to delete data`);
                    const refreshed = await fetch(`${serverAPI}${apiEndpoint}`, { credentials: 'include' });
                    setData(await refreshed.json());
                  } catch (err: unknown) {
                    console.error(err || `Failed to delete data`);
                  }
                };
          
            return (

  <div className="w-full bg-white rounded-lg shadow p-8">
    <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
      Student Testimonials
    </h2>
    {loading && <div className="text-gray-900 mb-2">Loading...</div>}    
    {data && ( 
      <>
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleAddOrUpdateData}>
      <div>
        <input name="student_name" value={form.student_name} onChange={handleFormChange} placeholder="Student Name" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Full name of the student</div>
      </div>
      <div>
        <input name="testimonial" value={form.testimonial} onChange={handleFormChange} placeholder="Testimonial" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Testimonial text</div>
      </div>
      <div>
        <input name="service_id" value={form.service_id} onChange={handleFormChange} placeholder="Service ID" className="border rounded px-2 py-1" />
        <div className="text-xs text-gray-400 mt-1">ID of the related service</div>
      </div>
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} Testimonial</button>
      {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({ student_name: '', testimonial: '', success_stories: '', service_id: '' }); }}>Cancel</button>}
    </form>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="py-2">Student Name</th>
          <th className="py-2">Testimonial</th>
          <th className="py-2">Success Stories</th>
          <th className="py-2">Service ID</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(t => (
          <tr key={t.id} className="text-left border-b">
            <td className="p-2">{t.student_name}</td>
            <td className="p-2">{t.testimonial}</td>
            <td className="p-2">{t.success_stories}</td>
            <td className="p-2">{t.service_id}</td>
            <td className="p-2 flex gap-2">
              <button className="btn btn-xs btn-primary" onClick={() => { setForm(t); setId(t.id); }}>Edit</button>
              <button className="btn btn-xs btn-danger bg-red-600 text-white" type="button" onClick={() => handleDelete(t.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>)}
  </div>
  );
}

export default TestimonialsAdminSection;
