


const socket = io();

const title = document.querySelector('#title');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const thumbnail = document.querySelector('#thumbnail');
const code = document.querySelector('#code');
const stock = document.querySelector('#stock');
const category = document.querySelector('#category');
const status = document.querySelector('#status');

document.querySelector('#send').addEventListener('click', (event) => {
  event.preventDefault()

  socket.emit('new_product', {
    title: title.value,
    description: description.value,
    price: price.value,
    thumbnail: thumbnail.value,
    code: code.value,
    stock: stock.value,
    category: category.value,
    status: status.checked
  });
})

document.querySelector('#send').addEventListener('click', (event) => {
  event.preventDefault()

  socket.emit('new_product', {
    title: title.value,
    description: description.value,
    price: price.value,
    thumbnail: thumbnail.value,
    code: code.value,
    stock: stock.value,
    category: category.value,
    status: status.checked
  });
})

function deleteProduct(id){
  socket.emit("delete_product", id)
}


socket.on('total_products', (data) => {
  let allProducts = document.getElementById("all-products")
  allProducts.innerHTML = ""

  data.map(product => {
    allProducts.innerHTML += `
        <span><strong>id: </strong> ${product.id}</span><br>
        <span><strong>title: </strong> ${product.title}</span><br>
        <span><strong>description: </strong> ${product.description}</span><br>
        <span><strong>price: </strong> ${product.price}</span><br>
        <span><strong>thumbnail: </strong> ${product.thumbnail}</span><br>
        <span><strong>code: </strong> ${product.code}</span><br>
        <span><strong>stock: </strong> ${product.stock}</span><br>
        <span><strong>category: </strong> ${product.category}</span><br>
        <span><strong>status: </strong> ${product.status}</span><br>
        <button 
          style="cursor: pointer; color: #fff;background-color: #c82333; display: inline-block;font-weight: 400;text-align: center;white-space: nowrap;vertical-align: middle;user-select: none;border: 1px solid transparent;padding: 0.375rem 0.75rem;font-size: 1rem;line-height: 1.5;border-radius: 0.25rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;"
          id="delete-button"
          value="${product.id}"
          onclick="deleteProduct(${product.id})"
        >
          Delete
        </button><br><br>
      `
  })
})