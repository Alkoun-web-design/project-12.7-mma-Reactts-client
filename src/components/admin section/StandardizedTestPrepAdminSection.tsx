import React from 'react';
import type { TestPrepOption, TestPrepOptionForm} from '../../types/types'

interface AdminSectionProps {
  data: TestPrepOption[];
  form: TestPrepOptionForm;
  id: number | null;
  setForm: (form: TestPrepOptionForm) => void;
  setId: (id: number | null) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: (id: number) => void;
}

const StandardizedTestPrepAdminSection: React.FC<AdminSectionProps> = ({
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
        Standardized Test Preperation
    </h2>
    {!data && <div className="text-red-600 mb-2">There was a problem with loading the data.</div>}    
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleSubmit}>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
        <input name="name" value={form.test} onChange={handleFormChange} placeholder="Name" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name of the Test</div>
      </div>
      <div>
        <input name="description" value={form.description} onChange={handleFormChange} placeholder="Description" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Descripton of the activity</div>
      </div>
      <div>        
        <input name="format" value={form.format} onChange={handleFormChange} placeholder="Format" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Format of the Test Preparation</div>
      </div>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
        <input name="duration" value={form.duration} onChange={handleFormChange} placeholder="Duration" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">The duration of the program</div>
      </div>
      <div>
        <input name="features" value={form.features} onChange={handleFormChange} placeholder="Features" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Features of the program</div>
      </div>
      <div>
        <input name="is_active" value={form.is_active} onChange={handleFormChange} placeholder="Is the Acttivity Active?" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">1 for Yes, 0 for No</div>
      </div>
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} Test</button>
      {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({  test: '', description: '', format: '', duration: '', features: [], is_active: 0 })}}>Cancel</button>}
    </form>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="py-2">Test Name</th>
          <th className="py-2">Description</th>
          <th className="py-2">Format</th>
          <th className="py-2">Duration</th>
          <th className="py-2">Features</th>
          <th className="py-2">Active</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-b">
            <td className="p-2">{item.test}</td>
            <td className="p-2">{item.description}</td>
            <th className="p-2">{item.format}</th>
            <th className="p-2">{item.duration}</th>
            <th className="p-2">{item.features}</th>
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
);

export default StandardizedTestPrepAdminSection;


