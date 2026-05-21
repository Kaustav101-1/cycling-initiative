import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Campus from './pages/Campus'
import Register from './pages/Register'
import Success from './pages/Success'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/campus/:campusId" element={<Campus />} />
      <Route path="/register/:campusId" element={<Register />} />
      <Route path="/success/:campusId" element={<Success />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}
