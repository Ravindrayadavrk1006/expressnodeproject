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
    if(file.fieldname=='titleImg')
    {
      cb(null,'./public/newsImages/mainImages/')
    }
    else{
       cb(null,'./public/newsImages/detailImages/')
    }
    
  },
  filename:function(req,file,cb)
  {
        var title=req.body['title'];
        cb(null,file.originalname);
    
      
  }
})

var newsUpload=multer({storage:newsStorage})

// var newsUpload2=multer({storage:newsStorage1}).array('articleImages',20);

//  FOR ADD PATIENT ROUTE
var upload=multer({storage:storage}).array('images',100);
router.post('/newsArticle',
  newsUpload.fields([{name:'titleImg',maxCount:1 },{name:'articleImages',maxCount:10}])
,controllers.postnewsArticle)
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
    res.render('pages/admin')
  })
router.get('/allAskedForAppointment',[ensureAuthenticated,adminAuth],controllers.getallAskedForAppointment);  
router.get('/newsArticle',[ensureAuthenticated,adminAuth],controllers.getwriteArticle);

router.post('/confirmThisAppointment',[ensureAuthenticated,adminAuth],controllers.confirmThisAppointment);
module.exports=router;