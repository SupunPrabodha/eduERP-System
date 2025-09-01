import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddStaff from './pages/AddStaff'
import DisplayStaff from './pages/DisplayStaff'
import UpdateStaff from './pages/UpdateStaff'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DisplayStaff />} />
      <Route path='/add' element={<AddStaff />} />
      <Route path='/update-staff/:id' element={<UpdateStaff />} />
    </Routes>
  )
}

export default App