const express = require('express');
const dogrouter = express.Router();
const mysql = require('mysql');



dogrouter.route('/').get((req, res) => {

  const con = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "purrfectstore"
    });
  con.query("SELECT * from product where category='dog'", (err, result) => {

    res.render('dogproducts', { result: result });
  })

});

dogrouter.route('/:id').get((req, res) => {

  const id = req.params.id;
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "purrfectstore"
  })
  con.query("SELECT * from product where category='dog'",(err,result)=>{
    res.render('dogproductdetail',{result:result[id]})
  })


});

module.exports = dogrouter;
