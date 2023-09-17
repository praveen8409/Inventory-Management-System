import express from 'express'
import ProductController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts'
import path from 'path';
import validation from './src/middlewares/validation.middleware.js';

const server = express();

server.use(express.static('public'));

// parse form data
server.use(express.urlencoded({extended:true}));

// set up view engine
server.set('view engine', 'ejs');
server.set('views',path.join(path.resolve(),"src",'views' ));


server.use(ejsLayouts);

// create an instance of ProductController
const productController = new ProductController(); 
server.get('/', (productController.getProducts));
server.get('/new', (productController.getForm));
server.post('/',validation, (productController.addNewProduct));
server.get('/update_product/:id', (productController.getUpdateProductView));
server.post('/update-product',productController.postUpdateProduct)
server.post('/delete-product/:id', productController.deleteProduct);

server.use(express.static('src/views'));
    // return res.send('Welcome to Inventory App');
server.listen(3100);
console.log('Server is listening on pert 3100');