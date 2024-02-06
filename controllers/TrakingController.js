
const { Request, Response } = require('express');
const CryptoJS = require('crypto-js');

var responseManager = require('../managers/responseManager');
var errorManager = require('../managers/errorManager');
const sqlDriver = require('../database/SQLDriver');

const jwt = require('jsonwebtoken');

const FILENAME = 'TrakingController.js';

const secretKey = 'ph3VLP5ad3xlqlt5wsO';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readShipment = async function (req, res) {
    const functionname = 'readShipment';
    try {
        const { s_guideNumber } = req.body;
        const pool = await sqlDriver.getPool();
        let query = `SELECT * FROM r_Shipment rs 
        WHERE rs.s_guideNumber  = '${s_guideNumber}'`;
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
