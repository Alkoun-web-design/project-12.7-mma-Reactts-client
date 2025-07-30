import React from 'react';

interface Pricing { 
  id: number; 
  name: string; 
  description: string; 
  price: string; 
  annual_price: string;
  annual_description: string;
  features: string; 
  popular: number;
  link_to: string;
  order_index: number;
  is_active: number;
}
interface AdminSectionProps {
  data: Pricing[];
  form: any;
  id: number | null;
  setForm: (form: any) => void;
  setId: (id: number | null) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  // handleEdit: (user: User) => void;
  handleDelete: (id: number) => void;
}

const PricingAdminSection: React.FC<AdminSectionProps> = ({
  data,
  form,
  id,
  setForm,
  setId,
  handleFormChange,
  handleSubmit,
  // handleEdit: (user: User) => void;
  handleDelete,
}) => (
  <div className="w-full bg-white rounded-lg shadow p-8">
    <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
        Pricing
    </h2>
        {!data && <div className="text-red-600 mb-2">There was a problem with loading the data.</div>}
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleSubmit}>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
        <input name="name" value={form.plan_name} onChange={handleFormChange} placeholder="Plan Name" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name of the price plan</div>
      </div>
      <div>
        <input name="plan_description" value={form.plan_description} onChange={handleFormChange} placeholder="Plan Description" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Describe the plan</div>
      </div>
      <div>        
        <input name="price" value={form.price} onChange={handleFormChange} placeholder="Price" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">The monthly price of the plan</div>
      </div>
      <div>
        <input name="price" value={form.annual_price} onChange={handleFormChange} placeholder="Annual Price" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">The annual price of the plan</div>      
      </div>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
        <input name="features" value={form.features} onChange={handleFormChange} placeholder="Features" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Features of the price plan</div>
      </div>
      <div>
        <input name="popular" value={form.popular} onChange={handleFormChange} placeholder="Is The Plan Popular?" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">1 for Yes, 0 for No</div>
      </div>
      <div>
        <input name="link_to" value={form.popular} onChange={handleFormChange} placeholder="Link" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Link to '/get-in-touch" to send to contact details</div>
      </div>
      <div>
        <input name="order_index" value={form.popular} onChange={handleFormChange} placeholder="Order Index" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Order of the price plan, 1 for first</div>
      </div>
      <div>
        <input name="is_active" value={form.popular} onChange={handleFormChange} placeholder="Is The Plan Active?" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">1 for Yes, 0 for No</div>
      </div>
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} Price Plan</button>
        {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({  name: '', description: '', price: '',   annual_price: '', annual_description: '', features: '', popular: '', link_to: '', order_index: '', is_active:'' })}}>Cancel</button>}
    </form>
    <div className='overflow-x-auto'>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="py-2">Plan Name</th>
          <th className="py-2">Description</th>
          <th className="py-2">Price</th>
          <th className="py-2">Annual Price</th>
          <th className="py-2">Annual Description</th>
          <th className="py-2">Features</th>
          <th className="py-2">Popular</th>
          <th className="py-2">Link</th>
          <th className="py-2">Order</th>
          <th className="py-2">Active</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="text-left border-b">
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.description}</td>
            <th className="p-2">{item.price}</th>
            <th className="p-2">{item.annual_price}</th>
            <th className="p-2">{item.annual_description}</th>
            <th className="p-2">{item.features}</th>
            <th className="p-2">{item.popular}</th>
            <th className="p-2">{item.link_to}</th>
            <th className="p-2">{item.order_index}</th>
            <th className="p-2">{item.is_active}</th>
            <td className="p-2 flex gap-2">
              <button className="btn btn-xs btn-primary" onClick={() => { setForm(item); setId(item.id); }}>Edit</button>
              <button className="btn btn-xs btn-danger bg-red-600 text-white" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
);

export default PricingAdminSection;


