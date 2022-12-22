const express = require('express')
const cartsRouter = express.Router()
cartsRouter.use(express.json())
const CartManager = require('../models/CartManager')

const cartManager = new CartManager('src/models/Carts.json')

cartsRouter.get('/', (req, res) => {
  try{
    const { limit } = req.query
    if(limit){
      res.status(200).json(cartManager.getCarts().slice(0, limit));
    }
    else{
      res.status(200).json(cartManager.getCarts());
    }
  }
  catch (error){
    res.status(500).json("error")
  }
});

cartsRouter.post('/', (req, res) => {
  try{
    const products = req.body
    res.status(200).send(JSON.stringify(cartManager.addCart(products)))
  }
  catch (error){
    res.status(500).json("error")
  }
})

module.exports = cartsRouter