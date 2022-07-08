const express= require('express');
const signuprouter = express.Router();

signuprouter.route('/').get((req,res)=>{
    res.send('this is signup routes');
});

module.exports= signuprouter;

