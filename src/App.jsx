import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import LoginAndRegister from './pages/LoginAndRegister'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/Auth' element={<LoginAndRegister />} />
   </Routes>
    </>
  )
}

export default App
