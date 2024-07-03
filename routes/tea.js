const express=require('express'); 
const router=express.Router();
const teaController= require('../controllers/tea');

router.post('/tea',teaController.newTea);

//const wikiController = require('../controllers/wiki.js') ;
//router.get('/wiki ', wikiController.home);


module.exports= router ;

return router ;
