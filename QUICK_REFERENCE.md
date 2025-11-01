# 📖 Quick Reference Guide

## 🚀 Starting the Application

### Development Mode
```bash
# From project root
npm run dev
```

### Production Mode
```bash
# Backend
cd backend
npm start

# Frontend (separate terminal)
cd frontend
npm start
```

### Seed Sample Data
```bash
cd backend
npm run seed
```

---

## 👤 Default Test Accounts

After running `npm run seed`:

**Teacher/Admin**
- Email: `admin@university.edu`
- Password: `admin123`

**Student**
- Email: `student@university.edu`
- Password: `student123`

---

## 📱 Application URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Main application |
| Login | http://localhost:3000/login | Login page |
| Register | http://localhost:3000/register | Sign up |
| Backend API | http://localhost:5000 | API server |
| Health Check | http://localhost:5000/api/health | Server status |

---

## 🔐 Authentication Endpoints

```bash
# Register new user
POST /api/auth/register
Body: { "name", "email", "password", "role" }

# Login
POST /api/auth/login
Body: { "email", "password" }

# Get current user (requires token)
GET /api/auth/me
Header: Authorization: Bearer <token>

# Update password (requires token)
PUT /api/auth/update-password
Body: { "currentPassword", "newPassword" }
```

---

## 👥 Student Operations

### Get All Students
```bash
GET /api/students
Header: Authorization: Bearer <token>
```

### Create Student (Teacher only)
```bash
POST /api/students
Header: Authorization: Bearer <token>
Body: { "name", "rollNumber", "class", "email" }
```

### Import Students CSV (Teacher only)
```bash
POST /api/students/import/csv
Header: Authorization: Bearer <token>
Body: FormData with file field
```

### Export Students CSV
```bash
GET /api/students/export/csv
Header: Authorization: Bearer <token>
Response: CSV file download
```

### Delete Student (Teacher only)
```bash
DELETE /api/students/:id
Header: Authorization: Bearer <token>
```

---

## 📚 Class Operations

### Get All Classes
```bash
GET /api/classes
Header: Authorization: Bearer <token>
```

### Create Class (Teacher only)
```bash
POST /api/classes
Header: Authorization: Bearer <token>
Body: { "name", "subject", "teacher" }
```

### Update Class (Teacher only)
```bash
PUT /api/classes/:id
Header: Authorization: Bearer <token>
Body: { "name", "subject", "teacher" }
```

---

## ✅ Attendance Operations

### Mark Attendance (Teacher only)
```bash
POST /api/attendance
Header: Authorization: Bearer <token>
Body: { 
  "studentId", 
  "classId", 
  "date", 
  "status": "Present|Absent|Late" 
}
```

### Bulk Mark Attendance (Teacher only)
```bash
POST /api/attendance/bulk
Header: Authorization: Bearer <token>
Body: {
  "classId",
  "date",
  "attendanceData": [
    { "studentId", "status" },
    { "studentId", "status" }
  ]
}
```

### Get Attendance Records
```bash
GET /api/attendance?studentId=xxx&classId=xxx&date=yyyy-mm-dd
Header: Authorization: Bearer <token>
```

### Export Attendance CSV
```bash
GET /api/attendance/export/csv?startDate=xxx&endDate=xxx
Header: Authorization: Bearer <token>
Response: CSV file download
```

### Get Statistics
```bash
GET /api/attendance/stats/overview?startDate=xxx&endDate=xxx
Header: Authorization: Bearer <token>
```

---

## 📥 CSV File Formats

### Students Import (students.csv)
```csv
name,rollNumber,class,email
John Doe,CS001,Computer Science - Year 1,john@university.edu
Jane Smith,CS002,Computer Science - Year 1,jane@university.edu
```

**Required Fields:**
- `name` - Full student name
- `rollNumber` - Unique student ID/roll number
- `class` - Class/year/section
- `email` - Valid email (must be unique)

**Notes:**
- First row must be the header
- Existing students (same rollNumber or email) will be updated
- Invalid rows will be skipped with error report

---

## 🎨 User Interface Features

### Search Students
- Click search bar on Students page
- Type: name, roll number, class, or email
- Results update in real-time
- Clear with X button

### Role-Based Visibility
- **Teacher/Admin**: See all buttons (Add, Edit, Delete, Import)
- **Student**: Read-only access, no modification buttons

### Export Data
1. Go to Students or Attendance page
2. Click "Export CSV" button
3. File downloads automatically
4. Open in Excel or import to other systems

### Import Students
1. Prepare CSV file (see format above)
2. Go to Students page
3. Click "Import CSV"
4. Select your file
5. Wait for confirmation
6. Check results (created/updated/errors)

---

## 🛠️ Common Tasks

### Add a New Class Section
1. Login as teacher
2. Go to Classes page
3. Click "Add Class"
4. Enter details:
   - Name: "Introduction to Python - Section A"
   - Subject: "Computer Science"
   - Teacher: "Dr. Jane Smith"
5. Click "Add Class"

### Mark Attendance for Today
1. Go to Attendance page
2. Click "Mark Attendance"
3. Select student from dropdown
4. Select class from dropdown
5. Date defaults to today (can change)
6. Choose status: Present/Absent/Late
7. Click "Mark Attendance"

### Export Attendance for Grading
1. Go to Attendance page
2. Click "Export CSV"
3. Open CSV in Excel
4. Use for grade calculations
5. Columns include: student info, class, date, status

### Get Student Attendance Summary
```bash
GET /api/students/:studentId/attendance
```
Returns:
- Total attendance records
- Present/Absent/Late counts
- Attendance percentage
- Full attendance history

---

## 🔧 Environment Configuration

### Backend (.env or config.env)
```env
MONGODB_URI=mongodb://localhost:27017/student_attendance
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-key-min-32-characters
JWT_EXPIRE=7d
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚨 Troubleshooting Quick Fixes

### "Network Error" in browser
→ Backend not running. Start it: `cd backend && npm start`

### "401 Unauthorized"
→ Token expired. Logout and login again.

### "Cannot read property of undefined"
→ Refresh the page to reload data.

### CSV import shows errors
→ Check CSV format matches template exactly.

### MongoDB connection refused
→ Start MongoDB: `mongod` or check Atlas connection string.

---

## 📊 Database Backup

### Quick Backup
```bash
# Backup
mongodump --db student_attendance --out ./backup

# Restore
mongorestore --db student_attendance ./backup/student_attendance
```

### Via CSV Export
1. Export all students → CSV
2. Export all attendance → CSV
3. Store files safely
4. Re-import when needed

---

## 💡 Pro Tips

1. **Bulk Import**: Use CSV import for 50+ students (much faster)
2. **Search**: Use search instead of scrolling through long lists
3. **Export Often**: Weekly attendance exports for backup
4. **Test Account**: Create a test student account to see student view
5. **Validation**: System prevents duplicate roll numbers and emails
6. **Auto-Update**: CSV import updates existing students (no duplicates)
7. **Date Format**: YYYY-MM-DD works best for attendance dates
8. **Token**: JWT token lasts 7 days by default

---

## 📞 Support

**Check Logs**: 
- Backend: Terminal running `npm run server`
- Frontend: Browser DevTools → Console

**Common Error Codes**:
- 400: Bad request (check your data)
- 401: Not authenticated (login required)
- 403: Forbidden (teacher access only)
- 404: Not found
- 500: Server error (check backend logs)

---

*Last Updated: November 2, 2025*
