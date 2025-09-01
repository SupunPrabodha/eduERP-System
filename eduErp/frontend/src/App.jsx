import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddStaff from './pages/AddStaff'
import DisplayStaff from './pages/DisplayStaff'
import UpdateStaff from './pages/UpdateStaff'
import LeaveForm from './pages/LeaveForm'
import LeaveList from './pages/LeaveList'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DisplayStaff />} />
      <Route path='/staff/add' element={<AddStaff />} />
      <Route path='/staff/update/:id' element={<UpdateStaff />} />
      <Route path='/leaves' element={<LeaveList />} />
      <Route path='/leaves/apply' element={<LeaveForm />} />
    </Routes>
  )
}

export default App