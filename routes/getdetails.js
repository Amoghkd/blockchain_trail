const express=require('express');
const router =express.Router();
const Gcontroller=require('../controllers/getdetails');

router.get('/getD',Gcontroller.getTransactionHistory);

module.exports=router ;

return router ;