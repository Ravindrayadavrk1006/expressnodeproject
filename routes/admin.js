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
router.get('/',(req,res)=>{
    res.render('pages/admin')
  })
module.exports=router;