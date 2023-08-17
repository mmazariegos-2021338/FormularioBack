// Cargar variables de entorno desde archivo .env
require('dotenv').config();

// Importar la configuración del servidor desde './models/server'
const Server = require('./models/server');

// Crear una instancia del servidor
const servidorIniciado = new Server();

// Iniciar el servidor
servidorIniciado.listen();
