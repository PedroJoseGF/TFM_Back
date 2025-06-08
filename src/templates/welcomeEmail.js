const welcomeEmail = (id, name, role) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mensaje de Contacto</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .header {
                    display: block;
                    background-color: #f02424;
                    color: white;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }

                .header img {
                    width: 50px;
                    height: 50px;
                    margin-right: 5px;
                }

                .header h2 {
                    margin: 0 auto;
                }

                .content {
                    padding: 20px;
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    border-radius: 0 0 5px 5px;
                }

                p {
                    font-size: 12px;
                }

                .message {
                    background-color: white;
                    padding: 15px;
                    border-left: 4px solid #007bff;
                    margin: 20px 0;
                }

                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #777;
                }
            </style>
        </head>

        <body>
            <div class="header">
                <img src="cid:logo">
                <h2>Sede electrónica - Mi Ayuntamiento</h2>
            </div>
            <div class="content">
                <p>Hola ${name}, <br> Tu cuenta en la sede electrónica de <a href="http://localhost:5173">"Mi Ayuntamiento"</a> se ha creado con éxito. <br> Ahora podrás acceder a tu cuenta con tu dni.</a></p>
                <p>Desde tu cuenta puedes: <br>&nbsp;• Crear trámites. <br>&nbsp;• Consultar tu buzón de notificaciónes y tus expedientes.<br>&nbsp;• Visualizar el tablón de anuncios.
                    ${role === 'admin' ? '<br>&nbsp;• Administrar los usuarios y anuncios. <br>&nbsp;• Validar los expedientes.' : ''}
                </p>
                <p><a href="http://localhost:5173/restore-password/${id}">Pinché aquí</a> para reestablecer o recuperar su contraseña, dispone de 24 horas para reestablecerla.</p>
                <p>¡Muchas gracias por tu confianza!</p>

                <p>Si tienes alguna pregunta, no dudes en respondernos o mandarnos un correo.</p>
            </div>
            <div class="footer">
                <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                <p>&copy; ${new Date().getFullYear()} TaskPlanner. Todos los derechos reservados. &copy; </p>
            </div>
        </body>
    </html>
    `;
};

module.exports = { welcomeEmail };