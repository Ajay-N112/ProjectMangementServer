const mongoose=require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("___mongoDB atlas connected___");
}).catch((err)=>{
    console.log("___mongoDB atlas connection error___");
})