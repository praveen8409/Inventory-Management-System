import express from 'express'
import ProductController from './src/controllers/product.controller.js';
// const express = require('express');

const server = express();

// create an instance of ProductController
const productController = new ProductController(); 
server.get('/', (productController.getProducts));
server.use(express.static('src/views'));
    // return res.send('Welcome to Inventory App');
server.listen(3100);
console.log('Server is listening on pert 3100');