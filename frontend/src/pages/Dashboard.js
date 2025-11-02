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

  const StatCard = ({ title, value, icon, color, link, gradient }) => (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${link ? 'cursor-pointer' : ''}`}>
      {link ? (
        <Link to={link} className="block">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="text-sm font-semibold opacity-90 mb-1">{title}</p>
              <p className="text-4xl font-bold">{value}</p>
              <p className="text-xs mt-2 opacity-75">Click to view details</p>
            </div>
            <div className={`p-4 rounded-full bg-white bg-opacity-20 backdrop-blur-sm`}>
              <span className="text-4xl">{icon}</span>
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex items-center justify-between">
          <div className="text-white">
            <p className="text-sm font-semibold opacity-90 mb-1">{title}</p>
            <p className="text-4xl font-bold">{value}</p>
          </div>
          <div className={`p-4 rounded-full bg-white bg-opacity-20 backdrop-blur-sm`}>
            <span className="text-4xl">{icon}</span>
          </div>
        </div>
      )}
    </div>
  );

  const QuickActionCard = ({ title, description, icon, link, gradient }) => (
    <Link to={link} className="block group">
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-200">
        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-3xl">{icon}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="mt-4 flex items-center text-indigo-600 font-semibold text-sm">
          <span>Get started</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
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
    <div className="space-y-8">
      {/* Header with gradient */}
      <div className="text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to Student Attendance System
        </h1>
        <p className="text-xl md:text-2xl opacity-90">
          Manage students, classes, and track attendance efficiently
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.students}
          icon="👥"
          gradient="from-blue-500 to-blue-600"
          link="/students"
        />
        <StatCard
          title="Total Classes"
          value={stats.classes}
          icon="📚"
          gradient="from-green-500 to-emerald-600"
          link="/classes"
        />
        <StatCard
          title="Attendance Records"
          value={stats.attendance}
          icon="✅"
          gradient="from-purple-500 to-indigo-600"
          link="/attendance"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendancePercentage}%`}
          icon="📊"
          gradient="from-orange-500 to-red-600"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">⚡</span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            title="Add New Student"
            description="Register a new student in the system"
            icon="👤"
            link="/students"
            gradient="from-blue-400 to-blue-500"
          />
          <QuickActionCard
            title="Create New Class"
            description="Set up a new class with subject and teacher"
            icon="📖"
            link="/classes"
            gradient="from-green-400 to-emerald-500"
          />
          <QuickActionCard
            title="Mark Attendance"
            description="Record attendance for students"
            icon="✏️"
            link="/attendance"
            gradient="from-purple-400 to-indigo-500"
          />
        </div>
      </div>

      {/* Recent Activity with better design */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">📈</span>
          System Overview
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow">
            <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-lg">Student Enrollment</p>
              <p className="text-sm text-gray-600 mt-1">
                {stats.students} students enrolled in {stats.classes} classes
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-600">{stats.students}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-shadow">
            <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl shadow-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-lg">Attendance Tracking</p>
              <p className="text-sm text-gray-600 mt-1">
                {stats.attendance} attendance records with {stats.attendancePercentage}% attendance rate
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-green-600">{stats.attendancePercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
