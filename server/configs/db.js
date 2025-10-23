
import mongoose from 'mongoose'

export const connectDB = async()=>{
    try {
        let mongodbURI=process.env.MONGODB_URI
        mongoose.connection.on('connected',()=>{
            console.log("Database Connected Successfully")
        })
        if(mongodbURI.endsWith('/')){
            mongodbURI = mongodbURI.slice(0,-1)
        }
        await mongoose.connect(`${mongodbURI}/resume-builder`) 

        
    } catch (error) {
        console.log(error)
        
    }
}