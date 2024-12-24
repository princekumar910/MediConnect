import jwt from 'jsonwebtoken'

// user authentication 

const authDoctor = async(req ,res , next)=>{
  try {
    
    const {dtoken} = req.headers
    if(!dtoken){
        return res.json({success : false , message : "not authorize login again"})
    }

    const token_decode =  await jwt.verify(dtoken ,process.env.JWT_SECRET )
    
    req.body.docId = token_decode.id 

    next();


  } catch (error) {
    // console.log(error) ;
         res.json({success : false , messsge : error.message})
    }
  }


  export default authDoctor
