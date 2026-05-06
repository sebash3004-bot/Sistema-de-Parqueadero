/**
 * Servicio de Facturación y Cálculo de Tarifas
 * Requerimiento: Cálculo basado en permanencia y opción de facturación.
 */
class BillingService {
    constructor() {
        this.RATE_PER_MINUTE = 100; // Ejemplo: $100 COP por minuto
    }

    calculateFee(entryTime, exitTime) {
        const diffInMs = exitTime - entryTime;
        const diffInMinutes = Math.ceil(diffInMs / (1000 * 60));
        
        // El sistema no permite tarifas independientes del tiempo (Req No Funcional)
        const totalAmount = diffInMinutes * this.RATE_PER_MINUTE;
        
        return {
            minutes: diffInMinutes,
            total: totalAmount
        };
    }

    generateInvoice(data) {
        // Estructura de factura para impresión (Req Funcional)
        return `
        ======= FACTURA DE COBRO =======
        Vehículo: ${data.plate}
        Entrada: ${data.entryTime}
        Salida: ${data.exitTime}
        -------------------------------
        Tiempo total: ${data.minutes} min
        Método de Pago: ${data.paymentMethod}
        TOTAL A PAGAR: $${data.total}
        ===============================
        `;
    }
}

module.exports = new BillingService();