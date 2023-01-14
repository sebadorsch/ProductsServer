const express = require("express")
const handlebars = require("express-handlebars");
const { Server } = require('socket.io');

const Constants = require('./Constants');
const PORT = Constants.port

const app = express()
const httpServer = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
const io = new Server(httpServer)

app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  defaultLayout: 'main'
}))

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))




const viewsRouter = require ('./routers/views.routes')
const productsRouter = require('./routers/products');
const cartsRouter = require('./routers/carts');
const ProductManager = require("./models/ProductManager");

app.use("/", viewsRouter)

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const productManager = new ProductManager(Constants.productsUrl)

io.on("connection", (socket) => {
  console.log('New Client connected');

  socket.emit('total_products', productManager.getProducts())

  socket.on('new_product', (data) => {

    const product = {
      title: data.title,
      description: data.description,
      price: data.price,
      thumbnail: data.thumbnail,
      code: data.code,
      stock: data.stock,
      category: data.category,
      status: data.status
    }
    productManager.addProduct(product)
    // console.log(productManager.addProduct(product))
    io.emit('total_products', productManager.getProducts())
  })

})