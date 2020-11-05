// const bodyParser=require('body-parser');
const Patient=require('../models/newPatient')
const bookAppointment=require('../models/appointment')
const {validationResult}=require('express-validator')
exports.addPatients=(req,res)=>{
       let tempObj={
           firstName:req.body.firstName,
           secondName:req.body.secondName,
           mobileNo:req.body.mobileNo,
           DOB:req.body.Dob,
           email:req.body.email,
           treatmentType:req.body.treatmentType,
           treatmentInfo:req.body.treatmentInfo
       }
       console.log(tempObj);
       const aPatient=new Patient(tempObj)
       aPatient
        .save()
        .then(result=>{
            console.log("data saved to the db");
            res.redirect('/admin')
        })
}
exports.bookAppointment=((req,res)=>{
    let tempObj=
    {
        firstName:req.body.firstName,
        secondName:req.body.secondName,
        dateTime:req.body.dateTime,
        email:req.body.email,
        mobileNo:req.body.mobileNo,
    }
    console.log(tempObj);
    let newAppointment=new bookAppointment(tempObj)
    newAppointment
        .save()
        .then(result=>{
            console.log("appointment booked");
        })
        .catch(err=>{
            if (err) throw Error;
            console.log(err);
        })
    
    res.redirect('/admin',{msg:"appointment booked SUCCESSFULLY!"})
})
exports.allPatients=(req,res)=>{
    Patient.find({},(err,result)=>{
        if(err) throw new Error 
        else
        console.log(result)
        res.render('pages/adminPages/allPatients',{patients:result})
    })
}