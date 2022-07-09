const express = require('express');
const catrouter = express.Router();

const catproduct = [
  {
    name: 'cat chew stick',
    price: 200
  },

  {
    name: 'cat serlacs',
    price: 300
  },

  {
    name: 'cat milk bottle',
    price: 250
  },

  {
    name: 'kity litter box',
    price: 350
  },
  {
    name: 'cat belt',
    price: 200
  },

  {
    name: 'kitty home',
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
catrouter.route('/').get((req, res) => {
  res.render('catproducts', {
    catproduct
  });
})
catrouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  res.render('productdetail',{
    
  catpr:catproduct[id]
})
})

module.exports = catrouter;