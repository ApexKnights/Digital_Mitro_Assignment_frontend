import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import AddTask from './pages/addtask/AddTask'
import EditTask from './pages/edittask/EditTask'
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login'
import Register from './register/Register'
import { Toaster } from "react-hot-toast"
import { UserContext } from './context/UserContext'

const App = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      {
        user ? <div>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/addtask' element={<AddTask />} />
            <Route path='/edittask/:taskId' element={<EditTask />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<Home />} />
          </Routes>
          <Toaster />
        </div> : <div>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Login />} />
          </Routes>
        </div>
      }


    </>
  )
}

export default App
