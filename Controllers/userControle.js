const { json } = require("express");
const users = require("../Models/Usermodel");
const jwt=require('jsonwebtoken');
const projects = require("../Models/projectModel");


exports.register=async(req,res)=>{
const {userName,email,password}=req.body
// console.log(userName);
// console.log(email);
// console.log(password);
//     res.status(200).json("register worked")
try{
const existingUser=await users.findOne({email})
if(existingUser){
    res.status(400).json("user already exist ! ! plese login.")

}
else{
    const newUser=new users({
        userName,email,password,gitHub:"",linkedIn:"",profile:""
    })
    // store the new object in db collection
    await newUser.save()
    res.status(200).json(newUser)
}
}
catch{
    res.status(401).json(`register api failed ${err}`)
}
}

exports.login=async(req,res)=>{
    const {email,password}=req.body
    try{
const existUser=await users.findOne({email,password})
if(existUser){

    // Login success - token Generation
 const token=jwt.sign({_id:existUser._id},"superkey123")

console.log(token);
    res.status(200).json({user:existUser,
    token
    })

}
else{
    res.status(400).json("login Failed")
}
    }

    catch(err){
        res.status(401).json(`Login api Failed${err}`)
    }
    
    
};

// exports.editProfile=async(req,res)=>{
//     const {userName,gitHub,linkedin}=req.body
//     const {_id}=req.params
//     const profile=req.file.filename
// try{
//     const selectedUser = await user.findOne({_id})
//     if (selectedUser){
//         selectedUser.userName = userName
//         selectedUser.gitHub = gitHub 
//         selectedUser.linkedin = linkedin
//         selectedUser.profile=profile
//         // save changes in mongo Db
//         await selectedUser.save()
//         res.status(200).json(`${userName} profile is updated`)

//     }
//     else{
//         res.status(404).json(`${userName}is not Present`)

//     }
// }
// catch (err){
//     res.status(401).json(`login api is failed ${err}`)
// }



//     // console.log(userName);
//     // console.log(_id);
//     // console.log(profile);
//     // res.send("edit profile request recieved")

// }

exports.editProfile = async (req, res) => {
    const { userName, gitHub, linkedIn } = req.body;
    const { _id } = req.params;
    const profile = req.file?.filename;

    try {
        // Fix: Change 'user' to 'users'
        const selectedUser = await users.findOne({ _id });

        if (selectedUser) {
            selectedUser.userName = userName;
            selectedUser.gitHub = gitHub;
            selectedUser.linkedIn = linkedIn;
            selectedUser.profile = profile;

            // save changes in mongo Db
            await selectedUser.save();
            res.status(200).json(`${userName}'s profile is updated`);
        } else {
            res.status(404).json(`${userName} is not Present`);
        }
    } catch (err) {
        res.status(401).json(`editProfile API failed ${err}`);
    }
};

// get Profile
exports.getProfile=async(req,res)=>{
    const {_id}=req.params
    try{
        const UserData=await users.findOne({_id})
        if (UserData) {
            res.status(200).json(UserData)

        }
        else{
            res.status(404).json( ' user Not Data Found')
        }
    }
    catch (err){
        res.status(401).json(`api field${err}`)
    }
}

exports.addProjects=async(req,res)=>{
    const{title,languages,overView,gitHub,website}=req.body


// images 
const projectImage=req.file?.filename

// use id
const userid=req.payload
try{
   const existingProjects=await projects.findOne({gitHub})
   if(existingProjects){
    res.status(400).json(`${existingProjects.title} is already exists`)
   }
   else{
    const newProject= new projects({
        title,
        languages,
        overView,
        gitHub,
        website,
        projectImage,
        userid
    })
    // save in mdb
    await newProject.save()
    res.status(200).json(newProject)
   }
}
catch(err){
res.status(401).json(`project server add Api feild ${err}`)
}
}

exports.getUserProjects=async(req,res)=>{
const {id}=req.params
try{
    const projectArray=await projects.find({userId:id})
    if(projectArray){
        res.status(200).json(projectArray)
    }
    else{
        res.status(400).json('no data')
    }
}
catch(err){
    res.ststus(401).json(`api faild ${err}`)
}
}

exports.getAllProjects=async(req,res)=>{
    const {id}=req.params
    try{
        const allProjectArray=await projects.find()
        if(allProjectArray){
            res.status(200).json(allprojectArray)
        }
        else{
            res.status(400).json('no projects uploaded')
        }
    }
    catch(err){
        res.ststus(401).json(` projects get api faild ${err}`)
    }
    }


    exports.getHomeProjects=async(req,res)=>{
        const {id}=req.params
        try{
            const homeProjectArray=await projects.find()
            if(homeProjectArray){
                res.status(200).json(homeprojectArray)
            }
            else{
                res.status(400).json('no projects uploaded')
            }
        }
        catch(err){
            res.ststus(401).json(` projects get api faild ${err}`)
        }
        }
    
    
    
