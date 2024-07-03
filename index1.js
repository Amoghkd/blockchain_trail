const express = require('express');
const routes =require ('./routes/tea');
// const process =require('./env');
//const routes =require ('./routes/catalog');
require("dotenv").config();
console.log(process.env.PORT);

const app=express();
app.use(express.json());
app.use(express.body-parser());

app.use('/',routes);
console.log('hi', process.env.KEY)
const listener=app.listen(process.env.PORT|| 3000  ,()=> {
    
    console.log('your app is listening on port ' + listener.address().port)

})