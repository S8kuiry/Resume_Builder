

import express from 'express'
import { uploadResume } from '../controller/aiController.js'
import { protect } from '../middleware/authMiddleware.js'
const aiRouter = express.Router()
aiRouter.post('/upload-resume',protect,uploadResume)
export default aiRouter