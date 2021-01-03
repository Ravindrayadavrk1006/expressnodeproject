module.exports={
    ensureAuthenticated:function(req,res,next)
    {
        if(req.isAuthenticated())
        {
            // console.log("the user is ",req.user);
            next();
        }
        else
        {
            req.flash('error_msg',"please login to view");
            res.redirect('/user/signIn');

        }
        
        
        
    },
    //checking if the author is the admin or not
    adminAuth:function(req,res,next)
    {
        // console.log(req.user);
        if(typeof req.user.admin != undefined && req.user.admin===true)
        {
            next()
        }
        else
        {
            res.redirect('/')
        }
    }
}
