const mongoose=require('mongoose');
const Schema=mongoose.Schema
var passportLocalMongoose=require('passport-local-mongoose');
var UserSchema=new Schema({
    firstName:
    {
        type:String,
        required:true
    },
    secondName:
    {
        type:String,
        required:true
    },
    username:
    {
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    admin:
    {
        type:Boolean,
        default:false
    }  

})
// User.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',UserSchema);