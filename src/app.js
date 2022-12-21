const express = require("express")
const app = express()

require('dotenv').config();
const PORT = process.env.PORT || 3000


app.get('/', (req, res)=>{
  res.send("Home")
})


const productsRouter = require('./routers/products');
app.use('/api/products', productsRouter);


app.listen(PORT, ()=>{
  console.log(`Server listening on port ${PORT}`)
})