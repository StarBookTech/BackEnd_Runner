'use strict'

var express = require('express');

const TrakingController = require('../controllers/TrakingController')


var router = express.Router();

/** Ruta default */
router.get('/', (req, res)=> {
    console.log('test')
    res.status(200).send('exitoso')
});

//*Routas traking APIs */
router.post('/api/readShipment', TrakingController.readShipment)


module.exports = router;
