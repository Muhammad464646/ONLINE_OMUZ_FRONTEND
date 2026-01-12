import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginAndRegister from './pages/LoginAndRegister'
import Course from './pages/Course'
import CoursePageById from './pages/CoursePageById'
import Layout from './Layout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<Course />} />
          <Route path='/courses/:id' element={<CoursePageById />} />
        </Route>
          <Route path='/Auth' element={<LoginAndRegister />} />
      </Routes>
    </>
  )
}

export default App
