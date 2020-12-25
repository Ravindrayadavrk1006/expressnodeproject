const express=require('express');
var passport=require('passport');
// var authenticate=require('../authenticate');
const User=require('../models/signup')
const bcrypt=require('bcryptjs')
const {ensureAuthenticated,adminAuth}=require('../config/auth');
const router=express.Router();

router.get('/signUp',(req,res)=>{
    res.render('pages/user')
})
router.get('/signIn',(req,res)=>{
    res.render('pages/signIn')
})
router.post('/signUp',(req,res)=>{
    var {firstName,secondName,username,password,confirmPassword}=req.body;
    let errors=[]
    if(!firstName||!firstName||!username||!password||!confirmPassword)
    {
        errors.push({msg:"please fill in all the fields"})
    }
    if(password!=confirmPassword)
    {
        errors.push({msg:"password didn't match"})
    }
    if(password.length<8)
    {
        errors.push({msg:"password should be atleast 8 characters"})
    }
    if(errors.length>0)
    {
        res.render('pages/user',
        {errors,firstName,secondName,username,password,confirmPassword}
        )
     }
     else
     {
         User.findOne({username:username})
         .then(user=>{
             if(user)
             {
                errors.push({msg:'email already in use'});
                res.render('pages/user',
                {errors,firstName,secondName,username,password,confirmPassword}
                )
             }
             else
             {
                var tempObj =
                {
                    firstName:firstName,
                    secondName:secondName,
                    username:username,
                    password:password
                }
                
                 var tempPass
                 bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(tempObj.password,salt,(err,hash)=>{
                        if(err)throw new Error(err);
                        tempObj.password=hash
                        var UserInstance=new User(tempObj);
                        UserInstance
                            .save()
                            .then(result=>{
                                console.log("user saved to the db");
                                req.flash('success_msg',"You are now registered and can log in")
                                res.redirect('/user/signIn')
                            
                            })
                            .catch(err=>{
                                if(err) throw new Error(err) 
                            })
                                })
                            })
                // console.log(tempPass);        
             }
         })
         .catch(err=>{
             if(err) throw new Error(err)
         })
        
     }
})
//login handle
router.post('/signIn',(req,res,next)=>{
    passport.authenticate('local',{
      successRedirect:'/user/dashboard',
      failureRedirect:'/user/signIn',
      failureFlash:true,   
    })
    // if(!req.user)
    // {
    //     console.log("user not found");
    // }
    // else
    // {
    //     res.redirect('/user/dashboard')
    // }
    (req,res,next);
})
router.get('/dashboard',[ensureAuthenticated],(req,res)=>{
    // console.log(req.user);
     res.render('pages/dashboard',{email:req.user.username})
})
//logout handle
router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success_msg',"you are logged out");
    res.redirect('/user/signIn')
}) 
module.exports=router
