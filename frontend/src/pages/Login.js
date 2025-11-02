import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(formData.email, formData.password);
    
    setLoading(false);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Apple-style minimalist card */}
        <div className="bg-white rounded-3xl p-10">
          <div>
            <div className="flex justify-center mb-8">
              <div className="text-6xl">🎓</div>
            </div>
            <h2 className="text-center text-4xl font-semibold text-gray-900 tracking-tight mb-2">
              Sign in
            </h2>
            <p className="text-center text-base text-gray-500 font-normal">
              to continue to Attendance System
            </p>
          </div>
          
          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all sm:text-base bg-white hover:border-gray-300"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all sm:text-base bg-white hover:border-gray-300"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Signing in...' : 'Continue'}
              </button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                  Create yours now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
