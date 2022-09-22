const express = require('express');
const dogrouter = express.Router();
const mysql = require('mysql');

dogrouter.route('/').get((req, res) => {

  const con = mysql.createConnection(
   
    {
      host:process.env.DATABASE_HOST,
      user:process.env.DATABASE_USER,
      password:process.env.DATABASE_PASSWORD,
      database:process.env.DATABASE
    }
    
    );
  con.query("SELECT * from product where pcategory='dog'", (err, result) => {

    res.render('dogproducts', { result: result });
  })

});

dogrouter.route('/:id').get((req, res) => {

  const id = req.params.id;
  const con = mysql.createConnection(

  {
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
  }
  
  )
  con.query("SELECT * from product where pcategory='dog'",(err,result)=>{
    res.render('dogproductdetail',{result:result[id]})
  })


});

module.exports = dogrouter;
