
// create resume 

import imagekit from "../configs/imagekit.js"
import Resume from "../models/ResumeModel.js"
import fs from 'fs'
//POST:/api/reusmes/create
export const createResume = async (req, res) => {
    try {

        const userId = req.userId
        const { title } = req.body

        //create new resume 
        const newResume = await Resume.create({ userId, title })

        //return success mesage
        return res.status(200).json({ message: "Resume Created Successfully", resume: newResume })


    } catch (error) {
        return res.json({ success: false, message: error.message })

    }


}

// delete resume 
//DELETE:/api/reumes/delete
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId
        const { resumeId } = req.params;
        await Resume.findOneAndDelete({ userId, _id: resumeId })
        // return success messsage 
        return res.json({ message: "Resume Deleted Successfully", })

    } catch (error) {
        return res.json({ success: false, message: error.message })

    }

}

//get resume by id
// GET:/api/resumes/get

export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId

        const { resumeId } = req.params

        const resume = await Resume.findOne({ userId, _id: resumeId })

        if (!resume) {

            return res.json({ success: false, message: "Resume not found" })

        }


        // return successmessage
        return res.json({ success: true, message: "Resume Fetched Succesfully", resume })


    } catch (error) {
        return res.json({ success: false, message: error.message })


    }
}

// get resume by if public 
// GET:/api/resumes/public
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params
        const resume = await Resume.findOne({ public: true, _id: resumeId })

        if (!resume) {

            return res.json({ success: false, message: "Resume not found" })

        }
        // return success message
        return res.json({ success: true, message: "Resume Fetched Succesfully", resume })


    } catch (error) {
        return res.json({ success: false, message: error.message })


    }
}

// controller for updating resume
// PUT:/api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId

        const { resumeId, resumeData} = req.body
            const removeBackground = req.body.removeBackground === "true"; // ✅ ensure boolean

        const image = req.file

        let resumeDataCopy = JSON.parse(resumeData)

        if (image) {
            const imageBufferData = fs.createReadStream(image.path)
            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder:'user-resumes',
                transformation:{
                    pre:'w-300,h-300,fo-face,z-0.75'+(removeBackground?',e-bgremove':'')
                }
            });
            resumeDataCopy.personal_info.image = response.url

        }
        const resume = await Resume.findOneAndUpdate({ userId, _id: resumeId }, resumeDataCopy, { new: true })
        return res.json({ message: 'Saved Successfully', resume })

    } catch (error) {
        return res.json({ success: false, message: error.message })


    }
}