const express= require('express');
const fishrouter= express.Router();
const mysql= require('mysql');



fishrouter.route('/').get((req,res)=>{
  const con= mysql.createConnection(
    {
    host:"localhost",
    user:"root",
    password:"",
    database:"purrfectstorehouse"
  });
  con.query("SELECT * from product where pcategory='fish'",(err,result)=>{
    res.render('fishproducts',{
      result:result });
})
});

fishrouter.route('/:id').get((req,res)=>{

  const id = req.params.id;
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    // database: "purrfectstore"
    database:"purrfectstorehouse"

})
con.query("SELECT * from product where pcategory='fish'",(err,result)=>{
  res.render('fishdetail',{
    result:result[id] })
})

});


module.exports= fishrouter;