import jwt from 'jsonwebtoken'

// user authentication 

const authUser = async(req ,res , next)=>{
  try {
    
    const {token} = req.headers
    if(!token){
        return res.json({success : false , message : "not authorize login again"})
    }

    const token_decode =  await jwt.verify(token ,process.env.JWT_SECRET )
    
    req.body.userId = token_decode.id 

    next();


  } catch (error) {
    // console.log(error) ;
         res.json({success : false , messsge : error.message})
    }
  }


  export default authUser
