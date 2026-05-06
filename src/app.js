const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path'); // Librería nativa para manejar rutas de archivos
require('dotenv').config();

// Importar rutas de la aplicación
const parkingRoutes = require('./routes/parkingRoutes');

const app = express();

/**
 * CONFIGURACIÓN DE MIDDLEWARES (Seguridad y Utilidades)
 */
app.use(helmet({
    contentSecurityPolicy: false, // Desactivado temporalmente para facilitar pruebas locales con el frontend
})); 
app.use(morgan('dev')); 
app.use(express.json()); 

/**
 * SERVIR ARCHIVOS ESTÁTICOS
 * Esta línea permite que el navegador acceda a la carpeta 'public' (HTML, CSS, JS)
 */
app.use(express.static(path.join(__dirname, '../public')));

/**
 * DEFINICIÓN DE RUTAS API
 */
app.use('/api/v1/parking', parkingRoutes);

// Endpoint de salud del sistema
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ 
        status: 'Online', 
        message: 'Sistema de Control de Parqueadero Operativo y Frontend Vinculado' 
    });
});

module.exports = app;