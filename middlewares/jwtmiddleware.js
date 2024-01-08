const jwt=require('jsonwebtoken')

exports.jwtMiddleware=(req,res,next)=>{
    // Token access
const token=req.headers['access_token'].split(" ")[1]

    // verify
    // if we have so many error the server will be down that cause we use try and catch
    try{
const JWTresponse=jwt.verify(token,'superkey123')
console.log(JWTresponse);
req.payload=JWTresponse._id
next()
    }
    catch{
        res.status(401).json("Autherization faild ! plese login in")

    }

} 
