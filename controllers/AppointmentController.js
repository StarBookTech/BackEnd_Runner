var randomstring = require('randomstring');
var moment = require('moment');
var crypto = require('crypto-js');
var mongoose = require('mongoose');
const { Request, Response, NextFunction } = require('express');
const { CustomError } = require('../types/CustomError');

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('data/Configuration.js');
var configuration = require(filePath);
var responseManager = require('../managers/responseManager');
var errorManager = require('../managers/errorManager');
var utils = require('../managers/utilManager');
const CONFIG = require('../config/config');
const { encriptacion } = require('../config/config');
const sqlDriver = require('../database/SQLDriver');

const FILENAME = 'AppointmentController.js';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllAppointment = async function (req, res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllAppointment';

    try {

        const pool = await sqlDriver.getPool();
        const currentDate = new Date();

        let query = `SELECT * FROM clients
            WHERE YEAR(c_nextappointment) = ${currentDate.getFullYear()}
            AND MONTH(c_nextappointment) = ${currentDate.getMonth() + 1}
            ORDER BY DAY(c_nextappointment) ASC `;
        const result = await pool.request().query(query);
        return responseManager.sendResponseWithDocument(res, {
            status: 200,
            msg: 'success',
            data: result.recordset
        });
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.setAppointment = async function (req, res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'setAppointment';
    try {
        console.log('enel servicio')
        console.log(req.body)
        const { client_id, c_lastappointment, c_nextappointment } = req.body;
        const pool = await sqlDriver.getPool();
        let query = `UPDATE clients
        SET c_lastappointment = '${c_lastappointment}', c_nextappointment = '${c_nextappointment}'
        WHERE client_id = ${client_id}`;
        const result = await pool.request().query(query);
        return responseManager.sendResponseWithDocument(res, {
            status: 200,
            msg: 'success',
            data: []
        });
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.updateProductType = async function (req, res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'updateProductType';
    try {
        const data = req.body;
        const pool = await sqlDriver.getPool();
        let query = `UPDATE inv_TipoProducto  SET tprod_nombre = '${data.tprod_nombre}',  tprod_descripcion = '${data.tprod_descripcion}' WHERE tprod_tipoproducto = ${data.tprod_tipoproducto}`;
        const result = await pool.request().query(query);
        return responseManager.sendResponseWithDocument(res, result);
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}

exports.deleteClient = async function (req, res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'deleteClient';
    try {
        const { client_id } = req.body;
        const pool = await sqlDriver.getPool();
        let query = `DELETE FROM clients WHERE client_id = ${client_id}`;
        console.log(query);
        const result = await pool.request().query(query);
        return responseManager.sendResponseWithDocument(res, {
            status: 200,
            msg: 'success',
            data: []
        });
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}