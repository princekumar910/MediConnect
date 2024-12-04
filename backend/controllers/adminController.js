import {v2 as cloudinary} from "cloudinary"
import validator from 'validator'
import bcrypt, { genSalt } from 'bcrypt'
import doctorModel from "../models/doctorModel.js"
import jwt  from "jsonwebtoken"
 

// APi for adding doctor

const addDoctor = async (req,res) => {
       

    try {

        const {name , email , password , speciality , degree , experience  , fees , about , address} = req.body
        const imageFile = req.file
        // console.log({name , email , password , speciality , degree , experience  , fees , about , address})
        // checking for all data 

        if(!name  || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){

          return  res.json({success : false , message : "mising details"})
        }

        // validating email format

        if(!validator.isEmail(email)){
            return  res.json({success : false , message : "insert valid email"})
        }
        if(password.lenght < 8){
            return  res.json({success : false , message : "Plese enter strong password"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password , salt) ;

        // upload image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type : "image"})
        const imageUrl = imageUpload.secure_url

        // address : json.parse(address)
        const doctorData = {
            name , email , image : imageUrl , password : hashPassword , speciality , degree , experience , about , fees , address : JSON.parse(address) , date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData) ;
        await newDoctor.save() ;
        res.json({success : true , message : "Doctor Added Successfully"})
    } catch (error) {
        //  console.log(error) ;
         res.json({success : false , message : error.message})
    }
}


// Api for admin login

const loginAdmin = async (req ,res)=>{
    try {
        const {email , password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password , process.env.JWT_SECRET)
            res.json({success : true , token})

        }else{
            res.json({success : false , message : "invalid credential"})
        }


    } catch (error) {
        // console.log(error) ;
         res.json({success : false , message : error.message})
    }
}

// api to get all doctor list 


const allDoctors = async (req,res)=>{

    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true , doctors});
    } catch (error) {

        // console.log(error) ;
        res.json({success : false , message : error.message})
        
    }

}

export {addDoctor , loginAdmin , allDoctors}