import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('⭐ Conectado ⭐');
});

app.post('/mail', async (req, res) => {
    const { nombre, apellido, email, asunto, mensaje } = req.body;

    const senderName = nombre && nombre.trim() !== '' ? nombre : 'anonimo';
    const senderLastName = apellido && apellido.trim() !== '' ? apellido : '';

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "natsoftx@gmail.com",
            pass: process.env.keyGo
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    await transporter.sendMail({
        from: '',
        to: 'natsoftx@gmail.com',
        subject: `${asunto}`,
        html: `
            <h3>Correo: ${email}</h3>
            <h3>Nombre: ${senderName}</h3>
            <h3>Apellidoo: ${senderLastName}</h3>
            <p>${mensaje}</p>
            <br>
            <br>
            `
    });
    res.send('Message sent ⭐');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});