import React, { useState, useEffect } from 'react';
import { handleGetData, serverAPI } from '../Utilities';
import type { Schedule, ScheduleForm } from '../../types/types';


interface AdminSectionProps {
  // data: Schedule[];
  // form: ScheduleForm;
  // id: number | null;
  // setForm: (form: ScheduleForm) => void;
  // setId: (id: number | null) => void;
  // handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSubmit: (e: React.FormEvent) => void;
  // handleDelete: (id: number) => void;
  apiEndpoint: string;
}

  const blankForm = { subject_id: 0, tutor_id: 0, timing: '', timeframe: '', description: '', status: 'Now Enrolling' };


const SchedulesAdminSection: React.FC<AdminSectionProps> = ({
  // data,
  // form,
  // id,
  // setForm,
  // setId,
  // handleFormChange,
  // handleSubmit,
  // handleDelete,
  apiEndpoint
}) => {

  const [data, setData] = useState<Schedule[]>([]);
        const [id, setId] = useState<number | null>(null);
        const [loading, setLoading] = useState(true);
        const [form, setForm] = useState<ScheduleForm>(blankForm);
    
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
        Classroom Schedules
    </h2>
    {loading && <div className="text-gray-900 mb-2">Loading...</div>}    
    {data && ( 
      <>
    <form className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={handleAddOrUpdateData}>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
        <input name="subject_id" value={form.subject_id} onChange={handleFormChange} placeholder="Subject ID" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Subject ID for the classroom</div>
      </div>
      <div>
        <input name="tutor_id" value={form.tutor_id} onChange={handleFormChange} placeholder="Tutor ID" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Tutor ID for the classroom</div>
      </div>
      <div>        
        <input name="timing" value={form.timing} onChange={handleFormChange} placeholder="Schedule Timing" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Format: Mon 10:00-11:00</div>
      </div>
      <div>
        <input name="timeframe" value={form.timeframe} onChange={handleFormChange} placeholder="Schedule Timeframe" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">The duration e.g. Week, Month, Semester</div>      
      </div>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
        <input name="description" value={form.description} onChange={handleFormChange} placeholder="Description of the Schedule" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Description</div>
      </div>
      <div>
        <input name="status" value={form.status} onChange={handleFormChange} placeholder="The Status of the Classroom" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Now Enrolling / Starting Next Month / Enrollment Closed</div>
      </div>
      <button className="btn btn-primary btn-sm" type="submit">{id ? 'Update' : 'Add'} Schedule</button>
        {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({ subject_id: 0, tutor_id: 0, timing: '', timeframe: '', description: '', status: 'Now Enrolling'})}}>Cancel</button>}
    </form>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="p-2">Subject ID</th>
          <th className="p-2">Tutor ID</th>
          <th className="p-2">Timing</th>
          <th className="p-2">Timeframe</th>
          <th className="p-2">Description</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="text-left border-b">
            <td className="py-2">{item.subject_id}</td>
            <td className="py-2">{item.tutor_id}</td>
            <th className="py-2">{item.timing}</th>
            <th className="py-2">{item.timeframe}</th>
            <th className="py-2">{item.description}</th>
            <th className="py-2">{item.status}</th>
            <td className="py-2 flex gap-2">
              <button className="btn btn-xs btn-primary" onClick={() => { setForm(item); setId(item.id); }}>Edit</button>
              <button className="btn btn-xs btn-danger bg-red-600 text-white" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>)}
  </div>
  );
}

export default SchedulesAdminSection;