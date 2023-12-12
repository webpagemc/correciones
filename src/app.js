const express = require('express')
const ProductManager = require('./ProductManager')
const productManager = new ProductManager('src/products.json')
const app = express()
const port = 8080

app.get('/products', (req, res) => {   // 1er endpoint para leer el archivo de productos
    const limit = req.query.limit
    const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts()
    res.json({ products })
});

app.get('/products/:pid', (req, res) => {   // 2do endpoint para obtener un producto segun la id que el cliente elija 
    const productId = parseInt(req.params.pid)
    const product = productManager.getProductById(productId)
    if (product) {
        res.json({ product })
    } 
    if(!product) {
        res.status(404).json({ error: 'Producto no encontrado' })
    }
});

app.listen(port, () => {
    console.log(`Servidor abierto en el puerto ${port}`)
});
 