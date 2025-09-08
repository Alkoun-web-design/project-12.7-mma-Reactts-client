import React from 'react';
import type { Subject, SubjectForm }  from '../..//types/types';

interface AdminSectionProps {
  data: Subject[];
  form: SubjectForm;
  id: number | null;
  setForm: (form: SubjectForm) => void;
  setId: (id: number | null) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  // handleEdit: (user: User) => void;
  handleDelete: (id: number) => void;
}

const SubjectsAdminSection: React.FC<AdminSectionProps> = ({
  data,
  form,
  id,
  setForm,
  setId,
  handleFormChange,
  handleSubmit,
  // handleEdit,
  handleDelete,
}) => (
  <div className="w-full bg-white rounded-lg shadow p-8">
    <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
      Subjects
    </h2>
    {!data && <div className="text-red-600 mb-2">There was a problem with loading the data.</div>}
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleSubmit}>
      <div>
        <input name="name" value={form.name} onChange={handleFormChange} placeholder="Subject Name" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name of the subject</div>
      </div>
      <div>
        <input name="level" value={form.level} onChange={handleFormChange} placeholder="Level" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">E.g. Beginner, Intermediate, Advanced</div>
      </div>
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} Subject</button>
      {id && <button type="button" className="btn btn-secondary btn-sm" onClick={handleSubmit}>Cancel</button>}
    </form>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="py-2">Name</th>
          <th className="py-2">Level</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-b">
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.level}</td>
            <td className="p-2 flex gap-2">
              {/* <button className="btn btn-xs btn-primary" onClick={() => { setSubjectForm(subject); setEditingSubjectId(subject.id); }}>Edit</button> */}
              <button className="btn btn-xs btn-primary" onClick={() => { setForm(item); setId(item.id); }}>Edit</button>
              <button className="btn btn-xs btn-danger bg-red-600 text-white" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SubjectsAdminSection;
