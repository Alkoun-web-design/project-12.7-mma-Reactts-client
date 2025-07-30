import React from 'react';

interface AcademicResource { 
  id: number; 
  category_title: string; 
  description: string;
  icon: string; 
  features: string;
}
interface AdminSectionProps {
  data: AcademicResource[];
  form: any;
  id: number | null;
  setForm: (form: any) => void;
  setId: (id: number | null) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  // handleEdit: (user: User) => void;
  handleDelete: (id: number) => void;
}

const AcademicResourcesAdminSection: React.FC<AdminSectionProps> = ({
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
        Academic Resources
    </h2>
    {!data && <div className="text-red-600 mb-2">There was a problem with loading the data.</div>}    
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleSubmit}>
      <div>
        <input name="category_name" value={form.category_title} onChange={handleFormChange} placeholder="Category Name" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name of the category</div>
      </div>
      <div>
        <input name="description" value={form.description} onChange={handleFormChange} placeholder="Description" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Description of the activity</div>
      </div>
      <div>  
        <input name="icon" value={form.icon} onChange={handleFormChange} placeholder="Icon" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Icon for the resouerce (start with "/")</div>
      </div>
      <div>        
        <input name="features" value={form.icon} onChange={handleFormChange} placeholder="Features" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Features of the resource</div>
      </div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} Resource</button>
      {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({ category_title: '', description: '', icon: '', features: ''}) }}>Cancel</button>}
    </form>
    <table className="w-auto overflow-x-auto text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="py-2">Category</th>
          <th className="py-2">Description</th>
            <th className="py-2">Icon</th>
            <th className="py-2">Features</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="text-left border-b">
            <td className="p-2">{item.category_title}</td>
            <td className="p-2">{item.description}</td>
            <th className="p-2">{item.icon}</th>
            <th className="p-2">{item.features}</th>
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

export default AcademicResourcesAdminSection;


