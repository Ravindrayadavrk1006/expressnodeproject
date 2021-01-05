require('dotenv').config('.env')
const accountSID =process.env.accountSID;
const authToken = process.env.authToken;
const client = require('twilio')(accountSID, authToken);
client.messages
  .create({
     body: 'more checks',
     from: process.env.mobileNo,
     to: '+917719591561'
   })
  .then(message => console.log(message))
  .catch(err=>{
   console.log("ERROR",err);
  })
