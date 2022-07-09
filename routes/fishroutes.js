const express= require('express');
const fishrouter= express.Router();

const fishproduct=[
    {
        name: 'small acquarium',
        price: 2000
      },
    
      {
        name: 'plants decoration',
        price: 600
      },
    
      {
        name: 'colorful stones',
        price: 500
      },
    
      {
        name: 'fish food 1kg',
        price: 150     
     },

      {
        name: 'water clener',
        price: 500
      },
    
      {
        name: 'fish food 2kg',
        price: 700
      },
   
     
]

fishrouter.route('/').get((req,res)=>{
    res.render('fishproducts',{
      fishproduct  
    });
});

fishrouter.route('/:id').get((req,res)=>{
  const id= req.params.id;
   res.render('fishdetail',{
    fishpr:fishproduct[id]
   });
});

module.exports= fishrouter;