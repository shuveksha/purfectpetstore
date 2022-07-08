const express= require('express');
const fishrouter= express.Router();

fishrouter.route('/').get((req,res)=>{
    res.send('this is fishroutes');
});
fishrouter.route('/singlefish').get((req,res)=>{
res.send('this is single fish products');
})

module.exports= fishrouter;