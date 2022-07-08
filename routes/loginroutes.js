const express= require('express');
const loginrouter = express.Router();

loginrouter.route('/').get((req,res)=>{
    res.send('this is login routes');
});

module.exports= loginrouter;

