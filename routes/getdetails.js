const express=require('express');
const router =express.Router();
const Gcontroller=require('../controllers/getdetails');
const FetchController=require('../controllers/fetch_all');

router.get('/getD',Gcontroller.getTransactionHistory);

router.get('/getall',FetchController.fetchContractList)

module.exports=router ;

return router ;