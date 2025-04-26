import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-primary">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-primary">
            Page Not Found
          </h2>
          <p className="mt-2 text-sm text-primary/80">
            Sorry, we couldn't find {location.pathname}
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium 
              text-white bg-red hover:bg-orange
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
          >
            Return Home
          </Link>
          {location.pathname.startsWith('/blog') && (
            <Link
              to="/blog"
              className="ml-4 inline-flex items-center px-4 py-2 rounded-md text-sm font-medium 
                text-primary hover:text-orange
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
            >
              Go to Blog
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;