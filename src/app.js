const express = require("express")
const app = express()

const Constants = require('./Constants');
const PORT = Constants.port

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