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
    const cartId = req.params.cid; // Obtiene el ID del carrito desde los parámetros de la URL
  
    try {
      // Busca el carrito en la base de datos por su ID
      const cart = await cartModel.findById(cartId).exec();
  
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      // Obtiene los IDs de los productos en el carrito
      const productIdsInCart = cart.products.map(product => product.productId);
  
      // Busca los detalles de los productos en base a los IDs
      const productsInCart = await productModel.find({ _id: { $in: productIdsInCart } }).exec();
  
      // Renderiza la plantilla 'cart.handlebars' con los datos de los productos en el carrito
      res.render('cart', { productsInCart }); // 'cart' es el nombre de tu plantilla Handlebars
    } catch (error) {
      console.error('Error al obtener el carrito desde la base de datos:', error);
      res.status(500).json({ error: 'Error al obtener el carrito desde la base de datos' });
    }
  };

export {showAllProducts, showCart}