import React from 'react';
import type { ServicePricing, ServicePricingForm} from '../../types/types'
 

interface AdminSectionProps {
  data: ServicePricing[];
  form: ServicePricingForm;
  id: number | null;
  setForm: (form: ServicePricingForm) => void;
  setId: (id: number | null) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: (id: number) => void;
}

const ServicePricingAdminSection: React.FC<AdminSectionProps> = ({
  data,
  form,
  id,
  setForm,
  setId,
  handleFormChange,
  handleSubmit,
  handleDelete,
}) => (
  <div className="w-full bg-white rounded-lg shadow p-8">
    <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
      Service Pricing
    </h2>
    {!data && <div className="text-red-600 mb-2">There was a problem with loading the data.</div>}
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleSubmit}>
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
  </div>
);

export default ServicePricingAdminSection;


