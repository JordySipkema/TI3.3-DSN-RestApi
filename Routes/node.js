/**
 * Created by jordysipkema on 27/03/2017.
 */

var request = require('request');
var moment = require('moment');
var validator = require('../Validator/basic.js');

var nodes = {
    ping: function(req, res) {
        var node_id = req.params.id;
        var heap_space = parseInt(req.body.heapspace);
        validator.validateId(node_id, res, null);

        var insert = [
          node_id, heap_space, (moment().format('YYYY-MM-DD HH:mm:ss'))
        ];

        req.app.get('DB:pool')
            .query('INSERT INTO heartbeat (`node_id`, `heapspace`, `timestamp`) VALUES (?)',
                [insert], function(err, rows){
                    if (err){
                        res.status(500);
                        res.json({
                            "result": "Error",
                            "message": err
                        });
                    }else { // success
                        res.status(200);
                        res.json({
                            "result": "Success"
                        });
                    }
                });
    },
    getNodeSensors: function(req, res) {
        var node_id = req.params.id;
        validator.validateId(node_id, res, null);

        req.app.get('DB:pool')
            .query('SELECT * from node;', function (err, rows, fields) {
                res.json(rows);
            });
    },
    getNodeInfo: function(req, res){
        var node_hex_id = '0x' + req.params.id;
        var node_id = parseInt(node_hex_id);

        validator.validateId(node_id, res, null);

        req.app.get('DB:pool')
            .query('SELECT id, name from node where hw_id = ?;', [node_id], function (err, rows, fields) {
                if (err || rows.length < 1) {
                    res.status(400);
                    res.json({
                        "status": "NOK",
                        "statusText": "Bad Request",
                        "id": 0
                    });
                } else {
                    res.status(200);
                    res.json({
                        "status": "OK",
                        "data": rows
                    });
                }
            });
    }
};

module.exports = nodes;