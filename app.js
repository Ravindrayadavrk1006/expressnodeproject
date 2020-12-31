const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const controllers=require('./controllers/admin')
const adminRoutes=require('./routes/admin')
const cont=require('./controllers/admin')
const userRoutes=require('./routes/users')
const flash=require('connect-flash');
const session=require('express-session')
const port=process.env.PORT||3001
const app=express();
const passport=require('passport');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
require('./config/passport')(passport)
//EXPRESS SESSION
app.use(session({
  secret:"secret",
  resave:true, 
  saveUninitialized:true,
  cookie:{secure:false}
}))
//passport middleware
app.use(passport.initialize());
app.use(passport.session()); 
//CONNECT FLASH
app.use(flash());

//global variables
app.use((req,res,next)=>{
  res.locals.success_msg=req.flash("success_msg");
  res.locals.error_msg=req.flash("error_msg");
  res.locals.error=req.flash("error");
  next();
}) 
const multer=require('multer');
databaseName='OmDentals'
const url=`mongodb://localhost:27017/${databaseName}`
const mongoUrl=process.env.MONGODB_URI || url

app.set('view engine','ejs');
// app.set('view',)
app.use(express.static(__dirname+'/public'))

//loading the admin routes over the /admin
app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.get('/aboutUs',(req,res)=>{
  res.render('pages/aboutus')
})
app.get('/news/newsArticle/:title',cont.particularArticle);
app.get('/news/:page',cont.getnewsArticle);
app.get('/services',(req,res)=>{
  res.render('pages/services')
})
app.get('/contactUs',(req,res)=>{
  res.render('pages/contactUs')
})


// allAppoitmentArray=[];
app.post('/formupload',cont.formUpload);
// app.use((req,res,next)=>{
//   res.render('pages/404',{title:'page not found'})
// })
app.get('/',(req,res,next)=>{
  res.render('pages/index')
})
// app.get('/dummyCheck',(req,res)=>{
//   res.render('parts/detailPage',{title:'student Detail'});
// })
//connecting to dbase and inside it connecting to the express server inside the mongoose promise
mongoose.connect(mongoUrl,{
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
