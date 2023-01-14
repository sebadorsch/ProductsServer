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

socket.on('total_products', (data) => {
  document.querySelector('p').innerHTML = data.map(product => {
    return JSON.stringify(product)
  }).join('<br>');
})
