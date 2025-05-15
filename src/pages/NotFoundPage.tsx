import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found - BlockchainHub';
  }, []);

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-primary">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn btn-primary inline-flex items-center">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;