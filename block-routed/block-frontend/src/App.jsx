import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import {useDispatch} from 'react-redux'
import NewBlog from './components/NewBlog'
import './App.css'
import { initialBLogs } from './reducers/blogReducer'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Login from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import { setAllusers } from './reducers/userReducer'
import BlogDetails from './components/BlogDetails'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate
} from "react-router-dom"



function App() {

  const disPatch = useDispatch()
  useEffect(() => {
      disPatch(initialBLogs())
      disPatch(setAllusers())
  }, [])

  return (
    <div>
      <Menu />
      <Notification />
      <Routes>
        <Route path='/' element={<BlogList />}/>
        <Route path='/create' element={<NewBlog />}/>
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/login' element={<Login />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
      </Routes>
    </div>
  )
}

export default App
