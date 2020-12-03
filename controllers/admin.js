// const bodyParser=require('body-parser');
const Patient=require('../models/newPatient')
const bookAppointment=require('../models/appointment')
const {validationResult}=require('express-validator');
const multer=require('multer')
const path=require('path')
const fs=require('fs');
const askForAppointment=require('../models/askForAppointment');
var gfirstName='';
var gsecondName='';
exports.addPatients=(req,res)=>{
        // var wait=async function()
        // {
        //     setInterval(()=>{},3000)
        //     await wait()
        //     clearInterval()
        // }

        var temp=req['files'];
        // console.log(temp);
        // console.log(temp)
        // console.log('req.body=>'+req.body);
        // console.log('req.files=>',+req.file)
        var images=[]
        var length=temp.length;
        for(image of temp)
        {
            images.push({
                data:fs.readFileSync(path.join(image['path'])),
                contentType:'image/png'
            })
        }
        // console.log(images);
       let tempObj={
           firstName:req.body.firstName,
           secondName:req.body.secondName,
           mobileNo:req.body.mobileNo,
           DOB:req.body.Dob,
           email:req.body.email,
           treatmentType:req.body.treatmentType,
           treatmentInfo:req.body.treatmentInfo,
           images:images
       }

       
    //    console.log("the data before stroring to the db",tempObj)
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
    Patient.find({},(err,result)=>{
        if(err) throw new Error(err)
        firstNameArray=[];
        secondNameArray=[]
        for(appointment of result)
        {
            firstNameArray.push(appointment.firstName);
            secondNameArray.push(appointment.secondName);
        }
        // console.log(firstNameArray);
        // console.log(secondNameArray);
        res.render('pages/adminPages/deletePatient',{firstNameArray:firstNameArray,secondNameArray:secondNameArray})

    })
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
    var mobileNo=req.body.mobileNo;
    var email=req.body.email;
    var treatmentType=req.body.treatmentType;
    var treatmentInfo=req.body.treatmentInfo;
        Patient.updateOne({firstName:gfirstName,secondName:gsecondName},{$set:
            {
                firstName:firstName,
                secondName:secondName,
                treatmentInfo:treatmentInfo,
                treatmentType:treatmentType,
                mobileNo:mobileNo,
                email:email,
            }},{upsert:true},(err,result)=>{
                if(err) throw new Error(err)
                console.log('date edited succesfully !!!')
            });
        
    res.redirect('/admin');
}
exports.allAppointments=(req,res)=>{
    bookAppointment.find({},(err,result)=>{
        res.render('pages/adminPages/allAppointments',{appointments:result})
    })
}
exports.getcancelAppointment=(req,res)=>{
    bookAppointment.find({},(err,result)=>{
        if(err) throw new Error(err)
        firstNameArray=[];
        secondNameArray=[]
        for(appointment of result)
        {
            firstNameArray.push(appointment.firstName);
            secondNameArray.push(appointment.secondName);
        }
        res.render('pages/adminPages/cancelAppointment',{firstNameArray:firstNameArray,secondNameArray:secondNameArray})

    })
    
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
    bookAppointment.find({},(err,result)=>{
        if(err) throw new Error(err)
        firstNameArray=[];
        secondNameArray=[]
        for(appointment of result)
        {
            firstNameArray.push(appointment.firstName);
            secondNameArray.push(appointment.secondName);
        }
        res.render('pages/adminPages/updateAppointment',{firstNameArray:firstNameArray,secondNameArray:secondNameArray,})

    })
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
       if(err) throw new Error(err)

        console.log(result);
        res.render(`parts/detailPage`,{title:'patient detail',patient:result});
         
     })
}
exports.getfindPatient=(req,res)=>{
    Patient.find({},(err,result)=>{
        if(err) throw new Error(err)
        firstNameArray=[];
        secondNameArray=[]
        for(appointment of result)
        {
            firstNameArray.push(appointment.firstName);
            secondNameArray.push(appointment.secondName);
        }
        // console.log(firstNameArray);
        // console.log(secondNameArray);
        res.render('pages/adminPages/findPatient',{firstNameArray:firstNameArray,secondNameArray:secondNameArray})

    })
}
exports.getupdatePatient=(req,res)=>{
    Patient.find({},(err,result)=>{
        if(err) throw new Error(err)
        firstNameArray=[];
        secondNameArray=[]
        for(appointment of result)
        {
            firstNameArray.push(appointment.firstName);
            secondNameArray.push(appointment.secondName);
        }
        // console.log(firstNameArray);
        // console.log(secondNameArray);
        res.render('pages/adminPages/updatePatient',{firstNameArray:firstNameArray,secondNameArray:secondNameArray})

    })
}
exports.updatePatient=(req,res)=>{
    var firstName=req.body.firstName;
    var secondName=req.body.secondName;
    gfirstName=firstName;
    gsecondName=secondName

    Patient.find({firstName:firstName,secondName:secondName},(err,result)=>{
        if(err) throw new Error(err);
        // console.log('data from the updatePatient controllers',result);
        res.render('pages/adminPages/updatePatientInfo',{patient:result});
    })
}
// exports.getupdatePatientInfo=(req,res)=>{
//     Patient.find({},(err,result)=>{
//         if(err) throw new Error(err)
//         firstNameArray=[];
//         secondNameArray=[]
//         for(appointment of result)
//         {
//             firstNameArray.push(appointment.firstName);
//             secondNameArray.push(appointment.secondName);
//         }
//         resultArray=[]
//         for(pat of result)
//         {
//             resultArray.push(pat)
//         }
//         res.render('pages/adminPages/updatePatientInfo',{patients:resultArray,firstNameArray:firstNameArray,secondNameArray:secondNameArray})
//     })


// }
var allAppoitmentArray=[]
exports.formUpload=(req,res)=>{
    var date=req.body.date;
    var dateArray=date.split('T');
    var obj={
        firstName:req.body.firstName,
        secondName:req.body.secondName,
        date:dateArray[0],
        time:dateArray[1],
        email:req.body.email,
        treatmentneeded:req.body.treatmentneeded,
        treatmentDesc:req.body.notes
    }    
    var askForAppointmentObj=new askForAppointment(obj);
    askForAppointmentObj
        .save()
        .then(result=>{
            console.log("patient asked for appointment");
            res.redirect('/')
        })
        .catch(err=>{
            if(err) throw new Error(err);
        })
    
}
exports.getnewsArticle=(req,res)=>{
    res.render('pages/newsArticle');
}