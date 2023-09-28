import { productModel } from "../dao/models/product.model.js";
import { cartModel } from "../dao/models/cart.model.js";

const showAllProducts = async (req,res) => {
    try{
        const products= await productModel.find().exec();
        res.render('products' , { products })
    }catch (error){
        console.error('Error al obtener los productos desde la base de datos:', error);
        res.status(500).json({ error: 'Error al obtener los productos desde la base de datos' })
    }
}

const showCart = async (req, res) => {
    const cartId = req.params.cid; 
  
    try {
      const cart = await cartModel.findById(cartId).exec();
  
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      const productIdsInCart = cart.products.map(product => product.productId);
  
      const productsInCart = await productModel.find({ _id: { $in: productIdsInCart } }).exec();
  
      
      res.render('cart', { productsInCart }); 
    } catch (error) {
      console.error('Error al obtener el carrito desde la base de datos:', error);
      res.status(500).json({ error: 'Error al obtener el carrito desde la base de datos' });
    }
  };

export {showAllProducts, showCart}