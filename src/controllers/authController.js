const db = require('../config/db');
const SecurityService = require('../services/securityService');
const BillingService = require('../services/billingService');

const registerEntry = async (req, res) => {
    const { user, vehicle, paymentMethod } = req.body;
    
    // Scanner de seguridad
    const security = await SecurityService.scanVehicle(vehicle.plate);
    if (!security.safe) return res.status(403).json({ message: "Vehículo ROBADO. Bloqueo activo." });

    const entryTime = new Date().toISOString();
    
    const query = `INSERT INTO entries (username, plate, entryTime, paymentMethod) VALUES (?, ?, ?, ?)`;
    db.run(query, [user.name, vehicle.plate.toUpperCase(), entryTime, paymentMethod], function(err) {
        if (err) return res.status(400).json({ error: "El vehículo ya está en el parqueadero" });
        res.status(201).json({ message: "Entrada guardada en DB", id: this.lastID });
    });
};

const processExit = (req, res) => {
    const { plate } = req.body;
    
    db.get(`SELECT * FROM entries WHERE plate = ?`, [plate.toUpperCase()], (err, row) => {
        if (!row) return res.status(404).json({ error: "Vehículo no encontrado" });

        const exitTime = new Date();
        const billing = BillingService.calculateFee(new Date(row.entryTime), exitTime);
        const invoice = BillingService.generateInvoice({ ...row, exitTime, ...billing });

        // Borrar de la base de datos al salir
        db.run(`DELETE FROM entries WHERE plate = ?`, [plate.toUpperCase()], () => {
            res.json({ billing, invoice_print_format: invoice });
        });
    });
};

module.exports = { registerEntry, processExit };