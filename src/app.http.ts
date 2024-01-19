
import http from "http";
import fs from "fs";

const server = http.createServer( (request, response) => {
    console.log(request.url);

    // response.writeHead(200, { "Content-Type": "text/html" });
    // response.write(`URL: ${request.url}`);
    // response.end();

    // const data = { name: "Dani", age: 41, city: "Malaga"};
    // response.writeHead(200, { "Content-Type": "application/json" });
    // response.end( JSON.stringify( data ));

    if ( request.url === '/' ) {

        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end( htmlFile );
        return;
    } 
    // else {

    //     response.writeHead(404, { "Content-Type": "text/html" });
    //     response.end();

    // }; 
    
    if ( request.url === '/css/styles.css' ) {

        const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8');
        response.writeHead(200, { "Content-Type": "text/css" });
        response.end( cssFile );
        return;
    };

    if ( request.url === '/js/app.js' ) {

        const jsFile = fs.readFileSync('./public/app.js', 'utf-8');
        response.writeHead(200, { "Content-Type": "application/javascript" });
        response.end( jsFile );
        return;
    }; 

    // Fernando's Way
    // if ( request.url?.endsWith(".js") ) {
    //     response.writeHead(200, { "Content-Type": "application/javascript" });
    // } else if ( request.url?.endsWith(".css") ) {
    //     response.writeHead(200, { "Content-Type": "text/css" });
    // }; 

    // const responseContent = fs.readFileSync(`./public${ request.url }', 'utf-8`);
    // response.end( responseContent );

});

server.listen( 8080, () => {
    console.log("Server running on port 8080.");
    
});


