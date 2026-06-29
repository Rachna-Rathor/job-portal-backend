import React from 'react'
// import RecruiterDashboard from './pages/RecruiterDashboard'
import Signup from './Components/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import RecruiterDashboard from "./pages/RecruiterDashboard"
import EditJob from './Components/EditJob'
import CandidateDashboard from './pages/CandidateDashboard'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='edit-job/:id' element={<EditJob />}/>
        {/* <Route path='/' element={<RecruiterDashboard />} /> */}
         <Route path='/candidate-dashboard' element={<CandidateDashboard/>} />

      </Routes>

    </div>
  )
}

export default App