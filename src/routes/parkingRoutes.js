const express = require('express');
const router = express.Router();
const { registerEntry, processExit } = require('../controllers/authController');

// Ruta para registrar entrada (Autenticación de usuario/vehículo + Scanner)
router.post('/entry', registerEntry);

// Ruta para procesar salida (Cálculo de tarifa + Facturación)
router.post('/exit', processExit);

module.exports = router;