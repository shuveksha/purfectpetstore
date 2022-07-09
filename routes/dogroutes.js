const express= require('express');
const dogrouter= express.Router();

const dogproduct=[
       {
        name: 'dog chew stick',
        price: 200
      },
    
      {
        name: 'dog serlacs',
        price: 300
      },
    
      {
        name: 'dog milk bottle',
        price: 250
      },
    
      {
        name: 'dog litter box',
        price: 350
      },
      {
        name: 'dog belt',
        price: 200
      },
    
      {
        name: 'dog home',
        price: 3000
      },
      {
        name: 'elephant stuffed',
        price: 550
      },
      {
        name: 'ball toy',
        price: 150
      },


]

dogrouter.route('/').get((req,res)=>{
    res.render('dogproducts',{
        dogproduct
    });
});

dogrouter.route('/singledog').get((req,res)=>{
    res.send('this is single dog');
});

module.exports=dogrouter;
