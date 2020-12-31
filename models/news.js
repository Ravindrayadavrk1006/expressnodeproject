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
    titleImages:
    {    type:[{
            data:Buffer,
            contentType:String
        }],
         required:false
    },
    articleImages:
    {    type:[{
            data:Buffer,
            contentType:String
        }],
         required:false
    },
    date:
    {
        type:String,
        default:new Date().toISOString().slice(0, 10)

    }
})
module.exports=mongoose.model('News',news);
