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

      const cart = {products: products}

      cart["id"] = this.carts.length !== 0
        ? this.carts[this.carts.length - 1]["id"] + 1
        : 1

      console.log(cart)
    }
    catch(error){
      return error
    }
  }

  getCarts(){
    return this.carts
  }

}

module.exports = CartManager