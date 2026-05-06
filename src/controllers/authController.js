const SecurityService = require('../services/securityService');
const BillingService = require('../services/billingService');

// Simulación de base de datos en memoria para garantizar consistencia en esta fase
const activeRegistries = new Map();

const registerEntry = async (req, res) => {
    try {
        const { user, vehicle, paymentMethod } = req.body;

        // 1. Scanner de seguridad (Requerimiento Funcional)
        const securityCheck = await SecurityService.scanVehicle(vehicle.plate);
        if (!securityCheck.safe) {
            return res.status(403).json({ 
                alert: "SECURITY_BREACH", 
                message: "Vehículo reportado como robado. Protocolo anti-robos activo." 
            });
        }

        // 2. Registro de entrada
        const entryData = {
            username: user.name,
            plate: vehicle.plate.toUpperCase(),
            entryTime: new Date(), // Hora detectada por el sistema
            paymentMethod: paymentMethod || 'Efectivo'
        };

        activeRegistries.set(entryData.plate, entryData);

        res.status(201).json({ message: "Entrada registrada", data: entryData });
    } catch (error) {
        res.status(500).json({ error: "Error en el registro de entrada" });
    }
};

const processExit = async (req, res) => {
    try {
        const { plate } = req.body;
        const record = activeRegistries.get(plate.toUpperCase());

        if (!record) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        const exitTime = new Date();
        
        // 3. Cálculo de tarifa (Requerimiento Funcional: basado en permanencia)
        const billing = BillingService.calculateFee(record.entryTime, exitTime);
        
        // 4. Generación de factura (Requerimiento Funcional: opción de imprimir)
        const invoice = BillingService.generateInvoice({
            ...record,
            exitTime,
            ...billing
        });

        activeRegistries.delete(plate.toUpperCase());

        res.status(200).json({
            message: "Salida procesada",
            billing,
            invoice_print_format: invoice
        });
    } catch (error) {
        res.status(500).json({ error: "Error al procesar salida" });
    }
};

module.exports = { registerEntry, processExit };