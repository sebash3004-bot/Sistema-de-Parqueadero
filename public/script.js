const API_URL = 'http://localhost:3000/api/v1/parking';

document.getElementById('entry-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        user: { name: document.getElementById('user-name').value },
        vehicle: { 
            plate: document.getElementById('vehicle-plate').value,
            type: document.getElementById('vehicle-type').value
        },
        paymentMethod: document.getElementById('payment-method').value
    };

    try {
        const response = await fetch(`${API_URL}/entry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.status === 403) {
            alert(`⚠️ ALERTA DE SEGURIDAD: ${result.message}`);
        } else {
            alert('✅ Registro exitoso. Scanner de seguridad: Limpio.');
        }
    } catch (error) {
        alert('Error conectando con el servidor');
    }
});

async function processExit() {
    const plate = document.getElementById('exit-plate').value;
    if (!plate) return alert('Ingrese una placa');

    try {
        const response = await fetch(`${API_URL}/exit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plate })
        });

        const result = await response.json();
        
        if (response.ok) {
            const invoiceSec = document.getElementById('invoice-section');
            invoiceSec.classList.remove('hidden');
            document.getElementById('invoice-content').textContent = result.invoice_print_format;
        } else {
            alert(result.error || 'Error al procesar');
        }
    } catch (error) {
        alert('Error en la comunicación');
    }
}