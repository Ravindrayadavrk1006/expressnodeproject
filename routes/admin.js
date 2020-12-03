const express=require('express');
const router=express.Router();
const controllers=require('../controllers/admin');
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
var upload=multer({storage:storage}).array('images',100);
// var upload=multer({dest:'./public/uploads/'})
router.get('/bookAppointment',(req,res)=>{
    res.render('pages/adminPages/bookappointment')
  })
router.get('/newPatient',(req,res)=>{
    res.render('pages/adminPages/newPatient')
  })
router.post('/bookAppointment',controllers.bookAppointment)
router.post('/newPatient',upload,controllers.addPatients)
router.get('/allPatients',controllers.allPatients)
router.get('/deletePatient',controllers.getdeletePatient);
router.post('/deletePatient',controllers.deletePatient);
router.get('/updatePatient',controllers.getupdatePatient);
router.post('/updatePatient',controllers.updatePatient);
// router.get('/updatePatientInfo',controllers.getupdatePatientInfo);
router.post('/updatePatientInfo',controllers.updatePatientInfo);
router.get('/findPatient',controllers.getfindPatient);
router.post('/findPatient',controllers.findPatient);
router.get('/allAppointments',controllers.allAppointments);
router.get('/cancelAppointment',controllers.getcancelAppointment);
router.post('/cancelAppointment',controllers.cancelAppointment);
router.get('/updateAppointment',controllers.getupdateAppointment);
router.post('/updateAppointment',controllers.updateAppointment);
router.get('/',(req,res)=>{
    res.render('pages/admin',{msg:''})
  })
router.get('/newsArticle',controllers.getnewsArticle);
// router.post('/newsArticle',controllers.postnewsArticle)
module.exports=router;