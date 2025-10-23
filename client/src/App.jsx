import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import PreviewPage from './components/PreviewPage'
import {ToastContainer} from 'react-toastify'
const App = () => {
  return (
    < >
    <ToastContainer position='top-center' autoClose={3000}/>
      <Routes>
        <Route path='/' element={<Home />}></Route>

        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<PreviewPage />} />
        <Route path='login' element={<Login />} />



      </Routes>

    </>
  )
}

export default App