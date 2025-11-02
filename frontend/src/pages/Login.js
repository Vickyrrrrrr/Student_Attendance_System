import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'teacher'
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData({ email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === 'student') {
        // Student login using student-auth endpoint
        const response = await axios.post(`${API_URL}/api/student-auth/login`, {
          email: formData.email,
          password: formData.password
        });

        if (response.data.success) {
          // Store token in localStorage
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          
          toast.success('Student login successful!');
          navigate('/');
          window.location.reload(); // Reload to update auth context
        }
      } else {
        // Teacher/Admin login using regular auth endpoint
        const success = await login(formData.email, formData.password);
        
        if (success) {
          navigate('/');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Futuristic card with glassmorphism */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">
          <div>
            <div className="flex justify-center mb-8">
              <div className="text-6xl animate-pulse">🎓</div>
            </div>
            <h2 className="text-center text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-base text-gray-300 font-normal">
              Sign in to your account
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="mt-8 flex bg-white/5 rounded-2xl p-1 border border-white/10">
            <button
              type="button"
              onClick={() => handleTabChange('student')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'student'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              👨‍🎓 Student Login
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('teacher')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'teacher'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/50'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              👨‍🏫 Teacher Login
            </button>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-4 py-3.5 border border-white/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 sm:text-base hover:border-white/30 hover:bg-white/10"
                  placeholder={activeTab === 'student' ? 'student@university.edu' : 'teacher@university.edu'}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-4 py-3.5 border border-white/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 sm:text-base hover:border-white/30 hover:bg-white/10"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-bold rounded-xl text-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 transform active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeTab === 'student'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-blue-500/50'
                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:shadow-purple-500/50'
                }`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>

            {activeTab === 'student' && (
              <div className="text-center pt-4">
                <p className="text-sm text-gray-300">
                  Don't have an account?{' '}
                  <Link to="/student-register" className="text-blue-400 hover:text-blue-300 font-semibold transition-all duration-300 hover:underline">
                    Register as Student
                  </Link>
                </p>
              </div>
            )}

            {activeTab === 'teacher' && (
              <div className="text-center pt-4">
                <p className="text-sm text-gray-400 italic">
                  Teacher accounts are created by administrators
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
