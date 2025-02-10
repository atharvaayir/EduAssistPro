const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');
const bycrypt=require('bcrypt');
const dotenv=require('dotenv');
const jwt=require('jsonwebtoken');
const validateToken=require('../middlewares/validateToken');
//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser= asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if( !username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userMailAvailable=await User.findOne({email});
    if(userMailAvailable){
        res.status(400);
        throw new Error("The email already exists");
    }
    const userNameAvailable=await User.findOne({username});
    if(userNameAvailable){
        res.send(400);
        throw new Error("The username already exists");
    }
    const hashedPassword=await bycrypt.hash(password,10);
    console.log(hashedPassword); 
    

    const user =await User.insertOne({
        username,
        email,
        password:hashedPassword
    });
    if(user){
        res.json({msg:"User registered"});
    }
    else{
        res.status(400);
        throw new Error("User data not valid");
    }
});

//@desc Login as user
//@route POST /api/users/login
//@access public
//used to handle async errors, no need to write try catch in every async function
const loginUser=asyncHandler(async(req,res)=>{
        const {username,password}=req.body;
        if(!username || !password){
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const user= await User.findOne({username});

        if(user && (await bycrypt.compare(password,user.password))){
           const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.emailid,
                id:user.id
            }
        },process.env.ACCESS_TOKEN_KEY,
        {expiresIn:"10m"}
        );
        res.status(200).json({accessToken});
        }
        else{
            res.status(401);
            throw new Error("username or password is not valid");
        }
});
const currentUser = asyncHandler(async (req, res) => {
    console.log("heo");    
    res.json(req.user);
});




module.exports={loginUser,registerUser,currentUser};