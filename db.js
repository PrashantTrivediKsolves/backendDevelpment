const mongoose=require('mongoose');

// define the mongodb connect url
const mongoURL='mongodb://127.0.0.1:27017/hotels';

// set up conenection
mongoose.connect(mongoURL);

const db=mongoose.connection;
db.on('connected',()=>
{
    console.log("Mongo db connected");
})
db.on('error',(err)=>
{
    console.log("error ",err);
})
db.on('disconnected',()=>
{
    console.log("Mongodb diconnected");
})

module.exports=db;
