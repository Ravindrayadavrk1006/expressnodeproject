const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var ImageSchema=new Schema({
    img:Buffer,
    contentType:String
})
var image=mongoose.model('image',ImageSchema);
var Patient=new Schema({
    firstName:
    {
        type:String,
        required:false
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
    },
    images:
    {    type:[{
            data:Buffer,
            contentType:String
        }],
         required:false
    }

})
module.exports=mongoose.model('Patient',Patient);