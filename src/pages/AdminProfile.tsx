import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Award, GraduationCap, Briefcase, Languages } from 'lucide-react';
import { serverAPI, uploadsURL } from '../components/Utilities';

interface AdminMember {
  id: number;
  name: string;
  email: string;
  bio: string;
  education: string | null;
  languages: string | null;
  work_experience: string | null;
  certifications: string | null;
  achievements: string | null;
  avatar_url: string | null;
}

const AdminProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminMember = async () => {
      try {
        const response = await fetch(`${serverAPI}admins/${id}`, {credentials: 'include'});
        if (!response.ok) {
          throw new Error('Failed to fetch admin');
        }
        const data = await response.json();
        setAdmin(data);
      } catch (err) {
        console.error('Error fetching admin:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminMember();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-xl mb-8" />
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!loading && !admin) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{ 'Admin member not found'}</h2>
          <button
            onClick={() => navigate('/our-staff')}
            className="btn btn-primary"
          >
            Return to Admin List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/our-staff')}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Admin List
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="relative h-64 sm:h-80">
            <img
              src={`${uploadsURL}${admin?.avatar_url}` || 'https://images.pexels.com/photos/5212640/pexels-photo-5212640.jpeg'}
              alt={admin?.name}
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{admin?.name}</h1>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">About</h2>
                <p className="text-gray-600 mb-8">{admin?.bio}</p>

              </div>

              <div className="space-y-6">
                {admin?.education && (
                  <div className="flex items-start">
                    <GraduationCap className="w-6 h-6 text-primary-600 mt-1 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Education</h3>
                      <p className="text-gray-600">{admin?.education}</p>
                    </div>
                  </div>
                )}

                {admin?.work_experience && (
                  <div className="flex items-start">
                    <Briefcase className="w-6 h-6 text-primary-600 mt-1 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Work Experience</h3>
                      <p className="text-gray-600">{admin?.work_experience}</p>
                    </div>
                  </div>
                )}

                {admin?.certifications && (
                  <div className="flex items-start">
                    <Award className="w-6 h-6 text-primary-600 mt-1 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Certifications</h3>
                      <p className="text-gray-600">{admin?.certifications}</p>
                    </div>
                  </div>
                )}

                {admin?.languages && (
                  <div className="flex items-start">
                    <Languages className="w-6 h-6 text-primary-600 mt-1 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Languages</h3>
                      <p className="text-gray-600">{admin?.languages}</p>
                    </div>
                  </div>
                )}

                {admin?.achievements && (
                  <div className="flex items-start">
                    <Award className="w-6 h-6 text-primary-600 mt-1 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Achievements</h3>
                      <p className="text-gray-600">{admin?.achievements}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-primary-600 mt-1 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Contact</h3>
                    <a
                      href={`mailto:${admin?.email}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {admin?.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProfile; 