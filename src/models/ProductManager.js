const fs = require('fs')

class ProductManager {

  constructor(path) {
    if (!path)
      console.log('Error: Missing path at ProductManager creation')
    else {
      this.path = path
      fs.existsSync(path)
        ? this.products = JSON.parse(fs.readFileSync(path, 'utf-8'))
        : this.products = []
    }
  }

  addProduct(product){
    try{
      if(Object.keys(product).length !== 8)
        return 'Error: Invalid amount of arguments'

      fs.existsSync(this.path)
        ? this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        : this.products = []

      if(this.products.find(e => e.code === product.code))
        return 'Error: Product already exists!'

      product["id"] = this.products.length !== 0
        ? this.products[this.products.length - 1]["id"] + 1
        : 1

      this.products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
      return product
    }
    catch(error){
      return error
    }
  }

  getProducts(){
    return this.products
  }

  getProductById(id){
    try{
      return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        .find(e => e.id === id) || "Error: Not found"
    }
    catch (error){
      console.log(error)
    }
  }

  updateProduct(id, obj){
    try{
      id = parseInt(id)
      if(!id || !this.products.find(e => e.id === id))
        return "Error: id not found"
      else if (Object.keys(obj).some(value => {return ['id'].includes(value)}))
        return "Error: Not Allowed to change id or code values"
      else{
        let updatedProduct = this.products.find(e => e.id === id)
        console.log(updatedProduct)
        Object.keys(obj).map(key=> {
          return updatedProduct[key] = obj[key]
        })

        this.products = this.products.filter(e => e.id !== id)

        this.products.push(updatedProduct)

        fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
        return "Product updated successfully!"
      }
    }
    catch(error){
      return error
    }
  }

  deleteProduct(id){
    id = parseInt(id)
    if(!id || !this.products.find(e => e.id === id))
      return "Error: id not found"
    else {
      let products = this.products.filter(e => e.id !== id)
      fs.writeFileSync(this.path, JSON.stringify(products, null, '\t'))
      return "Product deleted successfully"
    }
  }
}

module.exports = ProductManager