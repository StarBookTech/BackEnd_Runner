
const { Request, Response } = require('express');
const CryptoJS = require('crypto-js');

var responseManager = require('../managers/responseManager');
var errorManager = require('../managers/errorManager');
const sqlDriver = require('../database/SQLDriver');

const jwt = require('jsonwebtoken');

const FILENAME = 'CLientsController.js';

const secretKey = 'ph3VLP5ad3xlqlt5wsO';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.readAllClients = async function (req, res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'readAllClients';
    try {
        const pool = await sqlDriver.getPool();
        let query = `SELECT * FROM  clients`;
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

exports.createClient = async function (req, res) {
    var timeoutVoidTransactionId = Math.floor(Math.random() * (1000000000 - 1000 + 1) + 1000);
    const functionname = 'createClient';
    try {
        const { c_name, c_age, c_type, c_phone, c_lastappointment, c_nextappointment } = req.body;
        const pool = await sqlDriver.getPool();
        let query = `INSERT INTO clients  (c_name, c_age, c_type, c_phone, c_lastappointment, c_nextappointment) 
            VALUES ('${c_name}', ${c_age}, ${c_type}, ${c_phone}, '${c_lastappointment}', '${c_nextappointment}')`;
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

exports.verifyUser = async function (req, res) {
    const functionname = 'verifyUser';
    try {

        const { u_email, u_password } = req.body;
        const pool = await sqlDriver.getPool();
        let query = `SELECT * FROM cd_users cu 
        WHERE cu.u_email = '${u_email}'`;
        const result = await pool.request().query(query);
        var bytes = CryptoJS.AES.decrypt(result.recordsets[0][0].u_password, secretKey);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        
        if (originalText == u_password) {
            const token = jwt.sign({ u_email, u_password }, secretKey, {
                expiresIn: '16h',
            });

            return responseManager.sendResponseWithDocument(res, {
                status: 200,
                msg: 'success',
                data: [{ token }]
            });
        }
        return responseManager.sendResponseWithDocument(res, {
            status: 501,
            msg: 'error',
            data: []
        });
    } catch (error) {
        return errorManager.handleTransactionCatchClause(error, FILENAME, functionname, 500, res, 'Error en login');
    }
}