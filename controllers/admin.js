// const bodyParser=require('body-parser');
const Patient=require('../models/newPatient')
const bookAppointment=require('../models/appointment')
const {validationResult}=require('express-validator');
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
            // res.render('\admin',{msg:"patient added succesfully SUCCESSFULLY!"})
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
            res.redirect('/admin')
        })
        .catch(err=>{
            if (err) throw Error;
            console.log(err);
        })
    
    // res.redirect('/admin',{msg:"appointment booked SUCCESSFULLY!"})
})
exports.allPatients=(req,res)=>{
    Patient.find({},(err,result)=>{
        if(err) throw new Error 
        else
        console.log(result)
        res.render('pages/adminPages/allPatients',{patients:result})
    })
}
exports.getdeletePatient=(req,res)=>{
    res.render('pages/adminPages/deletePatient');
}
exports.deletePatient=(req,res)=>{
    var firstName=req.body.firstName;
    var secondName=req.body.secondName; 
    Patient.deleteOne({firstName:firstName,secondName:secondName},(err,result)=>{
        if(err) throw new Error 
        else
        {
            console.log("patient deleted")
            res.redirect('/admin')
        }
    })
    
}

exports.updatePatientInfo=(req,res)=>{
    var firstName=req.body.firstName;
    var secondName=req.body.secondName;
    Patient.findOne({firstName:firstName,secondName:secondName},(err,result)=>{
        console.log(result);
        var oldTreatmentType=result.treatmentType;
        var oldTreatmentInfo=result.treatmentInfo;
        var newTreatmentType=req.body.treatmentType;
        var newTreatmentInfo=req.body.treatmentInfo;
        var treatmentType=newTreatmentType;
        var treatmentInfo=oldTreatmentInfo+ " " + newTreatmentInfo
        Patient.updateOne({firstName:firstName,secondName:secondName},{$set:{treatmentInfo:treatmentInfo,treatmentType:treatmentType}},{upsert:true});
    }) 
    res.redirect('/admin');
}
exports.allAppointments=(req,res)=>{
    bookAppointment.find({},(err,result)=>{
        res.render('pages/adminPages/allAppointments',{appointments:result})
    })
}
exports.getcancelAppointment=(req,res)=>{
    res.render('pages/adminPages/cancelAppointment')
}
exports.cancelAppointment=(req,res)=>{
    var firstName=req.body.firstName;
    var secondName=req.body.secondName;
    bookAppointment.deleteMany({firstName:firstName,secondName:secondName},(err,result)=>{
            if(err) throw new Error(err);
            console.log(result);
            res.redirect('/admin')
    })
    
}
exports.getupdateAppointment=(req,res)=>{
    res.render('pages/adminPages/updateAppointment')
}
exports.updateAppointment=(req,res)=>{
    var firstName=req.body.firstName;
    var secondName=req.body.secondName;
    var dateTime=req.body.dateTime;
    bookAppointment.updateOne({firstName:firstName,secondName:secondName},{$set:{dateTime:dateTime}},(err,result)=>{
        if (err) throw new Error("cannot update the appointment")
        console.log("appointment updated with result=>",result);
    });  
    res.redirect('/admin');
}
exports.findPatient=(req,res)=>{
    var firstName=req.body.firstName;
    var secondName=req.body.secondName;
     Patient.findOne({firstName:firstName,secondName:secondName},(err,result)=>{
         console.log(result);
         res.render(`pages/adminPages/showPatient`,{patient:result});
     })
}
exports.getfindPatient=(req,res)=>{
    res.render('pages/adminPages/findPatient')
}
exports.getupdatePatientInfo=(req,res)=>{
    res.render('pages/adminPages/updatePatientInfo');
}