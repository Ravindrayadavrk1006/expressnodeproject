const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var bookAppointment=new Schema({
    firstName:
    {
        type:String,
        required:true,
    },
    secondName:
    {
        type:String,

    },
    dateTime:
    {
        type:String,
        required:true
    },
    email:
    {

        type:String,
        required:true
    },
    mobileNo:
    {
        type:String,
    },
    timeStamp:
    {
        type:String,
        default:new Date()
    }

})
module.exports=mongoose.model('bookAppointment',bookAppointment);