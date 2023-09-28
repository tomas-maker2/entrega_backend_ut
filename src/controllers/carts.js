import fs from 'fs';
import CartManager from '../dao/database/CartManager.js';

const carritoFile = './src/data/carrito.json';

const cartManager = new CartManager(carritoFile)

function createCart(req, res) {
  try {
    const newCart = cartManager.createCart();
    res.json({ cartId: newCart.id });
  } catch (error) {
    console.error('Error al crear el carrito', error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
}

function getCartById(req, res) {
  const cartId = req.params.cid;

  try {
    const foundCart = cartManager.getCartById(cartId);

    if (foundCart) {
      res.json(foundCart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el carrito', error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
}

function addProductToCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1; // Por defecto, agrega 1 unidad

  try {
    const foundCart = cartManager.addProductToCart(cartId, productId, quantity);

    if (foundCart) {
      res.json(foundCart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al agregar el producto al carrito', error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
}

function deleteProductFromCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const updatedCart = cartManager.deleteProductFromCart(cartId, productId);

    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: 'Producto o carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el producto del carrito', error);
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
}

function updateCart(req, res) {
  const cartId = req.params.cid;
  const updatedCartData = req.body;

  try {
    const updatedCart = cartManager.updateCart(cartId, updatedCartData);

    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el carrito', error);
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
}

function deleteAllProductsFromCart(req, res) {
  const cartId = req.params.cid;

  try {
    const updatedCart = cartManager.deleteAllProductsFromCart(cartId);

    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar todos los productos del carrito', error);
    res.status(500).json({ error: 'Error al eliminar todos los productos del carrito' });
  }
}

export { createCart, getCartById, addProductToCart, deleteAllProductsFromCart, updateCart, deleteProductFromCart };
