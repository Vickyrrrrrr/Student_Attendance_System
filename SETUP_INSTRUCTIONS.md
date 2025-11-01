# 🚀 Complete Setup Guide for University Use

## Prerequisites
- Node.js (v14+) installed
- MongoDB running locally or MongoDB Atlas account
- Git (for cloning the repository)

## 🎯 Quick Start (Windows)

### Option 1: Use the batch file (Recommended)
1. Double-click `start.bat`
2. Wait for both servers to start
3. Open http://localhost:3000 in your browser
4. Register your first admin account

### Option 2: Manual start
1. Open PowerShell in the project directory
2. Run: `npm run dev`

## 🎯 Quick Start (Mac/Linux)
1. Open terminal in the project directory
2. Run: `npm run dev`

## 🔧 Initial Configuration

### 1. Environment Setup
Update `backend/config.env` with your settings:
```env
MONGODB_URI=mongodb://localhost:27017/student_attendance
PORT=5000
NODE_ENV=development
JWT_SECRET=change-this-to-a-secure-random-string-in-production
JWT_EXPIRE=7d
```

**Important**: Change `JWT_SECRET` to a secure random string for production!

### 2. Seed Sample Data (Optional)
To quickly test the system with sample data:
```bash
cd backend
npm run seed
```

This will create:
- 10 sample students
- 5 sample classes
- 3 test users (1 teacher, 1 student, 1 TA)

**Sample Credentials**:
- **Teacher**: admin@university.edu / admin123
- **Student**: student@university.edu / student123

### 3. Import Your Own Students
1. Login as a teacher/admin
2. Go to Students page
3. Click "Import CSV"
4. Upload a CSV file with format: `name,rollNumber,class,email`
5. Sample file provided: `sample_students.csv`

## 📱 Access Points
- **Frontend**: http://localhost:3000
- **Login Page**: http://localhost:3000/login
- **Register Page**: http://localhost:3000/register
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 👤 First-Time Setup

### Create Your First Admin Account
1. Go to http://localhost:3000/register
2. Fill in details:
   - Name: Your name
   - Email: Your university email
   - Role: **Teacher**
   - Password: Secure password (min 6 chars)
3. Click "Create account"
4. You'll be automatically logged in

### Add Students
**Option A: CSV Import (Bulk)**
1. Prepare a CSV file with columns: `name,rollNumber,class,email`
2. Login as teacher
3. Go to Students → Import CSV
4. Upload your file
5. Students will be created/updated automatically

**Option B: Manual Entry**
1. Go to Students page
2. Click "Add Student"
3. Fill in the form
4. Click "Add Student"

### Add Classes
1. Go to Classes page
2. Click "Add Class"
3. Enter:
   - Class Name (e.g., "Introduction to Python")
   - Subject (e.g., "Computer Science")
   - Teacher Name
4. Click "Add Class"

### Mark Attendance
1. Go to Attendance page
2. Click "Mark Attendance"
3. Select:
   - Student
   - Class
   - Date
   - Status (Present/Absent/Late)
4. Click "Mark Attendance"

**Bulk Attendance** (coming soon): Mark attendance for entire class at once

## 📥 CSV File Formats

### Students Import Template
```csv
name,rollNumber,class,email
John Doe,CS001,Computer Science - Year 1,john@uni.edu
Jane Smith,CS002,Computer Science - Year 1,jane@uni.edu
```

**Required Fields**:
- `name`: Full student name
- `rollNumber`: Unique student ID
- `class`: Class/year/section
- `email`: Valid email address (unique)

**Notes**:
- Duplicate rollNumber or email will update existing student
- First row must be the header
- Save as UTF-8 encoded CSV

### Attendance Export Format
When you export attendance, you'll get:
```csv
studentName,rollNumber,studentClass,studentEmail,className,subject,teacher,date,status
John Doe,CS001,CS-Y1,john@uni.edu,Python,CS,Dr. Smith,11/2/2025,Present
```

## � User Roles & Permissions

### Teacher/Admin
✅ Full access to all features  
✅ Create/edit/delete students  
✅ Create/edit/delete classes  
✅ Mark and manage attendance  
✅ Import students via CSV  
✅ Export data  
✅ View all statistics  

### Student
✅ View their own attendance  
✅ View class schedules  
✅ Export their attendance  
❌ Cannot modify records  
❌ Cannot mark attendance  

## 🧪 Testing the System

### Quick Health Check
```bash
# Test if backend is running
curl http://localhost:5000/api/health
```

### Test Login Flow
1. Register a new teacher account
2. Logout
3. Login with the same credentials
4. Verify you can access protected pages

### Test CSV Import
1. Use the provided `sample_students.csv` file
2. Import via Students page
3. Verify all 10 students were created
4. Try importing again (should update, not duplicate)

## 🚨 Common Issues & Solutions

### Backend won't start
**Problem**: MongoDB connection error  
**Solution**: 
1. Check if MongoDB is running: `mongod --version`
2. Verify `MONGODB_URI` in `config.env`
3. For MongoDB Atlas, ensure IP whitelist is configured

### Frontend shows "Network Error"
**Problem**: Backend not running  
**Solution**: 
1. Start backend first: `cd backend && npm start`
2. Verify http://localhost:5000/api/health returns OK

### "Token expired" errors
**Problem**: Old JWT token in browser  
**Solution**: 
1. Logout and login again
2. Or clear localStorage in browser DevTools

### CSV import fails
**Problem**: Invalid CSV format  
**Solution**: 
1. Ensure first row is: `name,rollNumber,class,email`
2. No empty required fields
3. Save file as UTF-8 CSV

### PowerShell execution policy error
**Problem**: Can't run npm commands  
**Solution**: Use `cmd` instead:
```bash
cmd /c "npm run dev"
```

## 📊 Database Backup

### Export Current Data
Use MongoDB tools to backup:
```bash
# Backup entire database
mongodump --db student_attendance --out ./backup

# Restore from backup
mongorestore --db student_attendance ./backup/student_attendance
```

### Export via CSV
For student and attendance data:
1. Login as teacher
2. Go to Students → Export CSV
3. Go to Attendance → Export CSV
4. Save files for records

## 🚀 Production Deployment

### Backend (Heroku/Railway/AWS)
1. Set environment variables:
   ```
   MONGODB_URI=your-production-mongodb-uri
   NODE_ENV=production
   JWT_SECRET=strong-random-secret
   PORT=5000
   ```
2. Deploy backend code
3. Note the backend URL

### Frontend (Netlify/Vercel)
1. Build the frontend: `cd frontend && npm run build`
2. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```
3. Deploy the `build` folder

### Security Checklist
- ✅ Change `JWT_SECRET` to random 32+ character string
- ✅ Use HTTPS for production
- ✅ Enable MongoDB authentication
- ✅ Set `NODE_ENV=production`
- ✅ Configure CORS for your domain only
- ✅ Regular database backups
- ✅ Monitor for security updates

## 📚 What's Included
✅ Complete MERN stack application  
✅ JWT authentication & authorization  
✅ Role-based access control (Teacher/Student)  
✅ Student management with CSV import/export  
✅ Class management (CRUD)  
✅ Attendance tracking with CSV export  
✅ Real-time search and filtering  
✅ Responsive UI with TailwindCSS  
✅ Toast notifications  
✅ Protected routes  
✅ Error handling & validation  
✅ MongoDB with Mongoose  
✅ RESTful API endpoints  
✅ Sample seed data  

## � University-Specific Tips

### For Large Classes (100+ students)
- Use CSV import instead of manual entry
- Export attendance weekly for backup
- Use search feature to find students quickly

### For Multiple Sections
- Include section in class name: "CS101-A", "CS101-B"
- Create separate classes for each section
- Use class field in student model for grouping

### For TAs
- Register TAs with "teacher" role
- They get full access like instructors
- Consider adding TA name to class teacher field

### Semester Rollover
1. Export all data at end of semester
2. Archive or delete old attendance records
3. Update student class fields for new semester
4. Keep student records for historical data

## 🎉 You're Ready!
The system is now configured for your university class. Happy teaching! 📚

For questions or issues, check the main README.md or create an issue on GitHub.
