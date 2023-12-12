const fs = require("fs");

class ProductManager {
    #id = 1;
    path;

    constructor(filePath) {
        this.path = filePath; // Asigna el valor de filePath a this.path en el constructor
    }

    saveProducts(data) {
        // Guarda los productos en el archivo especificado
        fs.writeFileSync(this.path, JSON.stringify(data));
    }

    readFile() {
        // Lee el contenido del archivo y lo convierte de JSON a un array, o retorna un array vacío si el archivo está vacío o no se puede parsear.
        const fileContent = fs.readFileSync(this.path, "utf-8");
        return JSON.parse(fileContent) || [];
    }

    addProduct(product) {
        const allProducts = this.readFile(); // Lee todos los productos existentes desde el archivo

        // Validación de campos del producto
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return console.log('Complete todos los campos');
        }

        const existingProduct = allProducts.find(existingProduct => existingProduct.code === product.code);
        if (existingProduct) {
            return console.log('El código del producto ya existe');
        }

        const productId = this.#id++; // ID incrementable
        product.id = productId; // Asigna el ID al nuevo producto

        allProducts.push(product); // Añade el nuevo producto al array existente
        this.saveProducts(allProducts); // Guarda todos los productos en el archivo
    }

    getProducts() {
        // Retorna el array de productos obtenido del archivo
        return this.readFile();
    }

    getProductById(id) {
        // Busca y retorna un producto por su ID, utilizando readFile para obtener todos los productos
        const foundProduct = this.readFile().find(product => product.id.toString() === id.toString());
        if (foundProduct) {
            return foundProduct;
        } else {
            console.log('Producto no encontrado');
            return null;
        }
    }

    updateProduct(id, fieldToUpdate, newValue) {
        let productUpdated = false; // Variable para controlar si se actualizó el producto

        const allProducts = this.readFile(); // Lee todos los productos existentes desde el archivo

        allProducts.forEach(product => {
            if (product.id === id) {
                product[fieldToUpdate] = newValue; // Actualiza el campo especificado con el nuevo valor
                productUpdated = true; // Marca que se ha actualizado el producto
            }
        });

        if (productUpdated) {
            this.saveProducts(allProducts); // Guarda los productos actualizados en el archivo
            return true;
        } else {
            console.log('No se encontró el producto');
            return false;
        }
    }

    deleteProduct(id) {
        let allProducts = this.readFile(); // Lee todos los productos existentes desde el archivo

        const updatedProducts = allProducts.filter(product => product.id !== id); // Filtra los productos excluyendo el indicado para eliminar
        if (updatedProducts.length < allProducts.length) {
            allProducts = updatedProducts; // Actualiza el array de productos
            this.saveProducts(allProducts); // Guarda los productos actualizados en el archivo
            return true;
        } else {
            return false;
        }
    }
}

module.exports = ProductManager;
