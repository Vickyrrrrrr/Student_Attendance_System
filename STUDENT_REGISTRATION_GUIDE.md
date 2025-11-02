# Student Registration & Attendance Tracking System

## 🎯 Overview
Students can now self-register on the platform, and their data is automatically saved. Teachers can mark attendance by matching student data with CSV file uploads or manual entry.

## ✨ New Features

### 1. **Separate Login Sections** 
The login page now has two tabs:
- **👨‍🎓 Student Login** - For students to access their attendance records
- **👨‍🏫 Teacher Login** - For teachers and administrators

### 2. **Student Registration**
- Students can self-register at `/student-register`
- Required information:
  - Full Name
  - Email Address
  - Roll Number (unique identifier)
  - Class (e.g., CS-A, ECE-B)
  - Password (minimum 6 characters)
- Upon registration:
  - Student record is created in the database
  - User account is automatically created with 'student' role
  - Student can immediately login and view their dashboard

### 3. **Student Dashboard**
When students log in, they see:
- **Personal Information Card**
  - Name, Roll Number, Class, Email
- **Attendance Statistics**
  - Total Records
  - Present Days
  - Absent Days
  - Late Days
  - Overall Attendance Percentage (with color coding)
- **Attendance History**
  - Date-wise attendance records
  - Class/Subject information
  - Status (Present/Absent/Late)
  - Remarks from teachers

### 4. **Data Matching System**
Teachers can mark attendance through:

#### CSV Upload:
1. Upload CSV file with columns: `name`, `rollNumber`, `class`, `email`
2. System automatically matches CSV data with registered students
3. If student exists (by roll number or email), data is updated
4. If student is new, a new record is created
5. Results show: Created count, Updated count, Errors (if any)

#### Manual Entry:
Teachers can still manually add students and mark attendance through the interface

## 🔐 Authentication Flow

### Student Registration & Login:
```
Student → Register at /student-register
       → System creates Student record + User account
       → Auto-login with token
       → Redirects to Student Dashboard
```

### Teacher Login:
```
Teacher → Login at /login (Teacher tab)
       → Access full dashboard with all features
       → Can view/manage all students
       → Can mark attendance
       → Can upload CSV files
```

## 🗂️ Database Structure

### Student Record:
```json
{
  "name": "John Doe",
  "rollNumber": "CS2021001",
  "class": "CS-A",
  "email": "john@university.edu",
  "createdAt": "2024-11-02T..."
}
```

### User Account (linked to Student):
```json
{
  "name": "John Doe",
  "email": "john@university.edu",
  "password": "hashed_password",
  "role": "student",
  "studentId": "student_record_id"
}
```

### Attendance Record:
```json
{
  "studentId": "student_record_id",
  "classId": "class_id",
  "date": "2024-11-02",
  "status": "Present/Absent/Late",
  "remarks": "Optional notes"
}
```

## 📊 Attendance Tracking

### For Teachers:
1. **CSV Import** → Students are automatically matched and created/updated
2. **Manual Entry** → Add students individually with all details
3. **Attendance Marking** → Select class, date, and mark each student
4. **Reports** → View statistics and export data

### For Students:
- View their own attendance records
- See attendance percentage
- Track present/absent/late days
- View class-wise attendance
- Check teacher remarks

## 🎨 UI Features

### Login Page (Futuristic Design):
- Dark glassmorphism background
- Animated gradient orbs
- Tab switcher for Student/Teacher
- Different button colors for each role
- Registration link for students

### Student Dashboard (Futuristic Design):
- Gradient header with student info
- Visual statistics cards
- Progress bar for attendance percentage
- Color-coded status indicators
- Smooth animations and transitions

## 🔄 Data Flow

```
Student Registration
    ↓
Student Record Created
    ↓
User Account Created (role: student)
    ↓
Teacher Uploads CSV / Adds Students
    ↓
System Matches by Roll Number or Email
    ↓
Student Data Updated/Created
    ↓
Teacher Marks Attendance
    ↓
Attendance Records Saved
    ↓
Student Views Their Attendance
```

## 🚀 Deployment

### Backend Changes:
- New route: `/api/student-auth/register` - Student registration
- New route: `/api/student-auth/login` - Student login
- Updated: Student model with email uniqueness
- Enhanced: CSV import with better matching logic

### Frontend Changes:
- New page: `/student-register` - Student registration form
- Updated: `/login` - Separate tabs for students and teachers
- New page: `StudentDashboard` - Student-specific view
- Updated: `Dashboard` - Auto-redirects students to their dashboard
- Updated: `Navbar` - Role-based menu filtering

## 📝 Sample CSV Format

```csv
name,rollNumber,class,email
John Doe,CS2021001,CS-A,john@university.edu
Jane Smith,CS2021002,CS-A,jane@university.edu
Bob Wilson,ECE2021001,ECE-B,bob@university.edu
```

## 🎯 Benefits

1. **For Students:**
   - Self-service registration
   - Real-time attendance tracking
   - Transparent record viewing
   - Easy access to statistics

2. **For Teachers:**
   - Automated student onboarding
   - CSV bulk import capability
   - Automatic data matching
   - Less manual data entry

3. **For Administrators:**
   - Centralized student database
   - Accurate attendance records
   - Easy report generation
   - Data consistency

## 🔒 Security Features

- Passwords hashed with bcrypt
- JWT token authentication
- Role-based access control
- Input validation on all forms
- Duplicate prevention (email & roll number)
- Secure API endpoints

## 📱 Responsive Design

All pages are fully responsive and work on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Theme

The system now features a futuristic cyberpunk design with:
- Animated gradient backgrounds
- Glassmorphism effects
- Neon glow on hover
- Dark themed panels
- Smooth transitions
- Professional color schemes
