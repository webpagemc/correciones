const fs = require("fs");

class ProductManager{  // gestiona un conjunto de productos
    #products = []  //arreglo vacio
    #id = 1 
    path;
    
    constructor(filePath) {
        this.path = filePath // con esto asigno el valor de filePath a this.path en el constructor

    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.#products, null, 2))   // donde se guardan los productos
      }
      
    addProduct(product){
        if(!product.title || !product.description || !product.price || !product.thumbnail ||!product.code || !product.stock)
            return console.log('Complete todos los campos')
    
            const existingProduct = this.#products.find(existingProduct => existingProduct.code === product.code)
            if(existingProduct){
                return console.log('El codigo del producto ya existe')
            }
            
            const productId = this.#id++   //id incrementable
            product.id = productId        // verifico que se le asigne el id al nuevo producto
            

            this.#products.push(product)     // lo subo 
            this.saveProducts() // para guardar todos los productos en el archivo
        }
        
        getProducts() {
            return [...this.#products]

        }
        
         getProductById(id){
             const foundProduct = this.#products.find(product => product.id === id) // si product.id es = a id -> guardalo en product.. product = foundproduct 
             if(foundProduct){
                 return foundProduct
             }
             if (!foundProduct){
                 return console.log('Not found')
             }
                 const existingContent = fs.readFileSync(this.path);
                 const products = existingContent.trim() !== "" ? JSON.parse(existingContent) : [];
                 const product = products.find(product => product.id === id)
                 if (product) {
                     return product
                 } else {
                     return null
                 }
            }
                 
        updateProduct(id, fieldToUpdate, newValue) {
            
            let productUpdated = false   // en caso de que no se encuentre el producto
            
            this.#products.forEach(product => {   // uso forEach para buscar en cada producto 
                if (product.id === id) {     // si encontramos una coincidencia con el id
                    product[fieldToUpdate] = newValue  // que se guarde en fieldToUpdate con un nuevo valor  
                    productUpdated = true      // si encuentro producto es true
                }
            })

       
        // si productUpdated es true..
            if (productUpdated) {         
                this.saveProducts()
                return true
            } 
        //si productUpdated es false..
            else {
                console.log('no se encontró el producto')
                return false
            }
        }
        
        
        deleteProduct(id){
            const updatedProducts = this.#products.filter(product => product.id !== id)
                if (updatedProducts.length < this.#products.length) {   // si el array de updatedprotucts es menor que products, o sea si se elimino algo  
                    this.#products = updatedProducts   // entonces que se actualiza el array de products
                    this.saveProducts() // para que se actualice tambien en el archivo
                    return true
                 } 
                    else {
                    return false
                }
        }

    }
    

// TESTEO 

// const prueba = new ProductManager()
const filePath = "./products.json"
const prueba = new ProductManager(filePath)
console.log('Productos: ', prueba.getProducts())

prueba.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
})

console.log('Producto recientemente agregado: ', prueba.getProducts())

// Y SI LO AGREGO OTRA VEZ ? 

prueba.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
})

console.log('Producto recientemente agregado: ', prueba.getProducts()) // aca deberia saltar que ya existe

// Y SI AGREGO UNO NUEVO 

prueba.addProduct({
    title: 'producto prueba2',
    description: 'Este es un producto prueba2',
    price: 600,
    thumbnail: 'Sin imagen2',
    code: 'abc666',
    stock: 25,
})

console.log('Producto recientemente agregado: ', prueba.getProducts()) 

//
const productId = 1 
console.log('Producto encontrado:', prueba.getProductById(productId))


module.exports = ProductManager // para exportar el productmanager