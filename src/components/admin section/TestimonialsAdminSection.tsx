import React from 'react';
import type { Testimonial, TestimonialForm } from '../../types/types';

interface AdminSectionProps {
  data: Testimonial[];
  form: TestimonialForm;
  id: number | null;
  error?: string | null;
  setForm: (form: TestimonialForm) => void;
  setId: (id: number | null) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: (id: number) => void;
}

const TestimonialsAdminSection: React.FC<AdminSectionProps> = ({
  data,
  form,
  id,
  error,
  setForm,
  setId,
  handleFormChange,
  handleSubmit,
  handleDelete
}) => (
  <div className="w-full bg-white rounded-lg shadow p-8">
    <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
      Student Testimonials
    </h2>
    {error && <div className="text-red-600 mb-2">{error}</div>}
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleSubmit}>
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
  </div>
);

export default TestimonialsAdminSection;
