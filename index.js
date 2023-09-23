import express from 'express'
import ProductController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import ejsLayouts from 'express-ejs-layouts'
import path from 'path';
import validation from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/isVisit.middleware.js';

const server = express();

server.use(express.static('public'));

server.use(cookieParser());
server.use(setLastVisit);
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));



// parse form data
server.use(express.urlencoded({extended:true}));

// set up view engine
server.set('view engine', 'ejs');
server.set('views',path.join(path.resolve(),"src",'views' ));


server.use(ejsLayouts);

// create an instance of ProductController
const productController = new ProductController(); 
// create an instance of ProductController
const userController = new UserController();


server.get('/register',userController.getRegister);
server.get('/login',userController.getLogin);
server.post('/register', userController.postRegister);
server.post('/login',userController.postLogin);
server.get('/logout',userController.logout);
server.get('/',auth, (productController.getProducts));
server.get('/new',auth, (productController.getForm));
server.post('/',uploadFile.single('imageUrl'),validation, (productController.addNewProduct));
server.get('/update_product/:id',auth, (productController.getUpdateProductView));
server.post('/update-product',auth,productController.postUpdateProduct)
server.post('/delete-product/:id',auth, productController.deleteProduct);

server.use(express.static('src/views'));
    // return res.send('Welcome to Inventory App');
server.listen(3100);
console.log('Server is listening on pert 3100');