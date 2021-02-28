/*In this lesson you will learn about the Express framework that enables implementing and deploying
powerful web servers based on Node. At the end of this lesson, you will be able to:

Implement a web server using the Express framework
Develop a web server that supports a REST API
Use Express router to implement support for the REST API*/

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { runInNewContext } = require('vm');

const dishRouter = require('./routes/dishRouter'); //file based node module
const hostname = 'localhost';
const port = 3000;

// app will be using express, morgan and body-parser
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json())

//Mounting a router by endpoint. Any req coming to /dishes will be handled by dishRouter
app.use('/dishes', dishRouter);

//serves the static files from the public folder (__dirname = rootfolder of this app). 
// Index.html is served on localhost:3000/
// aboutus.html is served on localhost:3000/aboutus.html
// none of the files is served on localhost:3000/aboutus.txt (wrong fileformat). Only the regular res.end(<html>.... this is and Express Server....</html>)
app.use(express.static(__dirname+'/public'))

// next is used to invoke middleware, optional param
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
})

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})