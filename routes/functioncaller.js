const express=require('express');
const router =express.Router();
const Fcontroller=require('../controllers/functioncaller');

router.post('/f',Fcontroller.callFunction);

module.exports= router;

return router ;