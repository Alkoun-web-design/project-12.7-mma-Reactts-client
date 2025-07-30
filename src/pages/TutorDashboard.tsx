import React, { useState, useEffect, useContext } from 'react';
import { User } from 'lucide-react';
import { UserContext } from '../App';
import { serverAPI, uploadsURL } from '../components/Utilities';

const sidebarTabs = [
  { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5 mr-2" /> },
  // Future tabs can be added here
];
export default function TutorDashboard() {

  const [selectedTab, setSelectedTab] = useState<string>('profile');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    avatar: avatar,
    name: '',
    bio: '',
    education: '',
    subject_speciality: '',
    teaching_style: '',
    languages: '',
    work_experience: '',
    certifications: '',
    achievements: '',
    email: '',
    password: '',
  });

  const user =  useContext(UserContext);
  const id = user?.user?.id

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${serverAPI}tutors/dashboard/${id}`, { credentials: 'include' });
        if (!res.ok) throw new Error(await res.text() || 'Failed to fetch profile');
        const data = await res.json();
        setForm(f => ({ ...f, ...data }));
        setAvatarPreview(uploadsURL + data.avatar_url);
      } catch (err) {
        console.error('Error fetching tutor profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  } else {
    setAvatar(null);
    setAvatarPreview(null);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append('name', form.name);
    formData.append('bio', form.bio);
    formData.append('education', form.education);
    formData.append('subject_speciality', form.subject_speciality);
    formData.append('teaching_style', form.teaching_style);
    formData.append('languages', form.languages);
    formData.append('work_experience', form.work_experience);
    formData.append('certifications', form.certifications);
    formData.append('achievements', form.achievements);
    formData.append('email', form.email);
    formData.append('password', form.password);
    
    if (avatar instanceof File) {
      formData.append('avatar', avatar);
    }
      try {
        const res = await fetch(`${serverAPI}tutors/dashboard/${id}`, { 
          method: 'PUT',
          credentials: 'include', 
          body: formData
        });
        if (!res.ok) throw new Error(await res.text() || 'Failed to update profile');
        const data = await res.json();
        setForm(f => ({ ...f, ...data }));
      } catch (err) {
        console.error('Error updating tutor profile:', err);
      } finally {
        setLoading(false);
      }
    alert('Profile saved!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r flex flex-col py-8 px-4">
        <div className="mb-8 text-2xl font-bold text-primary-700">Tutor Dashboard</div>
        <nav className="flex flex-col gap-2">
          {sidebarTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as 'profile')}
              className={`flex items-center px-4 py-2 rounded-lg text-left transition font-medium ${
                selectedTab === tab.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center border-gray-300 border-l-1">
        {selectedTab === 'profile' && (
          <div className="w-full bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-semibold mb-6 text-primary-700 flex items-center">
              Profile
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="text-sm space-y-5">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Avatar</label>
                <div className="flex items-center gap-4">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="w-32 h-32 rounded-full object-cover object-center border" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 border">
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
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Name</label>
                <input name="name" value={form.name} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" placeholder="Your Name" required/>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Short bio" rows={3} required></textarea>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Education</label>
                <input name="education" value={form.education} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" placeholder="Your education background" required/>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Subject Speciality</label>
                <input name="subjectSpeciality" value={form.subject_speciality} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" placeholder="e.g. Math, Science" required/>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Teaching Style</label>
                <input name="teachingStyle" value={form.teaching_style} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" placeholder="Describe your teaching style" required/>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Languages</label>
                <input name="languages" value={form.languages} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" placeholder="Languages you speak" required/>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Work Experience</label>
                <textarea name="workExperience" value={form.work_experience} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Your work experience" rows={2} required></textarea>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Certifications</label>
                <input name="certifications" value={form.certifications} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" placeholder="Your certifications" required/>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Achievements</label>
                <input name="achievements" value={form.achievements} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" placeholder="Your achievements" required/>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Email</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full border rounded px-3 py-2" placeholder="Your email" required/>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Password</label>
                <input name="password" value={form.password} onChange={handleChange} type="password" minLength={8} maxLength={24} className="w-full border rounded px-3 py-2" placeholder="Change your password" title="Minimum = 8, Maximum = 24" />
              </div>
              <div className="pt-2">
                <button type="submit" className="btn btn-primary w-full">Save Changes</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
