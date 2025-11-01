const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Class = require('../models/Class');
const User = require('../models/User');

// Sample data
const sampleStudents = [
  {
    name: 'John Doe',
    rollNumber: 'CS001',
    class: 'Computer Science - Year 1',
    email: 'john.doe@university.edu'
  },
  {
    name: 'Jane Smith',
    rollNumber: 'CS002',
    class: 'Computer Science - Year 1',
    email: 'jane.smith@university.edu'
  },
  {
    name: 'Michael Johnson',
    rollNumber: 'CS003',
    class: 'Computer Science - Year 1',
    email: 'michael.johnson@university.edu'
  },
  {
    name: 'Emily Davis',
    rollNumber: 'CS004',
    class: 'Computer Science - Year 1',
    email: 'emily.davis@university.edu'
  },
  {
    name: 'David Wilson',
    rollNumber: 'CS005',
    class: 'Computer Science - Year 1',
    email: 'david.wilson@university.edu'
  }
];

const sampleClasses = [
  {
    name: 'Data Structures',
    subject: 'Computer Science',
    teacher: 'Dr. Alice Johnson'
  },
  {
    name: 'Algorithms',
    subject: 'Computer Science',
    teacher: 'Prof. Bob Smith'
  }
];

const sampleUsers = [
  {
    name: 'Professor Admin',
    email: 'admin@university.edu',
    password: 'admin123',
    role: 'teacher'
  },
  {
    name: 'Student User',
    email: 'student@university.edu',
    password: 'student123',
    role: 'student'
  }
];

// @route   GET /api/seed/init
// @desc    Seed database with sample data (ONE-TIME USE)
// @access  Public (will be removed after first use)
router.get('/init', async (req, res) => {
  try {
    // Check if data already exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Database already seeded. Delete this endpoint for security.'
      });
    }

    // Clear existing data
    await Student.deleteMany({});
    await Class.deleteMany({});
    await User.deleteMany({});

    // Insert students
    const students = await Student.insertMany(sampleStudents);

    // Insert classes
    const classes = await Class.insertMany(sampleClasses);

    // Insert users (with password hashing)
    const users = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      users.push(user);
    }

    res.json({
      success: true,
      message: 'Database seeded successfully!',
      data: {
        students: students.length,
        classes: classes.length,
        users: users.length,
        credentials: {
          admin: {
            email: 'admin@university.edu',
            password: 'admin123'
          },
          student: {
            email: 'student@university.edu',
            password: 'student123'
          }
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding database',
      error: error.message
    });
  }
});

module.exports = router;
