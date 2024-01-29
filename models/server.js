const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.usersPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar BD
        this.connectDB();

        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json());

        //Directorio Publico
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/user'));
    }
    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running in ', this.port);
        });
    }
        
}

module.exports = Server;