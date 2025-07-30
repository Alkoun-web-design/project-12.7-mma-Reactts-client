import React from 'react';

interface EducationalService {
  id: number;
  name: string;
  service_key: string;
  short_description: string;
  details: string;
  is_active: number;
}

interface AdminSectionProps {
  data: EducationalService[];
  form: any;
  id: number | null;
  error?: string | null;
  setForm: (form: any) => void;
  setId: (id: number | null) => void;
  // handleFormChange: (e: React.ChangeEvent) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: (id: number) => void;
}

const EducationalServicesAdminSection: React.FC<AdminSectionProps> = ({
  data,
  form,
  id,
  error,
  setForm,
  setId,
  // handleFormChange,
  handleSubmit,
  handleDelete
}) => (
  <div className="w-full bg-white rounded-lg shadow p-8">
    <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
      Educational Services
    </h2>
    {error && <div className="text-red-600 mb-2">{error}</div>}
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleSubmit}>
      <div>
        <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name of the educational service</div>
      </div>
      <div>
        <input name="service_key" value={form.service_key} onChange={e => setForm((f: any) => ({ ...f, service_key: e.target.value }))} placeholder="Key" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Unique key for the service</div>
      </div>
      <div>
        <input name="short_description" value={form.short_description} onChange={e => setForm((f: any) => ({ ...f, short_description: e.target.value }))} placeholder="Short Description" className="border rounded px-2 py-1" />
        <div className="text-xs text-gray-400 mt-1">Brief description of the service</div>
      </div>
      <div>
        <input name="details" value={form.details} onChange={e => setForm((f: any) => ({ ...f, details: e.target.value }))} placeholder="Details" className="border rounded px-2 py-1" />
        <div className="text-xs text-gray-400 mt-1">Detailed information about the service</div>
      </div>
      <div>
        <input name="is_active" value={form.is_active} onChange={e => setForm((f: any) => ({ ...f, details: e.target.value }))} placeholder="Is the service Active" className="border rounded px-2 py-1" />
        <div className="text-xs text-gray-400 mt-1">1 for Yes, 0 for No </div>
      </div>
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} Service</button>
      {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({ name: '', service_key: '', short_description: '', details: '', is_active: true }); }}>Cancel</button>}
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
  </div>
);

export default EducationalServicesAdminSection;
