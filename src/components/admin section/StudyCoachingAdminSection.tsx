import React, { useState, useEffect } from 'react';
import { handleGetData, serverAPI } from '../Utilities';
import type { CoachingArea, CoachingAreaForm} from '../../types/types';

interface AdminSectionProps {
  // data: CoachingArea[];
  // form: CoachingAreaForm;
  // id: number | null;
  // setForm: (form: CoachingAreaForm) => void;
  // setId: (id: number | null) => void;
  // handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSubmit: (e: React.FormEvent) => void;
  // // handleEdit: (user: User) => void;
  // handleDelete: (id: number) => void;
  apiEndpoint: string;
}

  const blankForm = { title: '', description: '', benefits: '', logo: '' }


const StudyCoachingAdminSection: React.FC<AdminSectionProps> = ({
  // data,
  // form,
  // id,
  // setForm,
  // setId,
  // handleFormChange,
  // handleSubmit,
  // // handleEdit: (user: User) => void;
  // handleDelete,
  apiEndpoint }) => {

        const [data, setData] = useState<CoachingArea[]>([]);
        const [id, setId] = useState<number | null>(null);
        const [loading, setLoading] = useState(true);
        const [form, setForm] = useState<CoachingAreaForm>(blankForm);
    
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
        Study Coaching
    </h2>
    {loading && <div className="text-gray-900 mb-2">Loading...</div>}    
    {data && ( 
      <>
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleAddOrUpdateData}>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
      <input name="title" value={form.title} onChange={handleFormChange} placeholder="Title" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name of the coaching area</div>
      </div>
      <div>
        <input name="description" value={form.description} onChange={handleFormChange} placeholder="Description" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Describe the coaching area</div>
        </div>
        <div>        
        <input name="benefits" value={form.benefits} onChange={handleFormChange} placeholder="Benefits" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">The benefits</div>
      </div>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
      <input name="logo" value={form.logo} onChange={handleFormChange} placeholder="Logo" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Logo (start with '/')</div>
      </div>
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} Coaching Area</button>
      {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({ title: '', description: '', benefits: '', logo:'' })}}>Cancel</button>}
    </form>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="py-2">Title</th>
          <th className="py-2">Description</th>
            <th className="py-2">Benefits</th>
            <th className="py-2">Logo</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="text-left border-b">
            <td className="p-2">{item.title}</td>
            <td className="p-2">{item.description}</td>
            <th className="p-2">{item.benefits}</th>
            <th className="p-2">{item.logo}</th>
            <td className="p-2 flex gap-2">
              <button className="btn btn-xs btn-primary" onClick={() => { setForm(item); setId(item.id); }}>Edit</button>
              <button className="btn btn-xs btn-danger bg-red-600 text-white" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>)}
  </div>
  )
};

export default StudyCoachingAdminSection;


