import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { studentsAPI, classesAPI, attendanceAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    classes: 0,
    attendance: 0,
    attendancePercentage: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

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
    <div className={`bg-gray-50 rounded-2xl p-8 transition-all duration-500 ease-out hover:bg-gray-100 hover:shadow-xl hover:-translate-y-2 ${link ? 'cursor-pointer' : ''}`}>
      {link ? (
        <Link to={link} className="block">
          <div className="text-center">
            <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110">{icon}</div>
            <p className="text-5xl font-semibold text-gray-900 mb-2 transition-all duration-300">{value}</p>
            <p className="text-sm font-medium text-gray-500 tracking-wide uppercase transition-colors duration-300">{title}</p>
          </div>
        </Link>
      ) : (
        <div className="text-center">
          <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110">{icon}</div>
          <p className="text-5xl font-semibold text-gray-900 mb-2">{value}</p>
          <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">{title}</p>
        </div>
      )}
    </div>
  );

  const QuickActionCard = ({ title, description, icon, link }) => (
    <Link to={link} className="block group">
      <div className="bg-white rounded-2xl p-8 hover:bg-gray-50 transition-all duration-500 ease-out border border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:-translate-y-3 transform">
        <div className="text-5xl mb-4 transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-6">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-600">{title}</h3>
        <p className="text-gray-500 text-base leading-relaxed transition-colors duration-300">{description}</p>
        <div className="mt-6 flex items-center text-blue-600 font-medium text-base transition-all duration-300">
          <span className="group-hover:mr-3 transition-all duration-300">Learn more</span>
          <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
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
      {/* Apple-style Hero Header */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-7xl font-semibold text-gray-900 mb-6 tracking-tight">
          Student Attendance
        </h1>
        <p className="text-2xl md:text-3xl text-gray-500 font-normal leading-relaxed">
          Simple. Powerful. Efficient.
        </p>
      </div>

      {/* Statistics Cards - Apple Style */}
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

      {/* Quick Actions - Clean minimal cards */}
      <div className="space-y-8">
        <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">
          Quick actions
        </h2>
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

      {/* Overview - Minimal design */}
      <div className="bg-gray-50 rounded-3xl p-12 space-y-8">
        <h2 className="text-3xl font-semibold text-gray-900">
          Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">📊</div>
              <div>
                <p className="text-lg font-medium text-gray-900">Student Enrollment</p>
                <p className="text-base text-gray-500">
                  {stats.students} students in {stats.classes} classes
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">✅</div>
              <div>
                <p className="text-lg font-medium text-gray-900">Attendance Rate</p>
                <p className="text-base text-gray-500">
                  {stats.attendance} records • {stats.attendancePercentage}% attendance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
