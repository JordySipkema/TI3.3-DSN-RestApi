var validator = require("../Validator/basic.js");

var sensors = {
    getAll: function(req, res) {
        req.app.get('DB:pool')
            .query('SELECT * from sensor;', function (err, rows, fields) {
                res.json(rows);
            });
    },
    get: function (req, res) {
        var id = req.params.id;
        validator.validateId(id, res, null);

        req.app.get('DB:pool')
            .query('SELECT * from sensor WHERE id = ?', [id], function (err, rows, fields) {
                res.json(rows);
            });
    }
};

module.exports = sensors;