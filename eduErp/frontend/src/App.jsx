import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddStaff from './pages/AddStaff'
import DisplayStaff from './pages/DisplayStaff'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DisplayStaff />} />
      <Route path='/add' element={<AddStaff />} />
    </Routes>
  )
}

export default App