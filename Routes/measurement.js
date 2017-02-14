var validator = require('../Validator/basic.js');

var measurements = {
    getAll: function(req, res) {
        req.app.get('DB:pool')
            .query('SELECT * from measurement;', function (err, rows, fields) {
                res.json(rows);
            });
    },
    getBySensorId: function(req, res){
        var sensor_id = req.params.id;
        validator.validateId(sensor_id, res, null);

        req.app.get('DB:pool')
            .query('SELECT * from measurement where sensor_id = ?;', [sensor_id], function (err, rows, fields) {
                res.json(rows);
            });
    }
};

module.exports = measurements;