const Constants = require('../Constants');
const express = require('express')
const productsRouter = express.Router()
productsRouter.use(express.json())
const ProductManager = require('../models/ProductManager')

const productManager = new ProductManager(Constants.productsUrl)

productsRouter.get('/', (req, res) => {
  try{
    const { limit } = req.query
    if(limit){
      res.status(200).json(productManager.getProducts().slice(0, limit));
    }
    else{
      res.status(200).json(productManager.getProducts());
    }
  }
  catch (error){
    res.status(500).json("error")
  }
});

productsRouter.get('/:id', (req, res) => {
  try{
    res.status(200).json(productManager.getProductById(parseInt(req.params.id)));
  }
  catch (error){
    res.status(500).json("error")
  }
})

productsRouter.post('/', (req, res) => {
  try{
    const product = req.body
    res.status(200).send(JSON.stringify(productManager.addProduct(product)))
  }
  catch (error){
    res.status(500).json("error")
  }
})

productsRouter.put('/:id', (req, res) => {
  try{
    const updateProduct = productManager.updateProduct(req.params.id, req.body)
    updateProduct
      ? res.status(200).send(updateProduct)
      : res.status(400).send("Bad request")
  }
  catch (error){
    res.status(500).json("error")
  }
})

productsRouter.delete('/:id', (req, res) => {
  try{
    res.status(200).send(JSON.stringify(productManager.deleteProduct(req.params.id)))
  }
  catch (error){
    res.status(500).json("error")
  }
})

module.exports = productsRouter