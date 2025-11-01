# 🎓 Student Attendance Management System

> A modern, full-stack web application for efficient student attendance tracking and management built with the MERN stack.

## ✨ Features

- **� Authentication & Authorization**: Secure JWT-based login with role-based access control (Teacher/Student/Admin)
- **�👥 Student Management**: Complete CRUD operations for student records
- **📚 Class Management**: Create and manage classes with subjects and teachers  
- **✅ Attendance Tracking**: Mark daily attendance (Present/Absent/Late) for students
- **📥 CSV Import/Export**: Bulk import students and export attendance records
- **� Search & Filter**: Real-time search across all student records
- **�📊 Real-time Dashboard**: Overview with statistics and quick actions
- **�‍🏫 Role-Based UI**: Different views and permissions for teachers and students
- **�📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🔔 Toast Notifications**: Instant feedback for all operations
- **🛡️ Data Validation**: Comprehensive input validation and error handling
- **📈 Attendance Reports**: Generate attendance statistics and summaries
- **⚡ Performance Optimized**: Fast and efficient data operations

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT (jsonwebtoken)** - Secure authentication and authorization
- **Bcryptjs** - Password hashing for security
- **Multer** - File upload middleware for CSV imports
- **CSV-Parser** - Parse CSV files for bulk imports
- **Json2csv** - Convert JSON to CSV for exports
- **Express Validator** - Input validation and sanitization
- **CORS** - Cross-origin resource sharing support

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router** - Client-side routing and navigation
- **Axios** - Promise-based HTTP client for API calls
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **React Toastify** - Elegant toast notifications
- **Responsive Design** - Mobile-first approach

### Development Tools
- **Concurrently** - Run multiple commands simultaneously
- **Nodemon** - Auto-restart server during development
- **ESLint** - Code quality and consistency

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd Student_Attendance_System
   ```

2. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   
   # Return to root directory
   cd ..
   ```

3. **Environment Configuration**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Create config.env file with the following variables
   # Edit config.env with your configuration
   MONGODB_URI=mongodb://localhost:27017/student_attendance
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-secret-key-change-in-production
   JWT_EXPIRE=7d
   ```

4. **Create First Admin User**
   After starting the backend, register your first user with "teacher" role to get admin access:
   ```bash
   # POST to http://localhost:5000/api/auth/register
   {
     "name": "Admin User",
     "email": "admin@university.edu",
     "password": "securepassword123",
     "role": "teacher"
   }
   ```

5. **Start MongoDB**
   - **Local MongoDB**: Ensure MongoDB service is running
   - **MongoDB Atlas**: Use your cloud connection string in config.env

6. **Run the Application**
   ```bash
   # Development mode (both backend and frontend)
   npm run dev
   
   # Or run separately:
   npm run server    # Backend only (port 5000)
   npm run client    # Frontend only (port 3000)
   ```

7. **Access the Application**
   - **Frontend**: http://localhost:3000
   - **Login Page**: http://localhost:3000/login
   - **Backend API**: http://localhost:5000
   - **Health Check**: http://localhost:5000/api/health

## 👤 Default Roles & Permissions

### Teacher/Admin
- ✅ Create, edit, and delete students
- ✅ Create, edit, and delete classes
- ✅ Mark and manage attendance
- ✅ Import students via CSV
- ✅ Export attendance and student data
- ✅ View all statistics and reports

### Student
- ✅ View their own attendance records
- ✅ View class schedules
- ✅ Export their attendance history
- ❌ Cannot modify student or class records
- ❌ Cannot mark attendance

## 📥 CSV Import/Export

### Import Students (CSV)
Upload a CSV file with the following format:
```csv
name,rollNumber,class,email
John Doe,001,CS-A,john@university.edu
Jane Smith,002,CS-A,jane@university.edu
```

**Required columns**: `name`, `rollNumber`, `class`, `email`

### Export Attendance (CSV)
Click "Export CSV" on the Attendance page to download records in this format:
```csv
studentName,rollNumber,studentClass,studentEmail,className,subject,teacher,date,status
John Doe,001,CS-A,john@university.edu,Mathematics,Calculus I,Dr. Smith,11/2/2025,Present
```

## 📱 Screenshots

### 🏠 Homepage Dashboard

<img width="1920" height="1080" alt="Screenshot (281)" src="https://github.com/user-attachments/assets/2dcbc821-b3e4-48dd-95e1-6e59068dee7b" />


### 👥 Students Management

<img width="1920" height="1080" alt="Screenshot (282)" src="https://github.com/user-attachments/assets/8460e06b-2ce1-401e-8656-c9085ade95c8" />


### 📚 Classes Management  

<img width="1920" height="1080" alt="Screenshot (283)" src="https://github.com/user-attachments/assets/6de86f9b-e776-470d-846f-19d7f8b9db05" />


### ✅ Attendance Tracking

<img width="1920" height="1080" alt="Screenshot (284)" src="https://github.com/user-attachments/assets/714a54d6-c404-4c23-8949-9775519f563e" />


## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user profile (requires auth)
- `PUT /api/auth/update-password` - Update password (requires auth)

### Students (all require authentication)
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student (teacher/admin only)
- `PUT /api/students/:id` - Update student (teacher/admin only)
- `DELETE /api/students/:id` - Delete student (teacher/admin only)
- `GET /api/students/:id/attendance` - Get student attendance statistics
- `POST /api/students/import/csv` - Import students from CSV (teacher/admin only)
- `GET /api/students/export/csv` - Export students to CSV

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class by ID
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class
- `GET /api/classes/:id/attendance-summary` - Get class attendance summary

### Attendance (all require authentication)
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/:id` - Get attendance record by ID
- `POST /api/attendance` - Mark attendance (teacher/admin only)
- `PUT /api/attendance/:id` - Update attendance (teacher/admin only)
- `DELETE /api/attendance/:id` - Delete attendance record (teacher/admin only)
- `POST /api/attendance/bulk` - Bulk mark attendance (teacher/admin only)
- `GET /api/attendance/stats/overview` - Get attendance statistics
- `GET /api/attendance/export/csv` - Export attendance to CSV

## 📁 Project Structure

```
Student_Attendance_System/
├── backend/                 # Backend server
│   ├── models/             # MongoDB schemas
│   │   ├── Student.js      # Student model
│   │   ├── Class.js        # Class model
│   │   ├── User.js         # User/auth model
│   │   └── Attendance.js   # Attendance model
│   ├── routes/             # API endpoints
│   │   ├── students.js     # Student routes
│   │   ├── classes.js      # Class routes
│   │   ├── auth.js         # Authentication routes
│   │   └── attendance.js   # Attendance routes
│   ├── middleware/         # Custom middleware
│   │   └── auth.js         # JWT authentication
│   ├── uploads/            # Temporary CSV uploads
│   ├── config.env          # Environment variables
│   ├── package.json        # Backend dependencies
│   └── server.js           # Express server
├── frontend/               # React application
│   ├── public/             # Static files
│   │   ├── index.html      # Main HTML file
│   │   ├── favicon.ico     # App icon
│   │   └── manifest.json   # PWA manifest
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.js      # Navigation with auth
│   │   │   └── PrivateRoute.js # Protected route wrapper
│   │   ├── context/        # React context
│   │   │   └── AuthContext.js  # Auth state management
│   │   ├── pages/          # Page components
│   │   │   ├── Dashboard.js    # Dashboard page
│   │   │   ├── Login.js        # Login page
│   │   │   ├── Register.js     # Registration page
│   │   │   ├── Students.js     # Students page (with CSV import/export)
│   │   │   ├── Classes.js      # Classes page
│   │   │   └── Attendance.js   # Attendance page (with CSV export)
│   │   ├── services/       # API services
│   │   │   └── api.js      # HTTP client with auth interceptors
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # App entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # TailwindCSS configuration
│   └── postcss.config.js   # PostCSS configuration
├── package.json            # Root dependencies
└── README.md              # Project documentation
```

## 🧪 Testing

### Backend Testing
```bash
# Test backend connectivity and endpoints
node test-backend.js
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Quick Start Scripts

### Windows
```bash
# Double-click start.bat or run:
start.bat
```

### PowerShell
```powershell
# Run PowerShell script:
.\start.ps1
```

### Manual Start
```bash
# Start both servers
npm run dev

# Start backend only
npm run server

# Start frontend only  
npm run client
```

## 🔧 Configuration Options

### Environment Variables
```env
# Backend Configuration
MONGODB_URI=mongodb://localhost:27017/student_attendance
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d

# Frontend Configuration (optional)
REACT_APP_API_URL=http://localhost:5000/api
```

### MongoDB Connection
- **Local MongoDB**: `mongodb://localhost:27017/student_attendance`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/database`

## 🚨 Troubleshooting

### Common Issues

**Backend won't start**
- Check if MongoDB is running
- Verify MongoDB connection string in config.env
- Ensure port 5000 is available

**Frontend won't start**
- Check if backend is running on port 5000
- Verify all dependencies are installed
- Check for port conflicts on 3000

**Database connection errors**
- Verify MongoDB URI format
- Check network connectivity
- Ensure database user has proper permissions

**CORS errors**
- Backend has CORS enabled by default
- Check if backend is running before frontend

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment variables
2. Update MongoDB connection string for production
3. Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `build` folder to Netlify, Vercel, or AWS S3

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing [Issues](../../issues) section
2. Create a new issue with detailed information
3. Include error logs and steps to reproduce
4. Provide your environment details (OS, Node.js version, etc.)

## 🔮 Future Enhancements

- **� Session Scheduling**: Create recurring class sessions with automatic attendance tracking
- **📧 Email Notifications**: Automated attendance reminders and reports
- **📱 Mobile App**: Native mobile application for iOS and Android
- **📊 Advanced Analytics**: Detailed reports, trends, and predictions
- **📈 Attendance Trends**: Pattern analysis with visual charts
- **🔗 API Integration**: Connect with other school management systems
- **🎯 QR Code Check-in**: Quick student attendance via QR scanning
- **� Bulk Operations**: Advanced import/export with templates
- **🔍 Advanced Filtering**: Date ranges, class filters, and custom queries
- **🎨 Custom Themes**: Branding options for different institutions

## 🏫 Perfect for Universities

This system is specifically designed for university-level classes with:
- **Large Class Sizes**: Efficient bulk operations and search
- **Multiple Courses**: Organize by department, semester, and section
- **Faculty Management**: Role-based access for professors and TAs
- **Student Privacy**: Secure authentication and data protection
- **Export for Grading**: CSV exports compatible with grade books
- **Self-Service**: Students can view their own attendance

## 🙏 Acknowledgments

- Built with ❤️ using the MERN stack
- Inspired by the need for efficient attendance management
- Special thanks to the open-source community

---

**⭐ Star this repository if you find it helpful!**

**🔗 Connect with us**: [GitHub](https://github.com/Navanish-Mehta) | [LinkedIn](https://linkedin.com/in/navanish-mehta)

**📧 Contact**: navanishmehta@gmail.com

---

*Made with ❤️ for educational institutions worldwide By Navanish Mehta💕*
