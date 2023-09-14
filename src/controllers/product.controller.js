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
      
        const {name, price, imageUrl} = req.body;
        let errors = [];

        if(!name || name.trim() ==''){
            errors.push("Name is required");
        }

        if(!price || parseFloat(price) < 1){
            errors.push("Price is required");
        }

        try {
            const validURL = new URL(imageUrl);
        } catch (error) {
            errors.push("URL is invalid");
        }

        if (errors.length > 0) {
            return res.render('new-product', {
              errorMessage: errors[0],
            });
          }

        console.log(req.body);
        ProductModel.add(req.body);

        let products = ProductModel.get();
        res.render("products", {products:products});
    }
}