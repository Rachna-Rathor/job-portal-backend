import React from 'react'
// import RecruiterDashboard from './pages/RecruiterDashboard'
import Signup from './Components/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import RecruiterDashboard from "./pages/RecruiterDashboard"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<RecruiterDashboard />} />

      </Routes>

    </div>
  )
}

export default App