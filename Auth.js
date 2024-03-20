const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/person');
passport.use(new LocalStrategy(async (USERNAME,password,done)=>
{
    // authenticaton  logic here............
    try{
        // console.log("Recieved credentials:",USERNAME,password);
        const user=await Person.findOne({username:USERNAME});
        if(!user)
        {
            return done(null,false,{message:"Incorrect username."});
        }
        const ispasswordMatch=user.comparePassword(passport);
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

}));
module.exports=passport;
