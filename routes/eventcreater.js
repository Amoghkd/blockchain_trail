const express=require('express');
const router =express.Router();
const Econtroller=require('../controllers/eventcreater');

router.post('/e',Econtroller.Ec);

module.exports= router;

return router ;