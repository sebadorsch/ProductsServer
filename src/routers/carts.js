const express = require('express')
const cartsRouter = express.Router()
cartsRouter.use(express.json())
const CartManager = require('../models/CartManager')
const cartManager = new CartManager(process.env.CARTS_URL)

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

cartsRouter.get('/:id', (req, res) => {
  try{
    res.status(200).json(cartManager.getCartById(parseInt(req.params.id)));
  }
  catch (error){
    res.status(500).json("error")
  }
})

cartsRouter.post('/', (req, res) => {
  try{
    const cart = cartManager.addCart()
    cart
      ? res.status(200).send(cart)
      : res.status(400).send(JSON.stringify("Bad request"))
  }
  catch (error){
    res.status(500).json("error")
  }
})

cartsRouter.post('/:cid/product/:pid', (req, res) => {
  try{
    const addProduct = cartManager.addProduct(parseInt(req.params.cid), parseInt(req.params.pid))
    addProduct
      ? res.status(200).send(addProduct)
      : res.status(400).send('Bad request')
  }
  catch (error){
    res.status(500).json("Error")
  }
})


module.exports = cartsRouter