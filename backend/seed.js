const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

// Import models
const Student = require('./models/Student');
const Class = require('./models/Class');
const User = require('./models/User');

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
  },
  {
    name: 'Sarah Brown',
    rollNumber: 'EE001',
    class: 'Electrical Engineering - Year 1',
    email: 'sarah.brown@university.edu'
  },
  {
    name: 'James Taylor',
    rollNumber: 'EE002',
    class: 'Electrical Engineering - Year 1',
    email: 'james.taylor@university.edu'
  },
  {
    name: 'Lisa Anderson',
    rollNumber: 'ME001',
    class: 'Mechanical Engineering - Year 1',
    email: 'lisa.anderson@university.edu'
  },
  {
    name: 'Robert Martinez',
    rollNumber: 'ME002',
    class: 'Mechanical Engineering - Year 1',
    email: 'robert.martinez@university.edu'
  },
  {
    name: 'Jennifer Garcia',
    rollNumber: 'CS006',
    class: 'Computer Science - Year 2',
    email: 'jennifer.garcia@university.edu'
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
  },
  {
    name: 'Database Systems',
    subject: 'Computer Science',
    teacher: 'Dr. Carol White'
  },
  {
    name: 'Circuit Theory',
    subject: 'Electrical Engineering',
    teacher: 'Prof. David Lee'
  },
  {
    name: 'Thermodynamics',
    subject: 'Mechanical Engineering',
    teacher: 'Dr. Emma Brown'
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
    name: 'Teaching Assistant',
    email: 'ta@university.edu',
    password: 'ta123',
    role: 'teacher'
  },
  {
    name: 'Student User',
    email: 'student@university.edu',
    password: 'student123',
    role: 'student'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student_attendance');
    console.log('MongoDB connected successfully');

    // Clear existing data (optional - comment out if you want to keep existing data)
    await Student.deleteMany({});
    await Class.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample students
    const students = await Student.insertMany(sampleStudents);
    console.log(`${students.length} students created`);

    // Insert sample classes
    const classes = await Class.insertMany(sampleClasses);
    console.log(`${classes.length} classes created`);

    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`${users.length} users created`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSample credentials:');
    console.log('Teacher/Admin:');
    console.log('  Email: admin@university.edu');
    console.log('  Password: admin123');
    console.log('\nStudent:');
    console.log('  Email: student@university.edu');
    console.log('  Password: student123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
