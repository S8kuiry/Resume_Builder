import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './configs/db.js';
import userRouter from './routes/UserRouter.js';
import resumeRouter from './routes/ResumeRouter.js';
import aiRouter from './routes/aiRoutes.js';

// ✅ Load environment variables first
dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Hello Resume Builder');
});

app.use('/api/users', userRouter);
app.use('/api/resumes',resumeRouter)
app.use('/api/ai',aiRouter)

// ✅ Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running successfully on port ${PORT}`);
});
