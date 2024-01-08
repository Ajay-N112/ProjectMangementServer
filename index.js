// load. env file
require('dotenv').config()


// import express

const express=require('express')

const cors=require('cors')

const routes=require('./Routes/Routes')
require('./db/Connection')

// create server using express

const projectServer=express()

projectServer.use(cors())

// convert all incomming data to js data
projectServer.use(express.json())

projectServer.use(routes)

projectServer.use('/uploads',express.static('./uploads'))


const PORT=4000 || process.env.PORT

projectServer.listen(PORT,()=>{
    console.log(`___Project server is started  the at port ${PORT}__`);
})

// Resolve Api request
projectServer.get('/',(req,res)=>{
res.send(`<h1> projected started.....</h1>`)
})
