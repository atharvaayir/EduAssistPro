const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');

const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    console.log(req.headers);
    let authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(' ')[1];
        //console.log(token);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            //console.log(decoded);
            if(err){ 
                res.status(401);
                throw new Error("User is not authorised");
            }
            console.log(decoded);
            req.user=decoded.user;
            next();

        });
        if(!token){
            res.status(401);
            throw new Error("User is not authorised");
        }
    }
    else{
        res.status(401);
        throw new Error("User is not authorised")
    }
})

module.exports=validateToken;