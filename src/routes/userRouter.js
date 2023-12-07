import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import bcrypt from 'bcrypt'
import passport from "passport";


const router = Router();

router.post('/signup', passport.authenticate('register', {failureRedirect: '/signup'}) ,async (req,res) => {
    res.redirect('/login')
});

router.post ('/login',passport.authenticate('login' , {failureRedirect: '/login'}) , async (req,res) => {

    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.email = req.user.email;
    req.session.age = req.user.age;
    req.session.role  = req.user.role;
    req.session.isLogged = true;

    res.redirect('/profile')
})

router.get('/github', passport.authenticate('github' ,  { scope: ['user:email'] } ) , )

router.get('/githubcallback' , passport.authenticate('github' , {failureRedirect: '/login'}), (req,res) => {
    
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.email = req.user.email;
    req.session.age = req.user.age;
    req.session.role  = req.user.role;
    req.session.isLogged = true;

    res.redirect('/profile')
})

router.post ('/recover', async (req,res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({email}).lean();

    if(!user){
        return res.send("Si tu correo existe en nuestra base de datos, recibiras un correo con la info para recuperar tu contraseña ")
    }

    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    await userModel.updateOne({email}, user)

    res.redirect('/login')
})


export default router