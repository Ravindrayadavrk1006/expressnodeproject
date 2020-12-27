const express=require('express');
const router=express.Router();
const controllers=require('../controllers/admin');
const {ensureAuthenticated,adminAuth}=require('../config/auth');
const multer=require('multer');
var storage=multer.diskStorage({
  destination:function(req,file,cb)
  {
      cb(null,'./public/uploads/');
  },
  filename:function(req,file,cb)
  {
      var firstName=req.body.firstName;
      var secondName=req.body.secondName;
      cb(null,firstName+secondName+'_'+file.originalname);
  }
})
var newsStorage=multer.diskStorage({
  destination:function(req,file,cb)
  {
    cb(null,'./public/newsImages/mainImages/')
  },
  filename:function(req,file,cb)
  {
    var title=req.body.title;
    // var subHeading=req.body.subHeading;
    cb(null,subHeading+Date.now()+'_'+file.originalname);
  }
})
var newsStorage1=multer.diskStorage({
  destination:function(rq,file,cb)
  {
    cb(null,'./public/newsImages/mainImages/')
  },
  filename: function(req,file,cb)
  {
    var title=req.body.title;
    cb(null,title+Date.now()+'_'+file.originalname);
  }
})
var newsUpload=multer({storage:newsStorage}).array('img',20);
var newsArticleImages=multer({storage:newsStorage1}).array('articleImages',20);
var upload=multer({storage:storage}).array('images',100);
// var upload=multer({dest:'./public/uploads/'})
router.get('/bookAppointment',[ensureAuthenticated,adminAuth],(req,res)=>{
    res.render('pages/adminPages/bookAppointment')
  })
router.get('/newPatient',[ensureAuthenticated,adminAuth],(req,res)=>{
    res.render('pages/adminPages/newPatient')
  })
router.post('/bookAppointment',[ensureAuthenticated,adminAuth],controllers.bookAppointment)
router.post('/newPatient',[ensureAuthenticated,adminAuth,upload],controllers.addPatients)
router.get('/allPatients',[ensureAuthenticated,adminAuth],controllers.allPatients)
router.get('/deletePatient',[ensureAuthenticated,adminAuth],controllers.getdeletePatient);
router.post('/deletePatient',[ensureAuthenticated,adminAuth],controllers.deletePatient);
router.get('/updatePatient',[ensureAuthenticated,adminAuth],controllers.getupdatePatient);
router.post('/updatePatient',[ensureAuthenticated,adminAuth],controllers.updatePatient);
// router.get('/updatePatientInfo',controllers.getupdatePatientInfo);
router.post('/updatePatientInfo',[ensureAuthenticated,adminAuth],controllers.updatePatientInfo);
router.get('/findPatient',[ensureAuthenticated,adminAuth],controllers.getfindPatient);
router.post('/findPatient',[ensureAuthenticated,adminAuth],controllers.findPatient);
router.get('/allAppointments',[ensureAuthenticated,adminAuth],controllers.allAppointments);
router.get('/cancelAppointment',[ensureAuthenticated,adminAuth],controllers.getcancelAppointment);
router.post('/cancelAppointment',[ensureAuthenticated,adminAuth],controllers.cancelAppointment);
router.get('/updateAppointment',[ensureAuthenticated,adminAuth],controllers.getupdateAppointment);
router.post('/updateAppointment',[ensureAuthenticated,adminAuth],controllers.updateAppointment);
router.get('/',[ensureAuthenticated,adminAuth],(req,res)=>{
    res.render('pages/admin',{msg:''})
  })
router.get('/allAskedForAppointment',[ensureAuthenticated,adminAuth],controllers.getallAskedForAppointment);  
router.get('/newsArticle',controllers.getnewsArticle);
router.post('/newsArticle',[ensureAuthenticated,adminAuth],controllers.postnewsArticle)
module.exports=router;