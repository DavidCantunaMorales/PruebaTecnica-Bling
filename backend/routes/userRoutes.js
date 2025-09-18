const express = require('express');
const db = require('../db/database');
const nodemailer = require('nodemailer');

const router = express.Router();

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "davidcantuna20@gmail.com",
        pass: "ibxr sadf byup xdoz",
    },
});

// Función para enviar correo de confirmación
const sendConfirmationEmail = async ({ name, email, phone }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Registro Exitoso',
        text: `Hola ${name},\n\nTu registro ha sido exitoso. ¡Bienvenido!\n\nDetalles:\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Error al enviar el correo' };
    }
};

// Respuesta estandarizada
const sendResponse = (res, status, data) => {
    res.status(status).json(data);
};

// Ruta para registrar el usuario
router.post('/register', async (req, res) => {
    const { name, email, phone } = req.body;

    // Verificar si el email ya existe
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
        if (row) {
            return sendResponse(res, 400, { error: 'El email ya está registrado' });
        }
        // Insertar usuario en la base de datos
        db.run(
            'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
            [name, email, phone],
            async function (err) {
                if (err) {
                    return sendResponse(res, 500, { error: 'Error al registrar el usuario' });
                }

                // Enviar correo de confirmación
                const emailResult = await sendConfirmationEmail({ name, email, phone });
                if (!emailResult.success) {
                    return sendResponse(res, 500, {
                        message: 'Usuario registrado, pero error al enviar correo',
                    });
                }

                return sendResponse(res, 201, {
                    message: 'Usuario registrado exitosamente y correo enviado',
                });
            }
        );
    });
});

// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        db.all('SELECT * FROM users', [], (err, rows) => {
            return sendResponse(res, 200, { users: rows });
        });
    } catch (error) {
        return sendResponse(res, 500, { error: error.message });
    }
});

module.exports = router;