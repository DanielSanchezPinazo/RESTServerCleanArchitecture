import { request } from 'http';

import express from "express";
import path from 'path';

export class Server {

    private app = express();

    async start() {

        //* Middlewares

        //* Public Folder
        this.app.use( express.static( "public" ));

        this.app.get("*", ( request, response ) => {

            const indexPath = path.join( __dirname + "../../../public/index.html" );
            response.sendFile( indexPath );
            return; //optional
        });

        this.app.listen( 3000, () => {
            console.log(`Server running on port ${ 3000 }`);
        });        
    };
};



