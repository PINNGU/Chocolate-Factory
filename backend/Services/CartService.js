const fs = require('fs');
const path = require('path');
const jsonHandler = require('../utils/jsonHandler');


const cartFilePath = path.join(__dirname, '../data/carts.json');

class CartService {
  static async getCartById(cartId) {
    const carts = await jsonHandler.readJsonFile(cartFilePath);
    return carts.find(cart => cart.id === cartId);
  }

  static async createCart(user) {
    const carts = await jsonHandler.readJsonFile(cartFilePath);
    const newCart = new Cart(user);
    carts.push(newCart);
    await jsonHandler.writeJsonFile(cartFilePath, carts);
    return newCart;
  }

  static async addItemToCart(cartId, chocolate, quantity) {
    const carts = await jsonHandler.readJsonFile(cartFilePath);
    const cart = carts.find(cart => cart.id === cartId);
    if (!cart) throw new Error('Cart not found');

    const existingItemIndex = cart.items.findIndex(item => item.chocolate.id === chocolate.id);
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ chocolate, quantity });
    }
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.chocolate.price * item.quantity), 0);

    await jsonHandler.writeJsonFile(cartFilePath, carts);
    return cart;
  }

  static async removeItemFromCart(cartId, chocolateId) {
    const carts = await jsonHandler.readJsonFile(cartFilePath);
    const cart = carts.find(cart => cart.id === cartId);
    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter(item => item.chocolate.id !== chocolateId);
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.chocolate.price * item.quantity), 0);

    await jsonHandler.writeJsonFile(cartFilePath, carts);
    return cart;
  }
}

module.exports = CartService;