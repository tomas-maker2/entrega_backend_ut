import { Router } from "express";
import publicRoutes from "../middleware/publicRoutes.js";
import privateRoutes from "../middleware/privateRoutes.js";
import { logger } from "../utils/logger.js";

const router = Router();

router.get('/login', publicRoutes , (req,res) => {
    res.render('login')
})


router.get('/signup',  publicRoutes ,(req,res) => {
    res.render('signup')
})


router.get('/recover',  publicRoutes ,(req,res) => {
    res.render('recover')
})

router.get('/loggerTest', (req,res) => {
    logger.debug('Test de logger: Debug');
    logger.info('Test de logger: Info');
    logger.warn('Test de logger: Advertencia');
    logger.error('Test de logger: Error');

    res.send('Logs generados. Verifica la consola o el archivo "errors.log" en modo producción.');
})

router.get('/profile', privateRoutes , (req,res) => {
    const { first_name, last_name, email, age } = req.session 
    res.render('profile', { first_name, last_name, email, age } )
})

router.get('/logout' , (req,res) => {
    req.session.destroy();
    res.redirect('/login')
})

export default router