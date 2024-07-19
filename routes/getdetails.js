const express=require('express');
const router =express.Router();
const Gcontroller=require('../controllers/getdetails');
const FetchController=require('../controllers/fetch_all');
const FetchbyfieldController=require('../controllers/getdetailsbyid');

router.get('/funcparams',Gcontroller.getTransactionHistory);

router.get('/fetchall',FetchController.fetchContractList);

router.post('/getbyid',FetchbyfieldController.getbyid) ;  // crashing while using :getbyid (variable routing ) why ?


module.exports=router ;

return router ;