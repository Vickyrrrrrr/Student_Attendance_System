import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      // Get current user details
      const userResponse = await axios.get(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const studentId = userResponse.data.data.user.studentId;

      if (!studentId) {
        toast.error('Student record not found');
        setLoading(false);
        return;
      }

      // Get attendance statistics
      const response = await axios.get(`${API_URL}/api/students/${studentId._id}/attendance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setStudent(response.data.data.student);
        setAttendance(response.data.data.attendance);
        setStatistics(response.data.data.statistics);
      }
    } catch (error) {
      toast.error('Failed to fetch student data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-500';
      case 'Absent':
        return 'bg-red-500';
      case 'Late':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 75) return 'text-green-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Student Info Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-6xl">👨‍🎓</div>
            <div>
              <h1 className="text-3xl font-bold">{student?.name}</h1>
              <p className="text-blue-100">Roll Number: {student?.rollNumber}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-blue-200 text-sm">Class</p>
              <p className="text-xl font-semibold">{student?.class}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm">Email</p>
              <p className="text-xl font-semibold">{student?.email}</p>
            </div>
          </div>
        </div>
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Attendance Statistics */}
      {statistics && (
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">📊 Attendance Statistics</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{statistics.total}</div>
              <div className="text-sm text-gray-300 mt-2">Total Records</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">{statistics.present}</div>
              <div className="text-sm text-gray-300 mt-2">Present</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400">{statistics.absent}</div>
              <div className="text-sm text-gray-300 mt-2">Absent</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">{statistics.late}</div>
              <div className="text-sm text-gray-300 mt-2">Late</div>
            </div>
          </div>

          {/* Attendance Percentage */}
          <div className="bg-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-white">Overall Attendance</span>
              <span className={`text-3xl font-bold ${getPercentageColor(statistics.percentage)}`}>
                {statistics.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  statistics.percentage >= 75 ? 'bg-green-500' : 
                  statistics.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${statistics.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Records */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">📅 Attendance History</h2>
        
        {attendance.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-300 text-lg">No attendance records yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {attendance.map((record) => (
              <div
                key={record._id}
                className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {record.classId?.name || 'Unknown Class'}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {record.classId?.subject || 'No subject'}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-center">
                    <span className={`inline-block px-6 py-2 rounded-full text-white font-semibold ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                </div>
                {record.remarks && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">Note:</span> {record.remarks}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
