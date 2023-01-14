const express = require('express')
const router = express.Router()
router.use(express.json())
const Constants = require('../Constants');
const ProductManager = require("../models/ProductManager");

const productManager = new ProductManager(Constants.productsUrl)
const products = productManager.getProducts()

router.get('/', (req, res) => {
  res.render('index', {
    products
  })
})

router.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts')
})

module.exports = router