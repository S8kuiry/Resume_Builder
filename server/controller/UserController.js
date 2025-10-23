import User from "../models/User.js"
import bcrypt, { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from "../models/ResumeModel.js"


const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{expiresIn:'7d'})
    return token

}
// register user function----------------
export const registerUser = async (req, res) => {
    try {

        const {name, email, password} = req.body 
        // check if required fileds sre present 
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing Required fields.." })
        }
        // check if user already exists 
        const user = await User.findOne({ email })

        if (user) {
            return res.json({ success: false, message: "User Already Exists" })
        }
        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email,
            name,
            password: hashedPassword
        })
        // return success message
        const token = generateToken(newUser._id)
        newUser.password = undefined
        return res.json({ success:true, message: "User Created Successfully", user: newUser ,token})



    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// ------user login-----------
export const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        // check if user exists
        const user = await User.findOne({email})

        if(!user){
            return res.json({ success: false, message:"User dosen't exists " })

        }
        // check the password
        if(!user.comparePassword(password)){
                        return res.json({ success: false, message:"Invalid email or Password" })

        }
        // return success message
        const token = generateToken(user._id)
        user.password = undefined

                return res.json({ success:true, message: "Login Successfull", user ,token})


    } catch (error) {
                return res.json({ success: false, message: error.message })

        
    }
}

//-------------- find user by Id ---------------
export const getUserById = async(req,res)=>{
    try {
        const userId = req.userId
        
        // check if user exists
        const user  = await User.findById(userId)
        if(!user){
                    return res.json({ success:true, message:"User Not Found", user ,token})
        }
        // return user ----
        user.password = undefined;
        
        return res.json({user})

    } catch (error) {
        return res.json({message:error.message})
    }
}


// controller for getting resumes 
//:GET:/api/users/resumes

export const getUserResumes = async(req,res)=>{
    try {
        const userId = req.userId

        //return user names
        const resumes = await Resume.find({userId})
        return res.json({resumes})

        
        
    } catch (error) {
        console.log(error.message)
        
    }
}