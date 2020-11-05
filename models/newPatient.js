const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var Patient=new Schema({
    firstName:
    {
        type:String,
        required:true
    },
    secondName:
    {
        type:String
    },
    mobileNo:
    {
        type:String
    },
    DOB:
    {
        type:String,

    },
    email:
    {
        type:String

    },
    treatmentType:
    {
        type:String,
    },
    treatmentInfo:
    {
        type:String
    },
    timeStamp:
    {
        type:String,
        default:new Date()
    }

})
module.exports=mongoose.model('Patient',Patient);