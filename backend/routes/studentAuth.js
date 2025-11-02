const express = require('express');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

const router = express.Router();

// Validation middleware for student registration
const validateStudentRegister = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('rollNumber').trim().notEmpty().withMessage('Roll number is required'),
  body('class').trim().notEmpty().withMessage('Class is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// @route   POST /api/student-auth/register
// @desc    Register a new student (creates both Student and User records)
// @access  Public
router.post('/register', validateStudentRegister, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, email, rollNumber, class: studentClass, password } = req.body;

    // Check if student with same email or roll number already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { rollNumber }]
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: existingStudent.email === email 
          ? 'A student with this email already exists' 
          : 'A student with this roll number already exists'
      });
    }

    // Check if user with same email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    // Create student record first
    const student = new Student({
      name,
      email,
      rollNumber,
      class: studentClass
    });

    await student.save();

    // Create user record linked to student
    const user = new User({
      name,
      email,
      password,
      role: 'student',
      studentId: student._id
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        student: {
          id: student._id,
          name: student.name,
          rollNumber: student.rollNumber,
          class: student.class,
          email: student.email
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering student',
      error: error.message
    });
  }
});

// @route   POST /api/student-auth/login
// @desc    Student login
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Check if user exists and is a student
    const user = await User.findOne({ email, role: 'student' }).select('+password').populate('studentId');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password, or not a student account'
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Student login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        student: user.studentId,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
});

module.exports = router;
