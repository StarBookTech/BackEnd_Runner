'use strict'

var express = require('express');

const ProductController = require('../controllers/ProductsController');
const ClientsController = require('../controllers/ClientsController');
const VerifyController = require('../controllers/UsersController');
const AppointmentController = require('../controllers/AppointmentController');


var router = express.Router();

/** Ruta default */
router.get('/', (req, res)=> {
    console.log('test')
    res.status(200).send('exitoso')
});

//*Routas appointment APIs */
router.get('/api/readAllAppointment', AppointmentController.readAllAppointment)
router.put('/api/setAppointment', AppointmentController.setAppointment)


//*Routas productos APIs */
router.get('/api/readAllProducts', ProductController.readAllProduct)

//*Routas productos APIs */
router.get('/api/readAllClients', ClientsController.readAllClients)
router.post('/api/createClients', ClientsController.createClient)
router.put('/api/deleteClient', ClientsController.deleteClient )


//*Routas users APIs */
router.post('/api/verifyUser', VerifyController.verifyUser)

module.exports = router;
