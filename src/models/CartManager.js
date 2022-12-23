const fs = require('fs')

class CartManager {

  constructor(path) {
    if (!path)
      console.log('Error: Missing path at CartManager creation')
    else {
      this.path = path
      fs.existsSync(path)
        ? this.carts = JSON.parse(fs.readFileSync(path, 'utf-8'))
        : this.carts = []
    }
  }

  addCart(products){
    try{
      fs.existsSync(this.path)
        ? this.carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        : this.carts = []

      const cart = {}

      cart["id"] = this.carts.length !== 0
        ? this.carts[this.carts.length - 1]["id"] + 1
        : 1

      cart.products = products.length ? products : [products]

      this.carts.push(cart);
      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, '\t'))
    }
    catch(error){
      return error
    }
  }

  getCarts(){
    return this.carts
  }

  getCartById(id){
    try{
      return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        .find(e => e.id === id) || "Error: Not found"
    }
    catch (error){
      console.log(error)
    }
  }
}

module.exports = CartManager