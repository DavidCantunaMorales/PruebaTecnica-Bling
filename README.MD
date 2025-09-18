# Cómo Ejecutar el Proyecto

## Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd proyecto-registro-usuarios
```

## Backend

```bash
cd backend
npm install
node server.js
```

## Frontend

```bash
cd frontend
npm install
npm start
```

## Consideraciones

Para que el backend pueda enviar correos electrónicos usando Nodemailer con Gmail, necesitas generar una contraseña de aplicación en tu cuenta de Google, generarla y colocarla en la ruta backend/routes/userRoutes.js

```bash
pass: "<contraseña de aplicación>",
```
