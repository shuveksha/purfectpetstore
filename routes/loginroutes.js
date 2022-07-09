const express= require('express');
const loginrouter = express.Router();

loginrouter.route('/').get((req,res)=>{
  res.render('login');
});

module.exports= loginrouter;

