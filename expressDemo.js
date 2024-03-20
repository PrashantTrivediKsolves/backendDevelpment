const express = require('express')
const app = express()
const bodyParser = require('body-parser'); 
const db=require('./db');

const Person=require('./models/person');
const Menu=require('./models/menu');
// app.get('/', function (req, res) {
//   res.send('Hello World')
// });

// app.get('/chicken',(req,res)=>
// {
//     res.send("Sure::: sir I would love to serve chicken ?");
// });

// app.get('/idle',(req,res)=>
// {
//     var customized_idli={
//         name:"rava idli",
//         size:"1o cm diameter",
//         is_sambhar:true,
//         is_chutney:false
//     }
   
//     res.send(customized_idli);
// })
app.use(bodyParser.json());
// app.post('/person',async(req,res)=>
// {
//     try{
//         const data=req.body;
//         const newPerson=new Person(data);
//         const response=await newPerson.save();
//         console.log('data saved');
//         res.status(200).json(response);
//     }
//     catch(err)
//     {
//         console.log(err);
//         res.status(500).json({error:"Internal server error"});
//     }
// })

// get method to get the all person..

// app.get('/person',async(req,res)=>
// {
//     try{
//         const data=await Person.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     }
//     catch(err)
//     {
//         console.log(err);
//         res.status(500).json({error:"Internal server error"});
//     }
// })


// app.get('/person/:workType',async(req,res)=>
// {
//     try{
//         const workType=req.params.workType;
//         if(workType=='chef'||workType=='manager'||workType=='waiter'||workType=='SDE')
//         {
//             const response=await Person.find({work:workType});
//             console.log("response fetchd");
//             res.status(200).json(response);
//         }
//         else
//         {
//             res.status(404).json({error:"Invald work typee"});
//         }
//     }
//     catch(err)
//     {
//         console.log(err);
//         res.status(500).json({error:"Internal server error"});
//     }
    
// })
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;// user name and password strategy



// middle ware function.

const logRequest=(req,res,next)=>
{
    console.log(`[${new Date().toLocaleString()}] Request Made to :${req.originalUrl}`);

    next();
}
app.use(logRequest);

// Authentication

passport.use(new LocalStrategy(async (USERNAME,password,done)=>
{
    // authenticaton  logic here............
    
    try{
        console.log("Recieved credentials:",USERNAME,password);
        const user=await Person.findOne({username:USERNAME});
        if(!user)
        {
            return done(null,false,{message:"Incorrect username."});
        }
        const ispasswordMatch=user.password===password?true:false;
        if(ispasswordMatch)
        {
            return done(null,user);
        }
        else
        {
            return done(null,false,{message:"Incorrect username."});
        }
    }
    catch(err)
    {
        return done(err);
    }

}))

app.use(passport.initialize());
//passport.authenticate('local',{session:false});
app.get('/',passport.authenticate('local',{session:false}),function(req,res)
{
    res.send("welcome to our hotel");
})



const personRoutes=require('./routes/personRouter');

const menuItemRoutes=require('./routes/menuItemRoutes');

app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(3000,()=>
{
    console.log("Server is listening on the port 3000");
});