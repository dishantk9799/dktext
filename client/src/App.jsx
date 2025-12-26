import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Detail from './pages/Detail.jsx';
import Create from './pages/Create.jsx';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div data-theme="coffee">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
      <ToastContainer position="top-center" theme="dark"/>
    </div>
  )
}

export default App
