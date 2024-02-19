import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
