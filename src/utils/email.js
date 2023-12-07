import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'murphy16@ethereal.email',
        pass: '9eKE26n8drEE4NC3CQ'
    }
});

export const sendPasswordResetEmail = async (to, resetLink) => {
    const message = {
    from: 'sender@server.com',
    to,
    subject: 'Restablecimiento de contraseña',
    text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetLink}`,
    html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace: <a href="${resetLink}">${resetLink}</a></p>`,
    };

    await transporter.sendMail(message);
};

