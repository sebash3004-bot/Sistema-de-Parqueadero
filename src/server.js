const app = require('./app'); // Al estar en la misma carpeta 'src', se usa ./app

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`[PREMIUM] Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`[INFO] Sistema anti-robos y Scanner activos.`);
});