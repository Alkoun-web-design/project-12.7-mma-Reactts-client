import React, { useState, useEffect } from 'react';
import { handleGetData, serverAPI } from '../Utilities';
import type { ServicePricing, ServicePricingForm} from '../../types/types'
 

interface AdminSectionProps {
  // data: ServicePricing[];
  // form: ServicePricingForm;
  // id: number | null;
  // setForm: (form: ServicePricingForm) => void;
  // setId: (id: number | null) => void;
  // handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSubmit: (e: React.FormEvent) => void;
  // handleDelete: (id: number) => void;
  apiEndpoint: string;
}

const blankForm = { service: '', individual: '', package: '', link_to: '', order_index: 0, is_active: 0 };

const ServicePricingAdminSection: React.FC<AdminSectionProps> = ({
    // data,
    // form,
    // id,
    // setForm,
    // setId,
    // handleFormChange,
    // handleSubmit,
    // handleDelete,
  apiEndpoint }) => {

        const [data, setData] = useState<ServicePricing[]>([]);
        const [id, setId] = useState<number | null>(null);
        const [loading, setLoading] = useState(true);
        const [form, setForm] = useState<ServicePricingForm>(blankForm);
    
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
      Service Pricing
    </h2>
    {loading && <div className="text-gray-900 mb-2">Loading...</div>}    
    {data && ( 
      <>
      <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleAddOrUpdateData}>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
      <input name="name" value={form.service} onChange={handleFormChange} placeholder="Name" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name of the service</div>
      </div>
      <div>
        <input name="individual" value={form.individual} onChange={handleFormChange} placeholder="Individual Plan" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name for individual plan</div>
      </div>
      <div>
        <input name="package" value={form.package} onChange={handleFormChange} placeholder="Package" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name of the package</div>
      </div>
      <div>
        <input name="link" value={form.package} onChange={handleFormChange} placeholder="Link" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Start with '/educational-services/' </div>
      </div>
      <div>
        <input name="order_index" value={form.package} onChange={handleFormChange} placeholder="Order Index" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Order index </div>
      </div>
      <div>
        <input name="is_active" value={form.is_active} type="number" onChange={handleFormChange} placeholder="Is the service active?" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">1 for Yes, 0 for No </div>
      </div>
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} Service Price</button>
      {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({ service: '', individual: '', package: '', link_to: '', order_index: 0, is_active: 0 }); }}>Cancel</button>}
    </form>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="py-2">Service</th>
          <th className="py-2">Individual</th>
            <th className="py-2">Package</th>
          <th className="py-2">Link</th>
          <th className="py-2">Order Index</th>
          <th className="py-2">Active</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-b">
            <td className="p-2">{item.service}</td>
            <td className="p-2">{item.individual}</td>
            <td className="p-2">{item.package}</td>
            <td className="p-2">{item.link_to}</td>
            <td className="p-2">{item.order_index}</td>
            <td className="p-2">{item.is_active}</td>
            <td className="p-2 flex gap-2">
              <button className="btn btn-xs btn-primary" onClick={() => { setForm(item); setId(item.id); }}>Edit</button>
              <button className="btn btn-xs btn-danger bg-red-600 text-white" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>)
    }
  </div>
)};

export default ServicePricingAdminSection;


