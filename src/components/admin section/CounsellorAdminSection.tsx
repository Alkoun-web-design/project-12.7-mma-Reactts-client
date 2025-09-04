import React, { useState, useEffect } from 'react';
import { serverAPI, uploadsURL, handleGetData} from '../Utilities';
import { User } from 'lucide-react';


// Define types for counsellor member
interface CounsellorMember {
  user_id: number;
  name: string;
  email: string;
  bio: string;
  education: string;
  languages: string;
  work_experience: string;
  certifications: string;
  achievements: string;
  avatar_url: string | undefined;
  avatar?: File | null;
}
interface AdminSectionProps {
  data: CounsellorMember[];
  form: any;
  id: number | null;
  setForm: (form: any) => void;
  setId: (id: number | null) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  // handleEdit: (user: User) => void;
  handleDelete: (id: number) => void;
}

const CounsellorAdminSection: React.FC<AdminSectionProps> = ({
  id,
  setId,
  handleDelete,
}) => {
      
    const [data, setData] = useState<CounsellorMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [form, setForm] = useState<any>({ 
      name: '', 
      email: '',
      bio: '', 
      education: '', 
      languages: '', 
      work_experience: '', 
      certifications: '', 
      achievements: '', 
      avatar: avatar 
    });

    useEffect(() => { 
      handleGetData(`counsellors`, setData, setLoading);
    }, []);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
      } else {
        setAvatar(null);
        setAvatarPreview(null);
      }
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleAddOrUpdateData = async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('bio', form.bio);
      formData.append('education', form.education);
      formData.append('languages', form.languages);
      formData.append('work_experience', form.work_experience);
      formData.append('certifications', form.certifications);
      formData.append('achievements', form.achievements);
 
      if (avatar instanceof File) {
        formData.append('avatar', avatar);
      }
      try {
        const method = id ? 'PUT' : 'POST';
        const url = id
          ? `${serverAPI}counsellors/${id}`
          : `${serverAPI}counsellors`;
        const response = await fetch(url, {
          method,
          credentials: 'include',
          body: formData
        });
        if (!response.ok) throw new Error('Failed to save data');
        setForm(f => ({ ...f, ...data }));
        setId(null);
        const refreshed = await fetch(`${serverAPI}counsellors`, { credentials: 'include' });
        setData(await refreshed.json());
      } catch (err: unknown) {
        console.error(err || 'Error saving data.');
      }
    };
  

  return (
  <div className="w-full bg-white rounded-lg shadow p-8">
    <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
        Counsellor Profiles
    </h2>
    {loading && <div className="text-gray-900 mb-2">Loading...</div>}    
    {data && (
      <>        
      <form encType="multipart/form-data" className="text-sm mb-4 flex gap-2 flex-wrap" onSubmit={(e) => handleAddOrUpdateData(e)}>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
        <input name="name" value={form.name} onChange={(e) => handleFormChange(e)} placeholder="Counsellor's Name" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Name</div>
      </div>
      <div>
        <input name="email" value={form.email} onChange={(e) => handleFormChange(e)} type="email" placeholder="Counsellor's Email" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Email</div>
      </div>
      <div>        
        <input name="bio" value={form.bio} onChange={(e) => handleFormChange(e)} placeholder="Counsellor's Bio" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">A brief bio</div>
      </div>
      <div>
        {/* <input name="name" value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Name" className="border rounded px-2 py-1" required /> */}
        <input name="education" value={form.education} onChange={(e) => handleFormChange(e)} placeholder="Counsellor's Education" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Education</div>
      </div>
      <div>
        <input name="languages" value={form.languages} onChange={(e) => handleFormChange(e)} placeholder="Languages Spoken by the Counsellor" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Separate each language with a ','</div>
      </div>
      <div>
        <input name="work_experience" value={form.work_experience} onChange={(e) => handleFormChange(e)} placeholder="Counsellor's Work Experience" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Separate each experience with a ','</div>
      </div>
      <div>
        <input name="certifications" value={form.certifications} onChange={(e) => handleFormChange(e)} placeholder="Counsellor's Certificates" className="border rounded px-2 py-1" required />
        <div className="text-xs text-gray-400 mt-1">Separate each certification with a ','</div>
      </div>
      <label className="block text-gray-700 mb-1 font-medium">Avatar</label>
          <div className="flex items-center gap-2">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar Preview" className="w-32 h-32 rounded-full object-cover object-center border" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 border">
                <User className="w-12 h-12" />
              </div>
            )}
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block"
            />
          </div>
      {id && <button className="btn btn-primary btn-sm h-12 my-auto" type="submit">Update Counsellor</button>}
      {id && <button type="button" className="btn btn-secondary btn-sm h-12 my-auto" onClick={() => { setId(null); setForm({ name: '', email: '', bio: '', education: '', languages: '', work_experience: '', certifications: '', achievements: '', avatar_url: ''}); setAvatarPreview(null); }}>Cancel</button>}
    </form>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-center text-gray-600">
          <th className="py-2">Name</th>
          <th className="py-2">Email</th>
          <th className="py-2">Bio</th>
          <th className="py-2">Education</th>
          <th className="py-2">Languages</th>
          <th className="py-2">Work Experience</th>
          <th className="py-2">Certifications</th>
          <th className="py-2">Achievements</th>
          <th className="py-2">Avatar</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.user_id} className="text-left border-b">
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.email}</td>
            <th className="p-2">{item.bio}</th>
            <th className="p-2">{item.education}</th>
            <th className="p-2">{item.languages}</th>
            <th className="p-2">{item.work_experience}</th>
            <th className="p-2">{item.certifications}</th>
            <th className="p-2">{item.achievements}</th>
            <th className="p-2"><img src={`${uploadsURL}${item.avatar_url}`} alt="Avatar Preview" className="w-12 h-12 rounded-full object-cover object-center border" /></th>
            <td className="p-2 flex gap-2">
              <button className="btn btn-xs btn-primary my-auto" onClick={() => { setForm(item); setId(item.user_id); setAvatarPreview(`${uploadsURL}${item.avatar_url}`);}}>Edit</button>
              <button className="btn btn-xs btn-danger bg-red-600 text-white my-auto" type="button" onClick={() => handleDelete(item.user_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>)}
  </div>
);
}

export default CounsellorAdminSection;