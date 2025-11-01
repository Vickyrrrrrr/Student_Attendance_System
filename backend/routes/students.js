const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Configure multer for CSV upload (use memory storage for cloud deployment)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Validation middleware
const validateStudent = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('rollNumber').trim().notEmpty().withMessage('Roll number is required'),
  body('class').trim().notEmpty().withMessage('Class is required'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email')
];

// Get all students (all authenticated users can view)
router.get('/', authenticate, async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: students,
      count: students.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
});

// Get student by ID (all authenticated users can view)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
});

// Create new student (only teachers and admins)
router.post('/', authenticate, authorize('teacher', 'admin'), validateStudent, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Check if roll number or email already exists
    const existingStudent = await Student.findOne({
      $or: [
        { rollNumber: req.body.rollNumber },
        { email: req.body.email }
      ]
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this roll number or email already exists'
      });
    }

    const student = new Student(req.body);
    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Student with this roll number or email already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    });
  }
});

// Update student (only teachers and admins)
router.put('/:id', authenticate, authorize('teacher', 'admin'), validateStudent, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Check if roll number or email already exists for other students
    const existingStudent = await Student.findOne({
      $and: [
        { _id: { $ne: req.params.id } },
        {
          $or: [
            { rollNumber: req.body.rollNumber },
            { email: req.body.email }
          ]
        }
      ]
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this roll number or email already exists'
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
});

// Delete student (only teachers and admins)
router.delete('/:id', authenticate, authorize('teacher', 'admin'), async (req, res) => {
  try {
    // Check if student has attendance records
    const attendanceCount = await Attendance.countDocuments({ studentId: req.params.id });
    
    if (attendanceCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete student with existing attendance records'
      });
    }

    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
});

// Get student attendance statistics (all authenticated users can view)
router.get('/:id/attendance', authenticate, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const attendance = await Attendance.find({ studentId: req.params.id })
      .populate('classId', 'name subject')
      .sort({ date: -1 });

    const totalRecords = attendance.length;
    const presentCount = attendance.filter(a => a.status === 'Present').length;
    const absentCount = attendance.filter(a => a.status === 'Absent').length;
    const lateCount = attendance.filter(a => a.status === 'Late').length;

    const attendancePercentage = totalRecords > 0 ? ((presentCount + lateCount) / totalRecords * 100).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        student,
        attendance,
        statistics: {
          total: totalRecords,
          present: presentCount,
          absent: absentCount,
          late: lateCount,
          percentage: parseFloat(attendancePercentage)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance statistics',
      error: error.message
    });
  }
});

// CSV Import - Upload and create students from CSV
router.post('/import/csv', authenticate, authorize('teacher', 'admin'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const results = [];
    const errors = [];
    let created = 0;
    let updated = 0;

    // Read and parse CSV from buffer
    const { Readable } = require('stream');
    const bufferStream = Readable.from(req.file.buffer);
    
    bufferStream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          for (const row of results) {
            try {
              // Validate required fields
              if (!row.name || !row.rollNumber || !row.class || !row.email) {
                errors.push({
                  row,
                  error: 'Missing required fields (name, rollNumber, class, email)'
                });
                continue;
              }

              // Check if student exists by rollNumber or email
              const existingStudent = await Student.findOne({
                $or: [
                  { rollNumber: row.rollNumber },
                  { email: row.email }
                ]
              });

              if (existingStudent) {
                // Update existing student
                existingStudent.name = row.name;
                existingStudent.rollNumber = row.rollNumber;
                existingStudent.class = row.class;
                existingStudent.email = row.email;
                await existingStudent.save();
                updated++;
              } else {
                // Create new student
                const newStudent = new Student({
                  name: row.name,
                  rollNumber: row.rollNumber,
                  class: row.class,
                  email: row.email
                });
                await newStudent.save();
                created++;
              }
            } catch (error) {
              errors.push({
                row,
                error: error.message
              });
            }
          }

          res.json({
            success: true,
            message: `CSV imported successfully. Created: ${created}, Updated: ${updated}`,
            data: {
              created,
              updated,
              errors: errors.length > 0 ? errors : undefined
            }
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: 'Error processing CSV file',
            error: error.message
          });
        }
      })
      .on('error', (error) => {
        res.status(500).json({
          success: false,
          message: 'Error reading CSV file',
          error: error.message
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error importing students',
      error: error.message
    });
  }
});

// CSV Export - Download all students as CSV
router.get('/export/csv', authenticate, async (req, res) => {
  try {
    const students = await Student.find().select('name rollNumber class email').lean();

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No students found to export'
      });
    }

    // Convert to CSV
    const fields = ['name', 'rollNumber', 'class', 'email'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(students);

    // Send CSV file
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename=students.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error exporting students',
      error: error.message
    });
  }
});

module.exports = router;
