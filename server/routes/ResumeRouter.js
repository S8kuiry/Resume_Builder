
import express from 'express'
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from '../controller/ResumeController.js'
import { protect } from '../middleware/authMiddleware.js'
import { upload } from '../configs/multer.js'

const resumeRouter = express.Router()

resumeRouter.post('/create',protect,createResume)
resumeRouter.delete('/delete/:resumeId',protect,deleteResume)
resumeRouter.get('/get/:resumeId',protect,getResumeById)
resumeRouter.get('/public/:resumeId',getPublicResumeById)
resumeRouter.put('/update',upload.single('image'),protect,updateResume)
export default resumeRouter