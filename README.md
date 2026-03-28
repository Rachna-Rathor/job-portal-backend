# Job Portal Backend API

This is the **backend of a Job Portal Application** built using **Node.js**, **Express**, and **MongoDB**.  
It provides secure REST APIs for user authentication, job postings, applications, and AI-powered features to enhance recruitment efficiency.

This project is designed to make the hiring process smarter, faster, and more accurate using AI for resume analysis and job-candidate matching.

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
### Additional Features
- 📄 **Search & Filters**
  - Search jobs by **title, skills, location, or company**.
- 📊 **Analytics**
  - Track application submissions and candidate engagement metrics.
---

## 🧑‍💼 Recruiter Functionalities
- Create, update, and delete job postings
- View all jobs created by the recruiter
- View applicants for a specific job
- Recruiters can access **only their own jobs and applicants**

---
### AI-Powered Features
- 🤖 **Resume Analyzer**
  - Parses resumes to extract **skills**, **experience**, **education**, and other relevant information.
  - Helps in automated screening of candidates.
- 🤖 **Job Matching AI**
  - Matches candidates with the most relevant job listings based on their skills and experience.
  - Provides a **match score** for better clarity.
- 🤖 **Top Candidate Ranking**
  - For each job, shows recruiters the **top 5 most relevant candidates**.
  - Reduces time in shortlisting applications manually.
- 🤖 **Skill Recommendations**
  - Suggests additional skills a candidate may add to improve job match scores.
  - Helps candidates optimize their profiles for better opportunities.

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

