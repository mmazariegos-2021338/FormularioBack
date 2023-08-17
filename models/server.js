const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');
const estudiantesRoutes = require('../routes/estudiantes'); 
const { validarCampos } = require('../middlewares/validarCampos');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT 

        this.paths = {
            inscripcion: '/api/inscripcion',
            // ... (otras rutas)
        };

        this.conectarDB();
        this.middlewares(validarCampos);
        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {

        
       
        this.app.use('/api/inscripcion', estudiantesRoutes
        );
        // ... (otras rutas)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;

