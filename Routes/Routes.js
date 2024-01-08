// const express=require('express')

// // router object

// const router=new express.Router()

// const userControle=require('../Controllers/userControle')
// const upload = require('../middlewares/multerMiddleware')
// const { jwtMiddleware } = require('../middlewares/jwtmiddleware')

// // sign up
// router.post('/user/register',userControle.register)

// // login
// router.post('/user/login', userControle.login)
// module.exports=router

// // update profile
// router.put('/user/update-profile/:_id',jwtMiddleware,upload.single('profile'),userControle.editProfile)
// // router.put('/user/update-profile/:_id',  upload.single('profile'), userControle.editProfile);

// // get profile
// router.get('/user/getProfile/:_id',userControle.getProfile)

// module.exports=router 

const express = require('express');
const router = express.Router();
const userControle = require('../Controllers/userControle');
const upload = require('../middlewares/multerMiddleware');
const { jwtMiddleware } = require('../middlewares/jwtmiddleware');

// Sign up
router.post('/user/register', userControle.register);

// Login
router.post('/user/login', userControle.login);

// Update profile
router.put('/user/update-profile/:_id', jwtMiddleware, upload.single('profile'), userControle.editProfile);

// Get profile
router.get('/user/getProfile/:_id', userControle.getProfile);


// // add new projects
// router.post('/user/add-projects',upload.single('projectimage'),userControle.addProjects)
// module.exports = router;

// add new projects
router.post('/user/add-projects', jwtMiddleware, upload.single('projectmage'), userControle.addProjects);


// get user projects
router.get('/user/get-user-project/:id',jwtMiddleware,userControle.getUserProjects)
// get all projects
router.get('user/get-all-projects',userControle.getAllProjects)
// get 3 of all projets
router.get('user/get-home-projects',userControle.getHomeProjects)

module.exports = router;
