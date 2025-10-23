import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Edit2Icon,
  FilePenLineIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BackgroundBoxesDemo } from '../components/GridBg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import pdfToText from 'react-pdftotext'
import Loading from '../components/Loading';

const Dashboard = () => {
  const { bgCol, user, backendUrl, token, allResume, fetchAllResume } =
    useContext(AppContext);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllResume();
  }, []);

  

  
  useEffect(() => {
    if (resume?.name) {
      document.title = `${resume.name} - Resume Builder`;
    } else if (title) {
      document.title = `${title} - Resume Builder`;
    } else {
      document.title = 'Dashboard - Resume Builder';
    }
  }, [resume, title]);

  const deleteResume = async (resumeId) => {
    setLoading(true)
    try {
      const confirmm = window.confirm('Do you want to delete ?');
      if (!confirmm) return;

      const response = await axios.delete(
        `${backendUrl}/api/resumes/delete/${resumeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      fetchAllResume(); // Refresh context state immediately
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
    setLoading(false)
  };

  const createResume = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(
        `${backendUrl}/api/resumes/create`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAllResume(); // Refresh context state
      navigate(`/app/builder/${response.data.resume._id}`);
      toast.success(response.data.message);
      setShowCreateResume(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
    setLoading(false)
  };

  // edit resume title
  const editTitle = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
    // Build resumeData correctly
    const resumeData = { title }; // <-- this is the key
    await axios.put(
      `${backendUrl}/api/resumes/update`,
      {
        resumeId: editResumeId,
        resumeData: JSON.stringify(resumeData),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchAllResume(); // refresh list
    setEditResumeId(''); // close modal
    toast.success('Title Changed Successfully');
  } catch (error) {
    toast.error(error.message);
    console.log(error.message);
  }
  setLoading(false)
};

//----------------------- upload resume-----------------
const uploadResume = async (e) => {
    e.preventDefault();
    setLoading(true)
    
    try {
      const resumeText = await pdfToText(resume)
      const {data} = await axios.post(backendUrl+'/api/resumes/create',{title,resumeText},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      fetchAllResume()
      setTitle('')
      setResume(null)
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      
    }
    setLoading(false)
    
  };

  return (
    <>
    {loading && <div className="h-screen bg-blur  flex items-center justify-center z-20 ">
      <Loading/>
      </div>}
      <div
        className={`relative ${
          bgCol ? 'bg-gray-900 text-slate-300' : 'bg-gray-200 text-black'
        } min-h-screen`}
      >
        <BackgroundBoxesDemo />

        <div className="relative z-30 max-w-7xl mx-auto px-4 py-8">
          <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-500 to-slate-700 bg-clip-text text-transparent sm:hidden">
            Welcome , {user.name}
          </p>

          <div className="w-full flex gap-6">
            {/* Create Resume */}
            <button
              className={`w-[11rem] h-[15rem] border border-dashed rounded-lg flex flex-col items-center justify-center gap-3 group hover:border-green-700 hover:shadow-lg transition-all duration-300 cursor-pointer 
              ${bgCol ? 'bg-transparent text-slate-400 shadow-green-500' : 'bg-white text-gray-700 shadow-gray-400'}`}
            >
              <PlusIcon
                onClick={() => setShowCreateResume(true)}
                className="text-white bg-green-500 rounded-full p-2 size-10 bg-gradient-to-br from-green-500 to-green-700"
              />
              <p className="text-sm group-hover:text-green-700 transition-all duration-300">
                Create Resume
              </p>
            </button>

            {/* Upload Resume */}
            <button
              className={`w-[11rem] h-[15rem] border border-dashed rounded-lg flex flex-col items-center justify-center gap-3 group hover:border-indigo-600 hover:shadow-lg transition-all duration-300 cursor-pointer 
              ${bgCol ? 'bg-transparent text-slate-400 shadow-indigo-500' : 'bg-white text-gray-700 shadow-gray-400'}`}
            >
              <UploadCloudIcon
                onClick={() => setShowUploadResume(true)}
                className="text-white bg-indigo-500 rounded-full p-2 size-10 bg-gradient-to-br from-indigo-500 to-indigo-700"
              />
              <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
                Upload Existing
              </p>
            </button>
          </div>

          <hr className="sm:w-[380px] border border-slate-500 mt-10 mb-10" />

          {/* Resume Display */}
          <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
            {allResume?.map((resume, index) => (
              <motion.div
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                whileHover={{ scale: 1.03 }}
                key={index}
                className={`group relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg border gap-3
                    border-dashed transition-all duration-300 cursor-pointer
                    hover:shadow-lg 
                    ${
                      bgCol
                        ? 'bg-gradient-to-br from-slate-300/10 to-slate-600/10 border-slate-500 shadow-slate-500 text-slate-200'
                        : 'bg-white border-gray-900 shadow-gray-400 text-gray-700'
                    }`}
              >
                <FilePenLineIcon className="size-7 group-hover:scale-110 transition-all duration-300 text-green-600" />
                <p className="text-sm">{resume.title}</p>
                <p className="absolute bottom-2 text-xs">
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <TrashIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResume(resume._id);
                  }}
                  className="hover:text-black absolute top-2 right-10 group-hover:block hidden size-6 rounded hover:bg-slate-300 p-1"
                />
                <Edit2Icon
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditResumeId(resume._id);
                    setTitle(resume.title);
                    editTitle
                  }}
                  className="hover:text-black absolute top-2 right-3 group-hover:block hidden size-6 rounded hover:bg-slate-300 p-1"
                />
              </motion.div>
            ))}
          </div>

          {/* ---------- Edit Resume Modal ---------- */}
          {editResumeId && (
            <div
              onClick={() => setEditResumeId('')}
              className="backdrop-blur fixed inset-0 bg-gray-900/70 flex items-center justify-center"
            >
              <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                onSubmit={editTitle}
                className="w-[24rem] bg-white rounded h-[12.8rem] flex flex-col gap-3 items-start justify-start relative py-5 px-5"
              >
                <X
                  onClick={() => {
                    setEditResumeId('');
                    setTitle('');
                  }}
                  className="cursor-pointer absolute text-gray-400 size-6 right-2 top-3"
                />
                <p className="text-black text-xl font-bold">Edit Resume Title</p>

                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className=" text-black required mt-3 w-full py-2 px-2 border border-gray-300 rounded placeholder:text-gray-400"
                  placeholder="Edit Resume title"
                  type="text"
                />

                <button
                  type="submit"
                  className="mt-1 w-full h-11 rounded bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-all duration-300 cursor-pointer"
                >
                  <p>Update</p>
                </button>
              </motion.form>
            </div>
          )}

          {/* ---------- Create Resume Modal ---------- */}
          {showCreateResume && (
            <div
              onClick={() => setShowCreateResume(false)}
              className="backdrop-blur fixed inset-0 bg-gray-900/70 flex items-center justify-center"
            >
              <motion.form
                onClick={(e) => e.stopPropagation()}
                onSubmit={createResume}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-[24rem] bg-white rounded h-[12.8rem] flex flex-col gap-3 items-start justify-start relative py-5 px-5"
              >
                <X
                  onClick={() => {
                    setShowCreateResume(false);
                    setTitle('');
                  }}
                  className="cursor-pointer absolute text-gray-400 size-6 right-2 top-3"
                />
                <p className="text-black text-xl font-bold">Create Resume</p>

                <input
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-black required mt-3 w-full py-2 px-2 border border-gray-300 rounded placeholder:text-gray-400"
                  placeholder="Enter Resume title"
                  type="text"
                />

                <button
                  type="submit"
                  className="active:scale-96 mt-1 w-full h-11 rounded bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-all duration-300 cursor-pointer"
                >
                  <p>Create Resume</p>
                </button>
              </motion.form>
            </div>
          )}

          {/* ---------- Upload Resume Modal ---------- */}
          {showUploadResume && (
            <div
              onClick={() => setShowUploadResume(false)}
              className="backdrop-blur fixed inset-0 bg-gray-900/70 flex items-center justify-center"
            >
              <motion.form
                onClick={(e) => e.stopPropagation()}
                onSubmit={uploadResume}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-[24rem] bg-white rounded h-auto min-h-[12.8rem] flex flex-col gap-3 items-start justify-start relative py-5 px-5"
              >
                <X
                  onClick={() => {
                    setShowUploadResume(false);
                    setTitle('');
                  }}
                  className="cursor-pointer absolute text-gray-400 size-6 right-2 top-3"
                />
                <p className="text-black text-xl font-bold">Upload Resume</p>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-3 w-full py-2 px-2 border border-gray-300 rounded placeholder:text-gray-400 required"
                  value={title}
                  placeholder="Enter Resume title"
                  type="text"
                />
                <div className="w-full">
                  <label
                    htmlFor="resume-input"
                    className="w-full block text-sm text-slate-700"
                  >
                    Select resume file
                    <div
                      className="w-full flex flex-col items-center justify-center gap-2 border
                      group text-slate-400 border-slate-400 rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colours"
                    >
                      {resume ? (
                        <p className="text-green-700">{resume.name}</p>
                      ) : (
                        <>
                          <UploadCloudIcon className="size-14 stroke-1" />
                          <p>Upload Resume</p>
                          <input
                            type="file"
                            id="resume-input"
                            accept=".pdf"
                            hidden
                            onChange={(e) => setResume(e.target.files[0])}
                          ></input>
                        </>
                      )}
                    </div>
                  </label>
                </div>
                <button
                  type="submit"
                  className="active:scale-96 mt-1 w-full h-11 rounded bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-all duration-300 cursor-pointer"
                >
                  <p>Upload Resume</p>
                </button>
              </motion.form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
