import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController{

    getProducts(req,res){
        let products = ProductModel.get();
        console.log(products);


        // console.log(path.resolve());
        // return res.sendFile(path.join(path.resolve(),"src",'views',"products.html" ));

       res.render("products", {products:products, userEmail : req.session.userEmail});
    }

    getForm(req, res){
        return res.render("new-product",{errorMessage:null,userEmail:req.session.userEmail});
    }

    addNewProduct(req,res,next){
      
        const {name, desc, price} = req.body;
        const imageUrl = 'images/' + req.file.filename;
        
        console.log(req.body);
        ProductModel.add(name, desc, price, imageUrl);

        var products = ProductModel.get();
        res.render("products", {products:products,userEmail:req.session.userEmail});
    }

    getUpdateProductView(req, res, next){
        // 1. if product exist then return views

        const id = req.params.id;

        const productFound = ProductModel.getById(id);
        if(productFound){
            res.render('update_product',{product:productFound,errorMessage:null,userEmail:req.session.userEmail},);
        }
        // 2. Else return error
        else{
            res.status(401).send('Product not found');
        }
    }

    postUpdateProduct(req,res){
        ProductModel.update(req.body);
        let products = ProductModel.get();
        res.render("products", {products:products,userEmail:req.session.userEmail});
    }

    deleteProduct(req, res){  
        const id= parseInt(req.params.id);
        const productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send("Product not found");
        }
        ProductModel.delete(id);
        var products = ProductModel.get();
        res.render('products', { products ,userEmail:req.session.userEmail});
    }
}