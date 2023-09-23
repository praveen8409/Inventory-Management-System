import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
import session from "express-session";
export default class UserController{
    getRegister(req, res){
        res.render('register');
    }

    getLogin(req,res){
        res.render('login',{ errorMessage : null,});
    }

    postRegister(req,res){
        const{name,email,password} = req.body;
        UserModel.add(name,email,password);
        res.render('login',{ errorMessage : null});
    }

    postLogin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.isValidUser(
          email,
          password
        );
        if (!user) {
          return res.render('login', {
            errorMessage: 'Invalid Credentials',
          });
        }

        // write session cookie code?
        req.session.userEmail = email;


        var products = ProductModel.get();
        res.render('products', { products, userEmail:req.session.userEmail });
      }

      logout(req, res){
        // Destroy the session for logout
        req.session.destroy((err)=>{
          if(err){
            console.log(err);
          }else{
            res.redirect('/login');
          }
        })
      }
}