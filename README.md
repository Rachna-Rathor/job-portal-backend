# Job Portal Backend

This is the **backend of a Job Portal Application** built using **Node.js**, **Express**, and **MongoDB**.  
It provides secure REST APIs for user authentication, job postings, applications, and AI-powered features to enhance recruitment efficiency.

This project is designed to make the hiring process smarter, faster, and more accurate using AI for resume analysis and job-candidate matching.

---

## 🔑 Features

### Core Features
- ✅ **User Authentication**
  - Users can register and login using email/password.
  - Passwords are securely hashed with bcrypt.
- ✅ **Role-Based Access Control**
  - Separate endpoints for **job seekers** and **recruiters**.
- ✅ **Job Management**
  - Recruiters can post, update, and delete job listings.
  - View job listings with filters such as location, skills, or company.
- ✅ **Application Management**
  - Job seekers can apply to jobs and track application status.
  - Recruiters can view applicants for their jobs.
- ✅ **Resume Upload**
  - Users can upload resumes in PDF format.
  - Resumes are stored securely and used for AI analysis.

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

### Additional Features
- 📄 **Search & Filters**
  - Search jobs by **title, skills, location, or company**.
- 📊 **Analytics**
  - Track application submissions and candidate engagement metrics.
- 🔒 **Security**
  - JWT authentication for secure routes.
  - Role-based access control ensures only authorized users can perform certain actions.

---

## ⚡ Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB, Mongoose  
- **AI & NLP:** OpenAI API or custom AI module for resume parsing & job matching  
- **Authentication:** JWT, bcrypt  

---

## 🛠 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd job-portal-backend
