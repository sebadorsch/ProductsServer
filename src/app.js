const express = require("express")
const app = express()

require('dotenv').config();
const PORT = process.env.PORT || 8080


app.get('/', (req, res)=>{
  res.send("Home")
})


const productsRouter = require('./routers/products');
const cartsRouter = require('./routers/carts');

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.listen(PORT, ()=>{
  console.log(`Server listening on port ${PORT}`)
})