# Job Portal Backend API

A scalable and secure **Job Portal Backend** built using **Node.js, Express.js, and MongoDB**,  
designed with **industry-level backend practices** such as JWT authentication, role-based authorization, and clean data modeling.

This application supports two distinct user roles — **Candidate** and **Recruiter** — each with clearly defined responsibilities and access control.

---

## 🚀 Key Highlights
- Clean REST API design
- JWT-based secure authentication
- Role-based access control (RBAC)
- Real-world job application workflow
- Modular and maintainable project structure

---

## 🔐 Authentication & Authorization
- User Signup & Login using JWT
- Secure protected routes
- Middleware-based role verification
- Candidates and Recruiters have strictly separated permissions

---

## 👩‍💻 Candidate Functionalities
- Apply for job postings
- View all applied jobs
- Withdraw job applications
- Duplicate job applications are prevented at API level
- Application status maintained per job

---

## 🧑‍💼 Recruiter Functionalities
- Create, update, and delete job postings
- View all jobs created by the recruiter
- View applicants for a specific job
- Recruiters can access **only their own jobs and applicants**

---

## 🗂 Data Modeling (Core Logic)
- Jobs maintain an `applicants` array
- Each applicant contains:
  - Candidate reference
  - Application status (`applied`)
- Designed to easily support future features like:
  - Shortlisting
  - Rejection
  - Application tracking

---

## 🛠 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Tokens)**

---

