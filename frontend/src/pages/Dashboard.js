import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { studentsAPI, classesAPI, attendanceAPI } from '../services/api';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    classes: 0,
    attendance: 0,
    attendancePercentage: 0
  });
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Check user role
    const user = JSON.parse(localStorage.getItem('user'));
    setUserRole(user?.role || '');
    
    // Only fetch dashboard data for teachers and admins
    if (user?.role !== 'student') {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  // If student, show student dashboard
  if (userRole === 'student') {
    return <StudentDashboard />;
  }

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [studentsRes, classesRes, attendanceStatsRes] = await Promise.all([
        studentsAPI.getAll(),
        classesAPI.getAll(),
        attendanceAPI.getStats()
      ]);

      setStats({
        students: studentsRes.data.count || 0,
        classes: classesRes.data.count || 0,
        attendance: attendanceStatsRes.data.data.total || 0,
        attendancePercentage: attendanceStatsRes.data.data.percentage || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, link }) => (
    <div className={`group relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-2xl p-8 transition-all duration-500 ease-out hover:bg-white hover:shadow-2xl hover:-translate-y-3 border border-gray-200/50 hover:border-blue-500/50 ${link ? 'cursor-pointer' : ''}`}>
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
      {link ? (
        <Link to={link} className="block relative z-10">
          <div className="text-center">
            <div className="text-5xl mb-4 transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-2xl filter">{icon}</div>
            <p className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 transition-all duration-300">{value}</p>
            <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase transition-colors duration-300 group-hover:text-blue-600">{title}</p>
          </div>
        </Link>
      ) : (
        <div className="text-center relative z-10">
          <div className="text-5xl mb-4 transition-all duration-500 group-hover:scale-125">{icon}</div>
          <p className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">{value}</p>
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">{title}</p>
        </div>
      )}
    </div>
  );

  const QuickActionCard = ({ title, description, icon, link }) => (
    <Link to={link} className="block group">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 transition-all duration-500 ease-out border border-gray-700/50 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3 transform">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
        
        <div className="relative z-10">
          <div className="text-5xl mb-4 transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-6 filter drop-shadow-lg">{icon}</div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent mb-2 transition-all duration-300">{title}</h3>
          <p className="text-gray-400 text-base leading-relaxed transition-colors duration-300 group-hover:text-gray-300">{description}</p>
          <div className="mt-6 flex items-center text-blue-400 font-semibold text-base transition-all duration-300">
            <span className="group-hover:mr-3 transition-all duration-300">Explore</span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </div>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-16 py-8">
      {/* Futuristic Hero Header with Animated Gradient */}
      <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-white">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 animate-gradient-xy"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-semibold tracking-wider">NEXT-GEN ATTENDANCE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
            Student Attendance System
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-8">
            Powered by modern technology. Built for the future.
          </p>
          <div className="flex justify-center gap-4">
            <div className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/30">
              <span className="text-sm">🚀 Fast</span>
            </div>
            <div className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/30">
              <span className="text-sm">🔒 Secure</span>
            </div>
            <div className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/30">
              <span className="text-sm">⚡ Efficient</span>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Students"
          value={stats.students}
          icon="👥"
          link="/students"
        />
        <StatCard
          title="Classes"
          value={stats.classes}
          icon="📚"
          link="/classes"
        />
        <StatCard
          title="Records"
          value={stats.attendance}
          icon="✅"
          link="/attendance"
        />
        <StatCard
          title="Rate"
          value={`${stats.attendancePercentage}%`}
          icon="📊"
        />
      </div>

      {/* Quick Actions with Neon Glow */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Quick Actions
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard
            title="Add Student"
            description="Register a new student in the system."
            icon="👤"
            link="/students"
          />
          <QuickActionCard
            title="Create Class"
            description="Set up a new class with subject and teacher."
            icon="📖"
            link="/classes"
          />
          <QuickActionCard
            title="Mark Attendance"
            description="Record attendance for your students."
            icon="✏️"
            link="/attendance"
          />
        </div>
      </div>

      {/* Futuristic Overview Panel */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700 shadow-2xl">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-2 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-white">
              System Overview
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:border-blue-500/50">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg group-hover:shadow-blue-500/50 transition-shadow duration-500">
                  <span className="text-3xl">📊</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-white">Student Enrollment</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {stats.students} students in {stats.classes} classes
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{stats.students}</span>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:border-purple-500/50">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-purple-500/50 transition-shadow duration-500">
                  <span className="text-3xl">✅</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-white">Attendance Rate</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {stats.attendance} records • {stats.attendancePercentage}% attendance
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{stats.attendancePercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
