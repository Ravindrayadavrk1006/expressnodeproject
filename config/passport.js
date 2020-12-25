const LocalStategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

//User model
const User=require('../models/signup');
module.exports=function(passport){
    passport.use(
        new LocalStategy({usernameField:'username'},(username,password,done)=>{
            //match user
            User.findOne({username:username})
            .then(user=>{
                if(!user)
                {
                    return done(null,false,{message:'email is not registered'});
                }
                //Match the password if the user exist by the username
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    // if(isMatch && user['admin']==true)
                    // {
                    //     return done(null,user,{message:"is admin",admin:true})
                    // }
                    if(isMatch)
                    {
                        console.log("from the passport file",user)
                        return done(null,user)
                    }
                    
                    else
                    {
                        return done(null,false,{message:'password incorrect'});
                    }
                })
            })
            .catch(err=>{
                console.log(err);
            })
        })
    )
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser((id,done)=> {
        User.findById(id,function(err,user){
            done(err,user)
        })
    })
}
