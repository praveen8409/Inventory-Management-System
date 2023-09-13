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
        return res.render("new-product");
    }

    addNewProduct(req,res){
        
        console.log(req.body);
        ProductModel.add(req.body);

        let products = ProductModel.get();
        res.render("products", {products:products});
    }
}