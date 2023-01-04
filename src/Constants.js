const {
  PORT,
  PRODUCTS_URL,
  CARTS_URL
} = process.env;

module.exports = Constants = {
  port: PORT || 8080,
  productsUrl: PRODUCTS_URL || 'src/models/Products.json',
  cartsUrl: CARTS_URL || 'src/models/Carts.json'
};