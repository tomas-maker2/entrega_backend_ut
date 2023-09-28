import fs from 'fs';
import ProductManager from '../dao/database/ProductManager.js';
import { productModel } from '../dao/models/product.model.js';


const productosFile = './src/data/productos.json';


const productManager = new ProductManager(productosFile);

// Función para obtener todos los productos
// Función para obtener todos los productos con filtros y paginación
const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    
    const queryOptions = {};

    
    if (query) {
      if (query === 'available') {
        queryOptions.status = true;
      } else if (query === 'unavailable') {
        queryOptions.status = false; 
      } else if (query === 'electronics') {
        queryOptions.category = 'Electronics'; 
      } else if (query === 'clothing') {
        queryOptions.category = 'Clothing'; 
      }
    }

    const sortOptions = {};
    if (sort === 'asc') {
      sortOptions.price = 1; // Ordenamiento ascendente por precio
    } else if (sort === 'desc') {
      sortOptions.price = -1; // Ordenamiento descendente por precio
    }

    const totalProducts = await productModel.countDocuments(queryOptions);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await productModel
      .find(queryOptions)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    const response = {
      status: 'success',
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page: Number(page),
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}` : null,
      nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}` : null,
    };

    res.json(response);
  } catch (error) {
    console.error('Error al obtener todos los productos', error);
    res.status(500).json({ error: 'Error al obtener todos los productos' });
  }
}
// Función para obtener un producto por ID
const getProductById = async (req, res) => {
  const productId = req.params.pid;

  try {
    const foundProduct = await productManager.getProductById(productId);

    if (foundProduct) {
      res.json(foundProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto por ID', error);
    res.status(500).json({ error: 'Error al obtener el producto por ID' });
  }
}

// Función para agregar un nuevo producto
const addProduct = async (req, res) => {
  const newProductData = req.body;

  try {
    const newProduct = await productManager.addProduct(newProductData);
    res.json(newProduct);
  } catch (error) {
    console.error('Error al agregar un nuevo producto', error);
    res.status(500).json({ error: 'Error al agregar un nuevo producto' });
  }
}

// Función para actualizar un producto
const updateProduct = async (req, res) => {
  const productId = req.params.pid;
  const updatedProductData = req.body;

  try {
    const updatedProduct = await productManager.updateProduct(productId, updatedProductData);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

// Función para eliminar un producto
const deleteProduct = async (req, res) => {
  const productId = req.params.pid;

  try {
    const deleted = await productManager.deleteProduct(productId);
    if (deleted) {
      res.json({ message: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el producto', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}

export { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };




// import fs from 'fs';
// import ProductManager from '../ProductManager.js';

// const productosFile = './src/data/productos.json';

// const productManager = new ProductManager(productosFile)

// function getAllProducts(req, res) {
//     try {
//       // Lee el archivo de productos actual
//       const productosData = fs.readFileSync(productosFile, 'utf8');
//       const productos = JSON.parse(productosData);
      
//       res.json(productos);
//     } catch (error) {
//       console.error('Error al obtener todos los productos', error);
//       res.status(500).json({ error: 'Error al obtener todos los productos' });
//     }
//   }
  

// function getProductById(req, res) {
//   const productId = req.params.pid;

//   try {
//     // Lee el archivo de productos actual
//     const productosData = fs.readFileSync(productosFile, 'utf8');
//     const productos = JSON.parse(productosData);
    
//     // Busca el producto por ID
//     const foundProduct = productos.find((product) => product.id === productId);

//     if (foundProduct) {
//       res.json(foundProduct);
//     } else {
//       res.status(404).json({ error: 'Producto no encontrado' });
//     }
//   } catch (error) {
//     console.error('Error al obtener el producto por ID', error);
//     res.status(500).json({ error: 'Error al obtener el producto por ID' });
//   }
// }

// function addProduct(req, res) {
//   const newProductData = req.body;

//   try {
//     // Lee el archivo de productos actual
//     const productosData = fs.readFileSync(productosFile, 'utf8');
//     const productos = JSON.parse(productosData);

//     // Genera un nuevo ID para el producto (puedes utilizar tu propia lógica de generación)
//     const newProductId = generateProductId();

//     // Crea un nuevo producto con el ID generado
//     const newProduct = {
//       id: newProductId,
//       ...newProductData,
//     };

//     // Agrega el nuevo producto al arreglo de productos
//     productos.push(newProduct);

//     // Guarda el arreglo actualizado en el archivo
//     fs.writeFileSync(productosFile, JSON.stringify(productos, null, 2));

//     res.json(newProduct);
//   } catch (error) {
//     console.error('Error al agregar un nuevo producto', error);
//     res.status(500).json({ error: 'Error al agregar un nuevo producto' });
//   }
// }

// function updateProduct(req, res) {
//   const productId = req.params.pid;
//   const updatedProductData = req.body;

//   try {
//     // Lee el archivo de productos actual
//     const productosData = fs.readFileSync(productosFile, 'utf8');
//     const productos = JSON.parse(productosData);

//     // Busca el producto por ID
//     const productIndex = productos.findIndex((product) => product.id === productId);

//     if (productIndex !== -1) {
//       // Actualiza el producto con los datos proporcionados
//       productos[productIndex] = {
//         id: productId,
//         ...updatedProductData,
//       };

//       // Guarda el arreglo actualizado en el archivo
//       fs.writeFileSync(productosFile, JSON.stringify(productos, null, 2));

//       res.json(productos[productIndex]);
//     } else {
//       res.status(404).json({ error: 'Producto no encontrado' });
//     }
//   } catch (error) {
//     console.error('Error al actualizar el producto', error);
//     res.status(500).json({ error: 'Error al actualizar el producto' });
//   }
// }

// function deleteProduct(req, res) {
//   const productId = req.params.pid;

//   try {
//     // Lee el archivo de productos actual
//     const productosData = fs.readFileSync(productosFile, 'utf8');
//     const productos = JSON.parse(productosData);

//     // Busca el producto por ID
//     const productIndex = productos.findIndex((product) => product.id === productId);

//     if (productIndex !== -1) {
//       // Elimina el producto del arreglo
//       productos.splice(productIndex, 1);

//       // Guarda el arreglo actualizado en el archivo
//       fs.writeFileSync(productosFile, JSON.stringify(productos, null, 2));

//       res.json({ message: 'Producto eliminado correctamente' });
//     } else {
//       res.status(404).json({ error: 'Producto no encontrado' });
//     }
//   } catch (error) {
//     console.error('Error al eliminar el producto', error);
//     res.status(500).json({ error: 'Error al eliminar el producto' });
//   }
// }

// function generateProductId() {
//   // Implementa tu propia lógica para generar un ID único para el producto
//   // Esto podría ser un número secuencial o un ID aleatorio único
//   return Math.random().toString(36).substring(2, 10); // Ejemplo de ID aleatorio
// }

// export { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };
