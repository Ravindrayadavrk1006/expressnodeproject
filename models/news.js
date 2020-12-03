const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var news=new Schema({
    title:
    {
        type:String,
        required:true,
    },
    subHeading:
    {
        type:String,
        required:true,
    },
    article:
    {
        type:String,
        required:true
    },
    imglocation:
    {
        type:String,
    }
})
module.exports=mongoose.model('news',news);
