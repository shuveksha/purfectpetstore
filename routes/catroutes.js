const express= require('express');
const catrouter= express.Router();

catrouter.route('/').get((req,res)=>{
    res.render('catproducts');
})
catrouter.route('/singlecat').get((req,res)=>{
  res.send('this is single catproduct');  
})

module.exports=catrouter;