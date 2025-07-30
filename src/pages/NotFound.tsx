import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-9xl font-bold text-primary-300">404</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Page Not Found</h1>
      <p className="text-gray-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary flex items-center gap-2">
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;