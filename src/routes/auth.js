import express from 'express'
import { Router } from 'express'
import nodemailer from 'nodemailer'
import { userModel } from '../dao/models/user.model.js';
import { sendPasswordResetEmail } from '../utils/email.js';
import crypto from 'crypto'

const router = Router();

// Ruta para olvidar la contraseña
router.post('/forgot', async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email})

        if(!user){
            return res.status(404).send('No se encontró un usuario con ese correo electrónico.')
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;

        await user.save()

        const resetLink = `http://tu-servidor.com/reset/${token}`;
        await sendPasswordResetEmail(user.email, resetLink)

        res.send('Se ha enviado un enlace de restablecimiento a tu correo electrónico.')

    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor.')
    }
});

  // Ruta para restablecer contraseña
router.get('/reset/:token', async (req, res) => {
    try {
        const user = await userModel.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
        })

        if(!user){
            return res.send(400).send('Enlace de restablecimiento de contraseña no válido o expirado.')
        }

        // VALIDAR CONTRASEÑA
        if(req.body.password !== req.body.confirmPassword){
            return res.status(400).send('Las contraseñas no coinciden.')
        }

        // ACTUALIZAR CONTRASEÑA EN BASE DA DATOS
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        // Redirigir a la página de inicio de sesión u otra página después de restablecer la contraseña
        res.redirect('/login');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor.');
    }
});

export default router

