const express =require('express') ;
const creationroute = require ('./routes/eventcreater');
require("dotenv").config();

const app =express();
app.use(express.json());
//app.use(express.body-parser());


app.post('/', (req,res,next) =>{
   res.send("im live");
});


app.use('/r',creationroute) ;



const listener=app.listen(process.env.PORT|| 3000  ,()=> {
    
    console.log('your app is listening on port ' + listener.address().port)

})  