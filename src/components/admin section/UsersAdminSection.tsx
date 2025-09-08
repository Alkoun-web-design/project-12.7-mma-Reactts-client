import React, { useState, useEffect } from 'react';
import { handleGetData, serverAPI } from '../Utilities';
import type { User, UserForm} from '../../types/types';

interface AdminSectionProps {
  // data: User[];
  // form: UserForm;
  // id: number | null;
  // setForm: (form: UserForm) => void;
  // setId: (id: number | null) => void;
  // handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleSubmit: (e: React.FormEvent) => void;
  // handleDelete: (id: number) => void;
  apiEndpoint: string;
}

// const blankUsersForm = { email: '', user_type: 'tutor', password: '' };


const UsersAdminSection: React.FC<AdminSectionProps> = ({
    // id,
    // setId,
    // handleDelete,
    apiEndpoint }) => {
        
      const [data, setData] = useState<User[]>([]);
      const [id, setId] = useState<number | null>(null);
      const [loading, setLoading] = useState(true);
      const [form, setForm] = useState<UserForm>({ 
        email: '',
        password: '',
        user_type: 'tutor',
      });
  
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
      Users
    </h2>
    {loading && <div className="text-gray-900 mb-2">Loading...</div>}    
    {data && (
      <>    
    <form onSubmit={(e) => handleAddOrUpdateData(e)} className="text-sm mb-4 flex gap-2 flex-wrap">
      <div>
        <input name="email" value={form.email} onChange={(e) => handleFormChange(e)} type="email" placeholder="Email" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-500">User email address</div>
      </div>
      <div>
        <input name="password" value={form.password} onChange={(e) => handleFormChange(e)} type="password" placeholder={id ? "New Password (optional)" : "Password"} className="border rounded px-2 py-1" {...(!id && { required: true })} />
        <div className="text-xs text-gray-500">Password for the user account</div>
      </div>
      <div>
        <input name="user_type" value={form.user_type} onChange={(e) => handleFormChange(e)} type="text" placeholder={id ? "Select User Type (optional)" : "User Type"} className="border rounded px-2 py-1" {...(!id && { required: true })} />
        <div className="text-xs text-gray-500">Must be 'admin', 'tutor' or 'counsellor'</div>
      </div>
      <button className="btn btn-primary btn-sm my-2" type="submit">{id ? 'Update' : 'Add'} User</button>
      {id && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setId(null); setForm({email: '', user_type: 'tutor', password: '' }); }}>Cancel</button>}
    </form>
    {!data && <div className="text-red-600 mb-2">There was a problem with loading the data.</div>}    
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-gray-600 text-center">
          <th className="py-2">ID</th>
          <th className="py-2">Email</th>
          <th className="py-2">User Type</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id} className="border-b">
            <td className="p-2">{item.id}</td>
            <td className="p-2">{item.email}</td>
            <td className="p-2">{item.user_type}</td>
            <td className="p-2 flex gap-2">
              <button className="btn btn-xs btn-primary" type="button" onClick={() => { setForm(item); setId(item.id); }} >Edit</button>
              <button className="btn btn-xs btn-danger bg-red-600 text-white" type="button" onClick={() => handleDelete(item.id)} >Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>)}
  </div>
)
};

export default UsersAdminSection;
