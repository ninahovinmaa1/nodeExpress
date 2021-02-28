const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

//Mini-app for each router area, such as /dishes using Exporess router. each method chained, path removed. 
//Mounted in the index.js

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details ' + req.body.description); //expects json in the res body {"name": "soup", "description": "delicious asian fish soup"}
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req,res,next) => {
    res.end('Deleting all the dishes!');
})

.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish ' + req.params.dishId + ' to you!');
})

//assumed that /dishes/23 already exists, created in app.post('/dishes, (req,res)....), soup
.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
})

.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId) + '\n';
    res.end('Will update the dish: ' + req.body.name + 'with details ' + req.body.description);
})

.delete('/dishes/:dishId', (req,res,next) => {
    res.end('Deleting dish: ' + req.parans.dishId);
});

module.exports = dishRouter;