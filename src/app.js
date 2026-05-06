const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importar rutas
const parkingRoutes = require('./routes/parkingRoutes');

const app = express();

// Middlewares Globales
app.use(helmet()); // Seguridad premium para headers
app.use(morgan('dev')); // Logs de peticiones en consola
app.use(express.json()); // Parseo de JSON

// Implementación de Rutas
app.use('/api/v1/parking', parkingRoutes);

// Ruta de salud del sistema
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ 
        status: 'Online', 
        message: 'Sistema de Control de Parqueadero Operativo' 
    });
});

module.exports = app;