const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

/**
 * http://localhost:3000/cart/add?productId=3&name=Tablet&price=15000&quantity=1
 */
function addToCart(cart, productId, name, price, quantity) {
  const product = {
    productId,
    name,
    price,
    quantity,
  };
  cart.push(product);

  return cart;
}

app.get('/cart/add', (req, res) => {
  const productId = parseInt(req.query.productId);
  const name = req.query.name;
  const price = parseInt(req.query.price);
  const quantity = parseInt(req.query.quantity);
  const updatedCart = addToCart(cart, productId, name, price, quantity);

  res.json({
    cartItems: updatedCart,
  });
});

/**
 * http://localhost:3000/cart/edit?productId=2&quantity=3
 */

function editCart(cart, productId, quantity) {
  const index = cart.findIndex((item) => item.productId === productId);
  if (index != -1) {
    cart[index].quantity = quantity;
  }
  return cart;
  /*for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      return cart;
    }
  }*/
}

app.get('/cart/edit', (req, res) => {
  const productId = parseInt(req.query.productId);
  const quantity = parseInt(req.query.quantity);
  const updatedCart = editCart(cart, productId, quantity);

  res.json({
    cartItems: updatedCart,
  });
});

/**
 * http://localhost:3000/cart/delete?productId=1
 */

function removeFromCartById(cart, productId) {
  const index = cart.findIndex((item) => item.productId === productId);
  if (index != -1) {
    const removedItem = cart.splice(index, 1);
  }
  return cart;
}
app.get('/cart/delete', (req, res) => {
  const productId = parseInt(req.query.productId);
  removeFromCartById(cart, productId);

  res.json({
    cartItems: cart,
  });
});

/**
 * http://localhost:3000/cart
 */
app.get('/cart', (req, res) => {
  res.json({
    cartItems: cart,
  });
});

/**
 * http://localhost:3000/cart/total-quantity
 */

function calculateTotalQuantity() {
  const totalQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = calculateTotalQuantity();
  res.json({
    totalQuantity,
  });
});

/**
 * http://localhost:3000/cart/total-price
 */
function calculateTotalPrice() {
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  const totalPrice = calculateTotalPrice();
  res.json({
    totalPrice,
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to FlipDeal - Shopping Cart Operations API!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
