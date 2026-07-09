# Enterprise HRMS Frontend

A modern Enterprise Human Resource Management System (HRMS) frontend built using **React**, **Vite**, and **React Router**. The application provides an intuitive and responsive interface for managing employees, recruitment, attendance, payroll, leave, performance, organization settings, and documents with secure Role-Based Access Control (RBAC).

---

# Features

- JWT Authentication
- Role-Based Access Control (RBAC)
- Responsive Dashboard
- Employee Management
- User Management
- Recruitment Management
- Candidate Pipeline
- Attendance Management
- Leave Management
- Payroll Management
- Performance Management
- Document Management
- Organization Management
- Organization Policies
- Department Management
- Employee Profile
- Enterprise Sidebar Navigation
- Toast Notifications
- Responsive UI

---

# Tech Stack

- React 18
- Vite
- React Router DOM
- Axios
- React Icons
- React Toastify
- CSS3

---

# Project Structure

```text
hrms-frontend-enterprise/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── layouts/
│   │   └── router/
│   │
│   ├── context/
│   │
│   ├── modules/
│   │   ├── attendance/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── departments/
│   │   ├── documents/
│   │   ├── employees/
│   │   ├── leave/
│   │   ├── organization/
│   │   ├── payroll/
│   │   ├── performance/
│   │   ├── recruitment/
│   │   └── users/
│   │
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

---

# Prerequisites

- Node.js 18+
- npm
- Backend API running

---

# Installation

## Clone Repository

```bash
git clone <https://github.com/01ayuvi/hrms-frontend-enterprise/tree/main>
cd hrms-frontend-enterprise
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

# Run the Development Server

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# Production Build

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Backend Requirement

The backend server must be running before starting the frontend.

Default Backend URL:

```
http://127.0.0.1:8000
```

API documentation is available at:

```
http://127.0.0.1:8000/docs
```

---

# Authentication & RBAC

The application uses JWT Authentication with Role-Based Access Control.

Supported Roles:

- Administrator
- HR Administrator
- HR Manager
- Recruiter
- Payroll Manager
- Employee

Each role is presented with a different navigation menu and access permissions.

---

# Available Modules

- Dashboard
- Employees
- Create Employee
- Create User
- Recruitment
- Candidate Management
- Candidate Pipeline
- Attendance
- Leave Management
- Payroll
- Performance
- Documents
- Organization
- Organization Policies
- Departments

---

# Demo Login

### Administrator

```
Username: admin
Password: admin123
```

The Administrator account provides complete access to all HRMS modules.

Additional users can be created through the **Create Employee** and **Create User** modules.

---

# Screenshots

The interface includes:

- Modern Dashboard
- Enterprise Sidebar
- Responsive Layout
- Employee Directory
- Attendance Dashboard
- Recruitment Module
- Organization Management
- Payroll & Performance Pages

---

# Backend Repository

This frontend is designed to work with the **Enterprise HRMS Backend** built using FastAPI and PostgreSQL.

The backend repository contains:

- REST APIs
- PostgreSQL Database
- JWT Authentication
- RBAC
- Swagger Documentation
- Postman Collection

---

# Key Highlights

- Enterprise UI Design
- Responsive Layout
- Modular Architecture
- JWT Authentication
- Secure RBAC
- REST API Integration
- Clean Folder Structure
- Reusable Components
- Service-Based API Layer

---

# Authors

Developed as part of an Enterprise HRMS Internship Project.

Contributors:
- Ayuvi Chaudhary
- Kavya Kundu
- Dhruv (Recruitment & Performance)
