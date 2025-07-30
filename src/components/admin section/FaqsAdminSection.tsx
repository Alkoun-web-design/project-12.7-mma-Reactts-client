import React from 'react';

type Faq = {
  id: number;
  question: string;
  answer: string;
  category_name: string;
}

interface AdminSectionProps {
  data: Faq[];
  form: any;
  id: number | null;
  setForm: (form: any) => void;
  setId: (id: number | null) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: (id: number) => void;
}

const FaqsAdminSection: React.FC<AdminSectionProps> = ({
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
        Frequently Asked Questions
    </h2>
    {!data && <div className="text-red-600 mb-2">There was a problem in loading the data</div>}
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleSubmit}>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
        <input name="question" value={form.question} onChange={handleFormChange} placeholder="Question" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Question</div>
      </div>
      <div>
        <input name="answer" value={form.description} onChange={handleFormChange} placeholder="Answer" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Answer</div>
      </div>
      <div>        
        <input name="categor_name" value={form.category_namet} onChange={handleFormChange} placeholder="Category Name" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name of the cateogry of the question and answer</div>
      </div>
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} FAQ</button>
      {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({  question: '', answer: '', category_name: '' })}}>Cancel</button>}
    </form>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="py-2">Question</th>
          <th className="py-2">Answer</th>
          <th className="py-2">Category</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-b">
            <td className="p-2">{item.question}</td>
            <td className="p-2">{item.answer}</td>
            <th className="p-2">{item.category_name}</th>
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

export default FaqsAdminSection;


