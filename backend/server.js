import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import { doctorList } from "./controllers/doctorController.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";


// app config

const app = express();
const port = process.env.PORT || 5000 ;
connectDB();
connectCloudinary();


// midleware

app.use(express.json())
app.use(cors());


//api endpoint 

app.use('/api/admin' , adminRouter)
app.use('/api/doctor' , doctorRouter)
app.use('/api/user' , userRouter)



app.get('/' , (req ,res)=>{
    res.send('API woking')
})

app.listen(port,()=>{
    console.log("server is running" , port)
});