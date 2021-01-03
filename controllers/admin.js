// const bodyParser=require('body-parser');
const Patient=require('../models/newPatient')
const bookAppointment=require('../models/appointment')
const {validationResult}=require('express-validator');
const News=require('../models/news');
const multer=require('multer')
const path=require('path')
const fs=require('fs');
// const mailer=require('./mailer');
const askForAppointment=require('../models/askForAppointment');
const news = require('../models/news');
var gfirstName='';
var gsecondName='';
//mailer configuration
const nodemailer=require('nodemailer');
const options=require('../options');

let transport=nodemailer.createTransport({
 host:'smtp.gmail.com',
 port:587,
 auth:{
      user:options.mail.username,
      pass:options.mail.password
 } 
});

// var newsStorage=multer.diskStorage({
//     destination:function(req,file,cb)
//     {
//       cb(null,'./public/newsImages/mainImages/')
//     },
//     filename:function(req,file,cb)
//     {
//         console.log(file);
//         console.log(req);
//       var title=req.body.title;
//       var subHeading=req.body.subHeading;
//       cb(null,title+Date.now()+'_'+file.originalname);
//     }
//   })
//   var newsUpload=multer({storage:newsStorage}).array('img',20);
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
            req.flash('success_msg',"patient added to the db");
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
     var emailHtml=  `<div className="emailContainer">
    <div class="head">
        <h1 style="color:blue;" >Om Dentals !</h1>
    </div>
    <div class="detail">
        <strong>
                your appointment has been booked 
                Date:  ${tempObj.dateTime.substr(0,9)}
                Time:  ${tempObj.dateTime.substr(11,)}
        </strong>
        
    </div>
    <div class="footer">
        <h5>Thank you for contacting us</h5>
    </div>
</div>`
    const message={
    from:'Omdentalsphagwara@gmail.com',
    to:tempObj.email,
    subject:'Om dentals ! Appointment Booking Confirmation',
    html:emailHtml,
    }

    let newAppointment=new bookAppointment(tempObj)
    newAppointment
        .save()
        .then(result=>{
            console.log("appointment booked");
        transport.sendMail(message)
            .then(result=>{
                console.log(result)
            })
            req.flash('success_msg',"appointment booked");
            res.redirect('/admin')
        })
        .catch(err=>{
            if (err) 
            {
                
                console.log(err);
                throw Error;
            }
        })
        .catch(err=>{
            if(err)
            {
                console.log(err)
                throw Error(err);
            }
        })
    
    // res.redirect('/admin',{msg:"appointment booked SUCCESSFULLY!"})
})
exports.allPatients=(req,res)=>{
    Patient.find({},(err,result)=>{
        if(err) throw new Error(err) 
        else
        // console.log(result)
        var names=[]
        for(each of result)
        {
            names.push({
                firstName:each.firstName,
                secondName:each.secondName
            })
        }
        // res.render('pages/adminPages/allPatients',{patients:result})
        res.render('pages/adminPages/allPatientList',{patients:names})
        // console.log(names);

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
            req.flash('success_msg',"patient info deleted");
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
    bookAppointment.find().sort({dateTime:-1}).exec((err,result)=>{
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
     var emailHtml=  `<div className="emailContainer">
    <div class="head">
        <h1 style="color:blue;" >Om Dentals !</h1>
    </div>
    <div class="detail">
        <strong>
             Sorry ! to inform u that the previous appointment has been canceled due to some reason we are very sorry for this inconvenience

        </strong>
        <p>
                Contact Us at :<br>
                email : omdentalsphagwara@gmail.com <br>
                phone : 9464544442
        </p>
    </div>
    <div class="footer">
        <h5>Thank you for contacting us</h5>
    </div>
</div>`
    bookAppointment
        .find({firstName:firstName,secondName:secondName})
        .then(result=>{
            console.log(result);
            const message={
                from:'Omdentalsphagwara@gmail.com',
                to:result[0].email,
                subject:'Om dentals ! Appointment Booking Confirmation',
                html:emailHtml,
                }
                transport.sendMail(message)
                    .then(result=>{
                        console.log(result)
                    })
                    .catch(err=>{
                        console.log(err);
                        throw new Error(err);
                    })
        })
    bookAppointment.deleteMany({firstName:firstName,secondName:secondName})
            .then(result=>{
               

                req.flash('success_msg',"appointment canceled");
                 res.redirect('/admin')
            })
            .catch(err=>{
                console.log(err)
                throw new Error(err);
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
     var emailHtml=  `<div className="emailContainer">
    <div class="head">
        <h1 style="color:blue;" >Om Dentals !</h1>
    </div>
    <div class="detail">
        <strong>
                your appointment has been rescheduled 
                Date:  ${dateTime.substr(0,9)}
                Time:  ${dateTime.substr(11,)}
        </strong>
        
    </div>
    <div class="footer">
        <h5>Thank you for contacting us</h5>
    </div>
</div>`
    const message={
    from:'Omdentalsphagwara@gmail.com',
    to:tempObj.email,
    subject:'Om dentals ! Appointment Reschedulig Confirmation',
    html:emailHtml,
    }
    bookAppointment.updateOne({firstName:firstName,secondName:secondName},{$set:{dateTime:dateTime}},(err,result)=>{
        if (err) throw new Error("cannot update the appointment")
        
        else
        {
            console.log("appointment updated with result=>",result);
            transport.sendMail(message)
            .then(result=>{
                console.log(result)
            })
            .catch(err=>{
                console.log(err);
                throw new Error(err);
            })
        }
        
    });  
    req.flash('success_msg',"appointment updated");
    res.redirect('/admin');
}
exports.findPatient=(req,res)=>{
    var firstName=req.body.firstName;
    var secondName=req.body.secondName;
    console.log(firstName," ",secondName);
     Patient.findOne({firstName:firstName,secondName:secondName},(err,result)=>{
       if(err) throw new Error(err)
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
        mobileNo:req.body.mobileNo,
        treatmentneeded:req.body.treatmentneeded,
        treatmentDesc:req.body.notes
    }   
    var askForAppointmentObj=new askForAppointment(obj);
    askForAppointmentObj
        .save()
        .then(result=>{
            console.log("patient asked for appointment");
            req.flash('success_msg',"appointment notified to the doctor u will receive a confirmation email or text-msg");
            res.redirect('/')
        })
        .catch(err=>{
            if(err) throw new Error(err);
        })
    
}
exports.getallAskedForAppointment=(req,res)=>{
    askForAppointment.find().sort({date:-1,timeStamp:-1}).exec((err,result)=>{
        if(err) throw new Error(err)
        // console.log(result);
         res.render('pages/adminPages/allAskedAppointments',{appointments:result})
    })
    // askForAppointment.find({},(err,result)=>{
    //     if(err) throw new Error(err)
    //     console.log(result);
        
    // })
}
exports.getwriteArticle=(req,res)=>{
    res.render('pages/newsArticle')
}
exports.getnewsArticle=(req,res)=>{
     var perPage = 6
    var page = parseInt(req.params.page || 1)

    News
        .find({})
        .sort({date:-1,time:-1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, news) {
            News.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('pages/news', {
                    news: news,
                    currentPage: page,
                    pageCount: Math.ceil(count / perPage)
                })
            })
        })
}
exports.postnewsArticle=(req,res)=>{
    var mainImages=req['files']['titleImg'];
    var articleImages=req['files']['articleImages'];
    mainImagesArray=[];
    articleImagesArray=[];
    for(image of mainImages)
        {
            mainImagesArray.push({
                data:fs.readFileSync(path.join(image['path'])),
                contentType:'image/png'
            })
        }
    for(image of articleImages)
        {
            articleImagesArray.push({
                data:fs.readFileSync(path.join(image['path'])),
                contentType:'image/png'
            })
        }
    // console.log(mainImage);
    var tempObj={
        title:req.body.title,
        subHeading:req.body.subHeading,
        article:req.body.article,
        titleImages:mainImagesArray,
        articleImages:articleImagesArray
        
    }
    var newsObj=new News(tempObj)
    newsObj
        .save()
        .then(result=>{
            console.log(result)
        })
    // console.log(tempObj);
    req.flash('success_msg',"artilce has been posted");
    res.redirect('/admin')
}
exports.confirmThisAppointment=(req,res)=>{
    
   var StringObj=req.body.appointment;
   var jsonObj=JSON.parse(StringObj);
   var emailHtml=  `<div className="emailContainer">
    <div class="head">
        <h1 style="color:blue;" >Om Dentals !</h1>
    </div>
    <div class="detail">
        <strong>
                your appointment has been booked 
                Date:  ${jsonObj.date}
                Time:  ${jsonObj.time}
        </strong>
        
    </div>
    <div class="footer">
        <h5>Thank you for contacting us</h5>
    </div>
</div>`
    const message={
    from:'Omdentalsphagwara@gmail.com',
    to:jsonObj.email,
    subject:'Om dentals ! Appointment Booking Confirmation',
    html:emailHtml,
    }
   var dateTime=jsonObj.date+"T"+jsonObj.time;
//    console.log(dateTime);
   var tempObj={
       firstName:jsonObj.firstName,
       secondName:jsonObj.secondName,
       dateTime:dateTime,
       email:jsonObj.email,
       mobileNo:jsonObj.mobileNo,
   }
   var bookAppointmentObj=new bookAppointment(tempObj)
   bookAppointmentObj
        .save()
        .then(result=>{
            // console.log(result)
            transport.sendMail(message)
            .then(result=>{
                console.log(result)
            })
            askForAppointment.deleteOne({firstName:jsonObj.firstName,
            secondName:jsonObj.secondName})
            .then(result=>{
                console.log(result)
            })
            req.flash('success_msg',"appointment is booked");
            res.redirect('/admin')
        })
        .catch(err=>{
            if(err) throw new Error(err);
        })
        .catch(err=>{
            if(err)
            {
                console.log("error =>",err)
                throw new Error(err)
            }
        })
        .catch(err=>{
            if(err)
            {
                console.log('cannnot be deleted')
                throw new Error(err)
            }
        })
}
exports.particularArticle=(req,res)=>
{
  
    title=req.params.title
    News
        .findOne({title:title})
        .then(result=>{
            // console.log(result[0])
            res.render('pages/particularNews',{news:result})
        })
        .catch(err=>{
            console.log(err);
        })


}