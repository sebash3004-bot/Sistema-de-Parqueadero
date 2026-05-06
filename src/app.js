const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares de seguridad y utilidades
app.use(helmet()); // Protección premium de cabeceras
app.use(morgan('dev')); // Logger para desarrollo
app.use(express.json()); // Permitir entrada de datos JSON

// Ruta de prueba de estado del sistema
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'Online', message: 'Sistema de Parqueadero Operativo' });
});

module.exports = app;