import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AddTask from './pages/AddTask'
import Update from './pages/Update'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddTask />} />
          <Route path='/edit' element={<Update />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
