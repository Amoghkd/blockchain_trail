const express =require('express') ;
const creationroute = require ('./routes/eventcreater');
const functcaller= require('./routes/functioncaller');
const getdeets=require('./routes/getdetails');
require("dotenv").config();
const mysql=require('mysql2')
const cors = require('cors');



const app =express();
app.use(express.json());

app.use(cors());


app.use('/api',creationroute) ;
app.use('/api',functcaller) ;
app.use('/api',getdeets);



const listener=app.listen(process.env.PORT|| 3000  ,()=> {
    
    console.log('your app is listening on port ' + listener.address().port)

})  