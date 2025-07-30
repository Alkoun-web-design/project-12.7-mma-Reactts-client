import React from 'react';

interface CoachingArea { 
  id: number; 
  title: string; 
  description: string; 
  benefits: string;
  logo: string;
}
interface AdminSectionProps {
  data: CoachingArea[];
  form: any;
  id: number | null;
  setForm: (form: any) => void;
  setId: (id: number | null) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  // handleEdit: (user: User) => void;
  handleDelete: (id: number) => void;
}

const StudyCoachingAdminSection: React.FC<AdminSectionProps> = ({
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
        Study Coaching
    </h2>
    {!data && <div className="text-red-600 mb-2">There was a problem with loading the data.</div>}    
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleSubmit}>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
      <input name="title" value={form.title} onChange={handleFormChange} placeholder="Title" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name of the coaching area</div>
      </div>
      <div>
        <input name="description" value={form.plan_description} onChange={handleFormChange} placeholder="Description" className="border rounded px-2 py-1" required />
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
  </div>
);

export default StudyCoachingAdminSection;


