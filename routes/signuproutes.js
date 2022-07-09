const express= require('express');
const signuprouter = express.Router();

signuprouter.route('/').get((req,res)=>{
    res.render('signup');
});

module.exports= signuprouter;

