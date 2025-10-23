"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { data, useNavigate, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  FileText,
  FolderIcon,
  GraduationCap,
  Grid,
  LayoutTemplate,
  Palette,
  Share,
  Share2,
  Sparkles,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundBoxesDemo } from "../components/GridBg";
import PersonalInfoForm from "../components/PersonalInfoForm";
import Preview from "./Preview";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ProfessionalExperience from "../components/ProfessionalExperience";
import PersonalEducation from "../components/PersonalEducation";
import PersonalProject from "../components/PersonalProject";
import PersonalSkills from "../components/PersonalSkills";
import { toast } from "react-toastify";
import axios from "axios";

const ResumeBuilder = () => {
  const { bgCol, backendUrl, token } = useContext(AppContext);
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });
  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const sections = [
    { id: "personal", name: "Personal info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];
  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  //--------------- set template section ----------------
  const [templateOpen, setTemplateOpen] = useState(false)

  const templateInfo = [
    { id: 'classic', name: 'Classic', info: 'A clean, traditional resume layout emphasizing readability and professionalism with structured sections.' },
    { id: 'modern', name: 'Modern', info: 'A stylish, contemporary design featuring bold headers, icons, and balanced use of color for a sleek, professional look.' },
    { id: 'minimal', name: 'Minimal', info: 'A clean, elegant layout with simple typography and ample white space for a crisp, distraction-free presentation.' },
    { id: 'minimal-image', name: 'Minimal Image', info: 'A sleek, modern layout emphasizing visuals, combining minimal text with prominent image sections for a polished look.' },

  ]

  // --------------- set color section ----------------------

  const [selectColor, setSelectColor] = useState(false)

  const colors = [
    { name: "Blue", color: "#3B82F6" },
    { name: "Indigo", color: "#6366F1" },
    { name: "Purple", color: "#8B5CF6" },
    { name: "Green", color: "#22C55E" },
    { name: "Red", color: "#EF4444" },
    { name: "Orange", color: "#F97316" },
    { name: "Teal", color: "#14B8A6" },
    { name: "Pink", color: "#EC4899" },
    { name: "Grey", color: "#6B7280" },
    { name: "Black", color: "#111827" }
  ];

  //---------------- handle share  and download resume -----------------------
  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: 'My Resume' })
    } else {
      alert('Share not supported on this browser.')
    }

  }

  // ---------------------- handle sav echanges ---------------------//
  const handleSaveChanges = async () => {
    try {
      // create a form data
      const formData = new FormData()
      formData.append('resumeId', resumeId)
      formData.append('removeBackground', removeBackground)
      formData.append('resumeData', JSON.stringify(resumeData))

      // now if user uploads image
      if (resumeData.personal_info?.image instanceof File) {
        formData.append('image', resumeData.personal_info.image)
      }

      const response = await axios.put(`${backendUrl}/api/resumes/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Changes Saved ")

      // ✅ Refetch immediately to confirm it’s saved
      getResumeById();

    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }
  // -----------------fetching the resume data ----------------
  const getResumeById = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/resumes/get/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // Backend likely sends: { success: true, resume: {...} }
      const resume = response.data.resume;

      setResumeData(prev => ({
        ...prev,
        ...resume, // ✅ Properly merge fetched data into state
      }));


    } catch (error) {
      toast.error(error.message);
      console.log(error.message);

    }
  }
  //---------------- handle private data--------------
  const handlePrivacy = async () => {
    try {
      const updatedPrivacy = { public: !resumeData.public }
      await axios.put(
        `${backendUrl}/api/resumes/update`,
        {
          resumeId: resumeId,
          resumeData: JSON.stringify(updatedPrivacy),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      
      );
       toast.success('Changes Saved')
       getResumeById()
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);


    }
  }
  useEffect(() => {
    getResumeById()
  }, [])

  const downloadResume = () => {
    window.print()
  }

  return (
    <div
      className={`pb-10  relative min-h-screen overflow-hidden ${bgCol
        ? "bg-gray-900 text-slate-300"
        : "bg-slate-100 text-black"
        }`}
    >
      {/* Background sits absolutely behind everything */}
      <div className="absolute inset-0 ">
        <BackgroundBoxesDemo />
      </div>

      {/* Header */}
      <div className="pt-10  z-10 w-full flex items-center justify-between pt-4 px-6 sm:px-24 relative z-10">

        {/* Left */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={() => navigate("/app")}
          className="cursor-pointer text-slate-500 flex items-center justify-center w-auto h-auto gap-2"
        >
          <ArrowLeftIcon className="size-5" />
          <p>Back to Dashboard</p>
        </motion.button>

        {/* Right */}
        <div className="flex items-center justify-center gap-3">
          {resumeData.public ? (
            <>
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer text-sm flex items-center justify-center gap-2 rounded-lg bg-blue-400/30 py-1.5 px-3"
              >
                <Share2 className="text-blue-500 size-4" />
                <p className="text-sm text-blue-500">Share</p>
              </motion.button>
              <motion.button
                onClick={() => {setResumeData(prev => ({
                  ...prev, public: false
                })),handlePrivacy()}}
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer text-sm flex items-center justify-center gap-2 rounded-lg bg-purple-400/30 py-1.5 px-3"
              >
                <Eye className="text-purple-600 size-4" />
                <p className="text-sm text-purple-600">Public</p>
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={() =>{ setResumeData(prev => ({
                ...prev, public: true
              })),handlePrivacy()}}
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer text-sm flex items-center justify-center gap-2 rounded-lg bg-purple-400/30 py-1.5 px-3"
            >
              <EyeOff className="text-purple-600 size-4" />
              <p className="text-sm text-purple-600">Private</p>
            </motion.button>
          )}


          <motion.button
            onClick={downloadResume}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer text-sm flex items-center justify-center gap-2 rounded-lg bg-green-400/30 py-1.5 px-3"
          >
            <Download className="text-green-600 size-4" />
            <p className="text-sm text-green-600">Download</p>
          </motion.button>
        </div>
      </div>



      {/* Resume Builder Section */}
      <div className="max-w-7xl mx-auto px-4 pb-8 mt-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* Progress Bar */}
              <hr className="absolute top-0 left-0 right-0 border border-gray-200 border-2" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-1000"
                style={{
                  width: `${(activeSectionIndex * 100) /
                    (sections.length - 1)}%`,
                }}
              />

              {/* --- section navigation --- */}
              <div className="w-full flex items-center justify-between py-3 border-b border-slate-400">
                {/*-------------------- template and setColor section  -------------------------- */}

                <div className="relative h-full w-auto flex items-center justify-center gap-3">


                  <button onClick={() => setTemplateOpen(!templateOpen)} className="border border-transparent rounded rounded-lg cursor-pointer py-2 px-3 bg-blue-300/30 flex items-center gap-2 justify-center 
                 text-sm text-blue-600  hover:border-blue-600 transition-colors duration-300">
                    <LayoutTemplate className="size-4 text-blue-600" />
                    <span className="hidden sm:inline">Template</span>
                  </button>

                  <button onClick={() => setSelectColor(!selectColor)} className=" border border-transparent rounded rounded-lg cursor-pointer py-2 px-3 bg-purple-300/30 flex items-center gap-2 justify-center 
                 text-sm text-purple-600  hover:border-purple-600 transition-colors duration-300">
                    <Palette className="size-4 text-purple-600" />
                    <span className="hidden sm:inline">Accent</span>
                  </button>



                  {/*-------------------------- template select section ---------- --------------*/}
                  {templateOpen && (
                    <div className=" absolute top-12 left-0 w-90 bg-white rounded-xl shadow-lg flex flex-col gap-4 p-4 z-50">
                      {templateInfo.map((itm) => {
                        const isActive = resumeData.template === itm.id;

                        return (
                          <div
                            key={itm.id}
                            onClick={() => {
                              setResumeData((prev) => ({ ...prev, template: itm.id }));
                              setTemplateOpen(false);
                            }}
                            className={`relative flex flex-col gap-2 p-4 border rounded-xl cursor-pointer transition-all duration-200
              ${isActive ? "border-blue-500 bg-blue-50 hover:bg-blue-100" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
                          >
                            {/* Selection Circle */}
                            {isActive && (
                              <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                            )}

                            {/* Template Name */}
                            <p className="font-semibold text-gray-800 text-lg">{itm.name}</p>

                            {/* Template Info */}
                            <div
                              className={`text-xs italic text-gray-500 p-2 rounded-md transition-colors duration-200
                ${isActive ? "bg-gray-100" : "bg-blue-100/60"}`}
                            >
                              {itm.info}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/*-------------- select color ---------------- */}
                  {selectColor && <div className="h-auto  absolute top-12 left-30 w-70 bg-white rounded-xl shadow-gray-500 shadow-lg flex flex-wrap gap-4 p-4 z-50">
                    {colors.map((itm) => (
                      <div className="flex flex-col items-center gap-2 ">
                        <div onClick={() => {
                          setResumeData(prev => ({
                            ...prev, accent_color: itm.color
                          }))
                        }} className={`relative hover:scale-110 cursor-pointer border 
                        border-transparent hover:border-[${itm.color}] transition-all duration-300 w-12 h-12 rounded-full
                        flex items-center justify-center `}
                          style={{
                            backgroundColor: itm.color,
                          }}>
                          <Check className={`size-5 text-white absolute ${resumeData.accent_color === itm.color ? "block" : "hidden"} `} />

                        </div>
                        <p className="text-xs text-gray-500">{itm.name}</p>
                      </div>
                    ))}

                  </div>
                  }

                </div>
                <div className="flex items-center justify-center gap-2">
                  {/* Previous Button */}
                  {activeSectionIndex !== 0 && <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))
                    }
                    disabled={activeSectionIndex === 0}
                    className={`cursor-pointer flex items-center justify-center py-2 px-3 rounded-lg 
        transition-all duration-300 font-medium
        ${activeSectionIndex === 0
                        ? "opacity-40 cursor-not-allowed text-gray-400"
                        : "hover:bg-gray-300/20 text-gray-500"}`}
                  >
                    <ChevronLeft className="size-4" />
                    <p className="text-sm">Previous</p>
                  </button>
                  }
                  {/* Next Button */}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1)
                      )
                    }
                    disabled={activeSectionIndex === sections.length - 1}
                    className={`cursor-pointer flex items-center justify-center py-2 px-3 rounded-lg 
        transition-all duration-300 font-medium
        ${activeSectionIndex === sections.length - 1
                        ? "opacity-40 cursor-not-allowed text-gray-400"
                        : "hover:bg-gray-300/20 text-gray-500"}`}
                  >
                    <p className="text-sm">Next</p>
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/*------------------------- form content ------------------------------ */}
              <div className="w-full flex flex-col items-start justify-start">
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm data={resumeData.personal_info}
                    onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                    removeBackground={removeBackground}setRemoveBackground={setRemoveBackground} />
                )}
                {activeSection.id === 'summary' && (
                  <ProfessionalSummary data={resumeData.professional_summary}
                    onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />
                )}
                {activeSection.id === 'experience' && (
                  <ProfessionalExperience data={resumeData.experience}
                    onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                )}
                {activeSection.id === 'education' && (
                  <PersonalEducation data={resumeData.education}
                    onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                )}
                {activeSection.id === 'projects' && (
                  <PersonalProject data={resumeData.project}
                    onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
                )}
                {activeSection.id === 'skills' && (
                  <PersonalSkills data={resumeData.skills}
                    onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                )}





              </div>
              {/*------------ save changes button ------------*/}
              <button
                onClick={handleSaveChanges}
                className="active:scale-96 shadow shadow-sm shadow-green-500 m border border-transparent rounded rounded-lg cursor-pointer py-2 px-4 bg-green-300/30 flex items-center gap-2 justify-center 
                 text-sm text-green-600  hover:border-green-600 transition-colors duration-300">Save Changes</button>


            </div>


          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-7 relative z-10 max-lg:mt-6">
            {/* Preview content will go here */}
            <div className="">
              {/*---- buttons ------- */}
            </div>
            {/*------- resume preview ----------- */}
            <Preview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} removeBackground={removeBackground}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
