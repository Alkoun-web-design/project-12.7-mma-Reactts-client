import React, { useState, useEffect } from 'react';
import { handleGetData, serverAPI } from '../Utilities';
import type { EducationalServiceForm, EducationalService } from '../../types/types';

interface AdminSectionProps {
  // data: EducationalService[];
  // form: EducationalServiceForm;
  // id: number | null;
  // error?: string | null;
  // setForm: (form: EducationalServiceForm) => void;
  // setId: (id: number | null) => void;
  // handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSubmit: (e: React.FormEvent) => void;
  // handleDelete: (id: number) => void;
  apiEndpoint: string;
}

  const blankForm = { name: '', service_key: '', short_description: '', details: '', is_active: 0 };

const EducationalServicesAdminSection: React.FC<AdminSectionProps> = ({
  // data,
  // form,
  // id,
  // error,
  // setForm,
  // setId,
  // handleFormChange,
  // handleSubmit,
  // handleDelete
  apiEndpoint }) => {

const [data, setData] = useState<EducationalService[]>([]);
                      const [id, setId] = useState<number | null>(null);
                      const [loading, setLoading] = useState(true);
                      const [form, setForm] = useState<EducationalServiceForm>(blankForm);
                  
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
      Educational Services
    </h2>
    {loading && <div className="text-gray-900 mb-2">Loading...</div>}    
    {data && ( 
      <>
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleAddOrUpdateData}>
      <div>
        <input name="name" value={form.name} onChange={handleFormChange} placeholder="Name" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name of the educational service</div>
      </div>
      <div>
        <input name="service_key" value={form.service_key} onChange={handleFormChange} placeholder="Key" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Unique key for the service</div>
      </div>
      <div>
        <input name="short_description" value={form.short_description} onChange={handleFormChange} placeholder="Short Description" className="border rounded px-2 py-1" />
        <div className="text-xs text-gray-400 mt-1">Brief description of the service</div>
      </div>
      <div>
        <input name="details" value={form.details} onChange={handleFormChange} placeholder="Details" className="border rounded px-2 py-1" />
        <div className="text-xs text-gray-400 mt-1">Detailed information about the service</div>
      </div>
      <div>
        <input name="is_active" value={form.is_active} onChange={handleFormChange} placeholder="Is the service Active" className="border rounded px-2 py-1" />
        <div className="text-xs text-gray-400 mt-1">1 for Yes, 0 for No </div>
      </div>
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} Service</button>
      {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({ name: '', service_key: '', short_description: '', details: '', is_active: 0 }); }}>Cancel</button>}
    </form>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="py-2">Name</th>
          <th className="py-2">Key</th>
          <th className="py-2">Short Description</th>
          <th className="py-2">Details</th>
          <th className="py-2">Active</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(service => (
          <tr key={service.id} className="border-b">
            <td className="p-2">{service.name}</td>
            <td className="p-2">{service.service_key}</td>
            <td className="p-2">{service.short_description}</td>
            <td className="p-2">{service.details}</td>
            <td className="p-2">{service.is_active}</td>
            <td className="p-2 flex gap-2">
              <button className="btn btn-xs btn-primary" onClick={() => { setForm(service); setId(service.id); }}>Edit</button>
              <button className="btn btn-xs btn-danger bg-red-600 text-white" type="button" onClick={() => handleDelete(service.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>)}
  </div>
  )
}

export default EducationalServicesAdminSection;
