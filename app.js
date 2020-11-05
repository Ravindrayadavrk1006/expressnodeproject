const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const controllers=require('./controllers/admin')
const adminRoutes=require('./routes/admin')
const port=3001
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
databaseName='OmDentals'
const url=`mongodb://localhost:27017/${databaseName}`
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'))
//loading the admin routes over the /admin
app.use('/admin',adminRoutes);
app.get('/',(req,res,next)=>{
    res.render('pages/index')
})
app.get('/aboutUs',(req,res)=>{
  res.render('pages/aboutus')
})
app.get('/news',(req,res)=>{
  res.render('pages/news')
})
app.get('/services',(req,res)=>{
  res.render('pages/services')
})
app.get('/contactUs',(req,res)=>{
  res.render('pages/contactUs')
})



//connecting to dbase and inside it connecting to the express server inside the mongoose promise
mongoose.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
})
  .then((result)=>{
    console.log('connected to databse');
    app.listen(port,()=>{
        console.log(`application is running at localhost:${port}`)
      })
    })
    .catch(err=>{
      console.log(err)
    })
