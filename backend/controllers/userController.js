import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointementModel.js'

// api to registration

const registerUser = async (req,res)=>{
     try {
        const { name , email , password} = req.body

        if((!name || !email || !password)){
            return res.json({success : false , message : "missing details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success : false , message : "Enter a valid email"})
        }
        if(password.length < 8){
            return res.json({success : false , message : "enter a strong password"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password , salt)

        const userData = {
            name , email ,password : hashPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save() ;

        // token generation 
        
      const  token = jwt.sign({id : user._id}, process.env.JWT_SECRET)

         res.json({success : true , token})

     } catch (error) {
    
        res.json({success : false , message : error.message})

     }
}


// api use log 

const loginUser = async(req ,res) => {
    const {email , password} = req.body
    const user = await  userModel.findOne({email})

    if(!user){
       return res.json({success : false , message : "user doesn't exist"})
    }

    const isMatch = await bcrypt.compare(password , user.password)
   
    if(isMatch){
        const token = jwt.sign({id:user._id} ,  process.env.JWT_SECRET)
        res.json({success : true , token})
    }
    else{
        res.json({success : false , message : "Invalid Credential"})
    }

}

// user profile data 

const getProfile = async (req,res)=>{
    try {

        const {userId} = req.body;

        const userData = await userModel.findById(userId).select('-password')
        res.json({success : true , userData})
        
    } catch (error) {
         
        res.json({success : false , message : error.message})

    }
}


// api to update 

const updateProfile = async(req,res)=>{
    try {
        
        const {userId , name ,phone , address , dob ,gender} = req.body 
        const imageFile = req.file 
         
        console.log(userId, name , phone , address , dob , gender)


        if(!name || !phone || !gender){
           return res.json({success : false , message : "Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId , {name , phone , address:JSON.parse(address) , dob , gender} )

        if(imageFile){
            // upload image to cloudnary

            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type : 'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId , {image : imageURL} )
        }

        res.json({success : true , message : "Updated Succesfully" })


    } catch (error) {
        res.json({success : false , message : error.message})
    }
}

// api to book appointement 

const bookAppointment = async (req , res)=>{

    try {

        const {userId, id : docId , slotDate , slotTime } = req.body 

        const docData = await doctorModel.findById(docId).select('-password')
        if(!docData.available){
            
            return res.json({success : false , message : "Doctor not available"})

        }
        let slots_booked = docData.slots_booked ; 

        //checkimg for slot availabilit

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success : false , message : "slot not available"})
            }
            else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete  docData.slots_booked 
        const appointementData = {
            userId  , docId , userData , docData , amount : docData.fees , slotTime , slotDate , date : Date.now()
        }

        const newAppointement = new appointmentModel(appointementData)
        await newAppointement.save();


        // save slot data 

        await doctorModel.findByIdAndUpdate(docId , {slots_booked})

        return res.json({success : true , message : "appointment book successfully"})
        
    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
    }
}


export {registerUser , loginUser ,getProfile , updateProfile , bookAppointment}