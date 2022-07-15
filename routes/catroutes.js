const express = require('express');
const catrouter = express.Router();
const mysql= require('mysql');


catrouter.route('/').get((req, res) => {
 var con=  mysql.createConnection(
    {
    host:"localhost",
    user:"root",
    password:"",
    database:"purrfectstore"
  });
con.query("SELECT * from product where category='cat'",(err,result)=>{
  res.render('catproducts',{result:result});
})
  
});

//**********


catrouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  var con=  mysql.createConnection(
     {
     host:"localhost",
     user:"root",
     password:"",
     database:"purrfectstore"
   });
 
   con.query("SELECT * from product where category='cat'",(err,result)=>{
    res.render('catproductdetail',{result:result[id]});
   });
  });

module.exports = catrouter;