const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const askForAppointmentSchema=new Schema({
    firstName:
    {
        type:String,
        default:''
    },
    secondName:
    {
        type:String,
        default:''
    },
    email:
    {
        type:String,
        required:true,
    },
    mobileNo:
    {
        type:String,
    },
    date:
    {
        type:String,
        required:true,
    },
    time:
    {
        type:String,
        required:true,
    },
    treatmentneeded:
    {
        type:String,
        default:''
    },
    treatmentDesc:
    {
        type:String,
        default:''
    },
    timeStamp:
    {
        type:String,
        default:new Date().toLocaleTimeString(),
    }
})

module.exports=mongoose.model('askForAppointment',askForAppointmentSchema);