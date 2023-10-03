import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";

const router = Router();

router.post('/signup', async (req,res) => {
    const { first_name, last_name, email, age, password } = req.body;
    
    const userExists = await userModel.findOne({email})

    if(userExists){
        return res.send("Ya estas Registrado")
    }

    const user = await userModel.create({
        first_name, 
        last_name, 
        email, 
        age, 
        password,
    });

    req.session.first_name = first_name;
    req.session.last_name = last_name;
    req.session.email = email;
    req.session.age = age;
    req.session.isLogged = true;

    res.redirect('products')
});

router.post ('/login', async (req,res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({email,password}).lean();

    if(!user){
        return res.send("Tus credenciales no son correctas")
    }

    if(email === 'adminCoder@coder.com' && password === 'adminCod3r123' ){
        user.role = 'admin'
    } else {
        user.role = 'usuario'
    }


    req.session.first_name = user.first_name;
    req.session.last_name = user.last_name;
    req.session.email = user.email;
    req.session.age = user.age;
    req.session.isLogged = true;
    req.session.role  =user.role;

    res.redirect('products')
})

export default router