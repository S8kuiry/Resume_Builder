import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import Loading from './Loading'
import Preview from '../pages/Preview'
import { ArrowLeft } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PreviewPage = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = useState(null)
  const [loading, setLoading] = useState(false)
  const {token ,backendUrl,user} = useContext(AppContext)

  const navigate = useNavigate()

  const loadResume = async () => {
    setLoading(true)
    const found = dummyResumeData.find(resume => resume._id === resumeId)
    setTimeout(() => { // simulate async loading
      setResumeData(found || null)
      setLoading(false)
    }, 800)
  }
 const getResumeById = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/resumes/get/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // Backend likely sends: { success: true, resume: {...} }
      
      const resume = response.data.resume;
      console.log(resume)

      setResumeData(prev => ({
        ...prev,
        ...resume, // ✅ Properly merge fetched data into state
      }));


    } catch (error) {
      toast.error(error.message);
      console.log(error.message);

    }
  }
  useEffect(() => {
    getResumeById()
  }, [])

  if (loading) return <Loading />

  if (!resumeData) {
    return (
      <div className="h-screen flex flex-col gap-2 items-center justify-center bg-gradient-to-br from-teal-400 via-teal-200/40 to-teal-400">
        <p className="text-teal-900 text-5xl mb-2  ">Resume not found</p>
          <button
          onClick={() => navigate('/app')}
          className="flex items-center justify-center text-xl gap-3 text-teal-900 cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="size-4" />
          Go to Home Page
        </button>
      </div>
    )
  }

  return (
    <div className=" h-screen overflow-y-scroll w-full bg-gradient-to-br from-teal-400 via-teal-200/40 to-teal-400 absolute bottom-0 flex flex-col items-center">
      
    
      {(user._id === resumeData.userId) && <button
          onClick={() => navigate('/app')}
          className="absolute top-4 right-5 flex items-center justify-center text-sm gap-2 text-teal-800 cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="size-4" />
          Go to Home Page
        </button>}
     
      <div className=" max-w-xl sm:max-w-3xl mx-auto py-10 overflow-y-scroll">
        <Preview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  )
}

export default PreviewPage
