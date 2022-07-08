const express= require('express');
const dogrouter= express.Router();

dogrouter.route('/').get((req,res)=>{
    res.send('this is dogspage');
});
dogrouter.route('/singledog').get((req,res)=>{
    res.send('this is single dog');
});

module.exports=dogrouter;
