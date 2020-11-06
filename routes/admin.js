const express=require('express');
const router=express.Router();
const controllers=require('../controllers/admin')
router.get('/bookAppointment',(req,res)=>{
    res.render('pages/adminPages/bookappointment')
  })
router.get('/newPatient',(req,res)=>{
    res.render('pages/adminPages/newPatient')
  })
router.post('/bookAppointment',controllers.bookAppointment)
router.post('/newPatient',controllers.addPatients)
router.get('/allPatients',controllers.allPatients)
router.get('/deletePatient',controllers.getdeletePatient);
router.post('/deletePatient',controllers.deletePatient);
router.get('/updatePatientInfo',controllers.getupdatePatientInfo);
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
module.exports=router;