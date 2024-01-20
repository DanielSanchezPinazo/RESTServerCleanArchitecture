import { request } from 'http';

import express, { Router } from "express";
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
    routes: Router;
};

export class Server {

    private app = express();
    private readonly port: number; // a los readonly sólo se les pueden asignar valores en el constructor, además de al declararlos
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor( options: Options ) {
        const { port, routes, public_path = "public" } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    };

    async start() {

        this.app.disable('x-powered-by');

        //* Middlewares
        this.app.use( express.json() );// Esto permite el formato raw
        this.app.use( express.urlencoded({ extended: true })); // Esto permite el formato x-www-form-urlencoded

        //* Public Folder
        this.app.use( express.static( this.publicPath ));

        //* Routes
        this.app.use( this.routes );

        //* Ayuda al Router de las SPA
        this.app.get("*", ( request, response ) => {

            const indexPath = path.join( __dirname + `../../../${this.publicPath}/index.html` );
            response.sendFile( indexPath );
            return; //optional
        });

        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });        
    };
};



