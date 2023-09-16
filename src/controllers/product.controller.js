import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController{

    getProducts(req,res){
        let products = ProductModel.get();
        console.log(products);


        // console.log(path.resolve());
        // return res.sendFile(path.join(path.resolve(),"src",'views',"products.html" ));

       res.render("products", {products:products});
    }

    getForm(req, res){
        return res.render("new-product",{errorMessage:null});
    }

    addNewProduct(req,res){
      
        
        console.log(req.body);
        ProductModel.add(req.body);

        let products = ProductModel.get();
        res.render("products", {products:products});
    }

    getUpdateProductView(req, res, next){
        // 1. if product exist then return views

        const id = req.params.id;

        const productFound = ProductModel.getById(id);
        if(productFound){
            res.render('update_product',{product:productFound,errorMessage:null},);
        }
        // 2. Else return error
        else{
            res.status(401).send('Product not found');
        }
    }

    postUpdateProduct(req,res){
        ProductModel.update(req.body);
        let products = ProductModel.get();
        res.render("products", {products:products});
    }
}