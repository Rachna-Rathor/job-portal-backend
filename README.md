# 🚀 Job Portal Backend with AI Recommendations

A scalable and production-ready backend system for a Job Portal application built using Node.js, Express, and MongoDB.  

This platform enables recruiters to manage job postings and candidates to apply, track, and interact with jobs. It also includes an AI-powered job recommendation system.

---

## 🌟 Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Recruiter / Candidate)
- Protected routes using middleware

---

### 🧑‍💼 Recruiter Functionalities
- Create Job
- Update Job
- Delete Job
- View all jobs
- View applicants for a specific job
- Application status tracking (Applied, Shortlisted, Rejected)
---

### 👩‍💻 Candidate Functionalities
- Apply for jobs
- View applied jobs
- Withdraw job applications

---

### 🔍 Advanced Features
- Dynamic job filtering (title, location, salary, type)
- Pagination (page & limit support)
- Resume upload using Multer
- Clean modular architecture

---

### 🤖 AI-Powered Job Recommendation
- Recommend jobs based on user input
- Dedicated API for AI-based suggestions
- Extensible for ML/AI integrations

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- Multer (File Upload)
- REST APIs

---

## 📁 Project Structure


job-portal-backend/
│
├── controllers/
│ ├── auth.controller.js
│ ├── recruiter.controller.js
│ ├── candidate.controller.js
│ ├── resume.controller.js
│ └── ai.controller.js
│
├── middleware/
│ ├── auth.middleware.js
│ ├── role.middleware.js
│ ├── candidate.middleware.js
│ └── resume.upload.js
│
├── routes/
│ ├── job.routes.js
│ ├── resume.routes.js
│ └── ai.routes.js
│
├── models/
│ └── job.model.js
│
├── index.js
├── package.json
└── .env


---

## 🔗 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|--------|-------------|
| POST | `/signup` | Register new user |
| POST | `/login` | Login user |

---

### 🧑‍💼 Recruiter APIs

| Method | Endpoint | Description |
|--------|--------|-------------|
| POST | `/createJob` | Create job |
| PUT | `/updateJob/:id` | Update job |
| DELETE | `/deleteJob/:id` | Delete job |
| GET | `/viewallJobs` | View jobs (filters + pagination) |
| GET | `/job/:jobId/applicants` | Get applicants |

---

### 👩‍💻 Candidate APIs

| Method | Endpoint | Description |
|--------|--------|-------------|
| POST | `/apply/:jobId` | Apply to job |
| GET | `/appliedjobs` | View applied jobs |
| DELETE | `/withdraw/:jobId` | Withdraw application |

---

### 📄 Resume APIs

| Method | Endpoint | Description |
|--------|--------|-------------|
| POST | `/resumeanalyze` | Upload & analyze resume |

---

### 🤖 AI APIs

| Method | Endpoint | Description |
|--------|--------|-------------|
| GET | `/ai/test` | Test AI route |
| POST | `/ai/recommend-jobs` | Get job recommendations |

---

## 🔍 Filtering & Pagination

### Example:

GET /viewallJobs?title=Backend Developer&location=Delhi&page=1&limit=5


### Supported Filters:
- Title
- Location
- Salary
- Job Type

### Pagination:
- Page number
- Limit per page

---

## 🔐 Authentication Usage

Add JWT token in headers:

Authorization: Bearer <your_token>


---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

git clone https://github.com/your-username/job-portal-backend.git


### 2️⃣ Install dependencies

npm install


### 3️⃣ Create `.env` file

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


### 4️⃣ Run the server

npm run dev

or

nodemon index.js


---

## 🧪 Testing

- Use Postman to test APIs
- Verify JWT authentication
- Test role-based routes
- Validate filtering & pagination
- Test AI recommendation endpoint

---

## 🚀 Highlights

- Modular and scalable architecture
- Role-based authentication system
- Dynamic query-based filtering
- Pagination for performance optimization
- Resume upload support
- AI-powered recommendation system

---

## 🔮 Future Improvements

- Email notifications
- Real-time updates (Socket.io)
- Admin dashboard

---

## 👩‍💻 Author

**Rachna**



