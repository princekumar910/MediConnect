import mongoose from "mongoose";

const connectDB = async ( ) => {
    console.log("connecting to database...")
     try {
        await mongoose.connect(`${process.env.MONGODB_URI}/mediconnect`)

        console.log("connected to database")
     } catch (error) {

        console.log("Error while connecting to the database")
        
     }
}

export default connectDB