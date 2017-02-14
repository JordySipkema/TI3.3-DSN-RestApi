var request = require('request');
var moment = require('moment');

//var now = moment();  <--- hier stond het ._.

var nest = {
    lastJson: function(){
        // Nest consists of 4 parameters;
        req.app.get('DB:pool')
            .query('SELECT * from sensor WHERE id = ?', [id], function (err, rows, fields) {
                res.json(rows);
            });
        req.app.get('DB:pool')
            .query('SELECT * from sensor WHERE id = ?', [id], function (err, rows, fields) {
                res.json(rows);
            });
        req.app.get('DB:pool')
            .query('SELECT * from sensor WHERE id = ?', [id], function (err, rows, fields) {
                res.json(rows);
            });
        req.app.get('DB:pool')
            .query('SELECT * from sensor WHERE id = ?', [id], function (err, rows, fields) {
                res.json(rows);
            });
    },


    last: function (req, res){

    },
    fetch: function(req, res){
        var options = {
            "url": "https://developer-api.nest.com",
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + process.env.NEST_ATO
            }
        };

        function callback(error, response, body){
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                // 2 Temp, 3 Setting, 4, hum, 5 state

                var nestInfo = {
                    "temp": info.devices.thermostats.wnzSRyH0T9FBk21mvE08liM5puXAPSuW.ambient_temperature_c,
                    "setting": info.devices.thermostats.wnzSRyH0T9FBk21mvE08liM5puXAPSuW.target_temperature_c,
                    "hum": info.devices.thermostats.wnzSRyH0T9FBk21mvE08liM5puXAPSuW.humidity,
                    "heating": (info.devices.thermostats.wnzSRyH0T9FBk21mvE08liM5puXAPSuW.hvac_state == 'heating') ? 1 : 0
                };

                var now = moment().format('YYYY-MM-DD HH:mm:ss');
                console.log('Inserting new nest-values; Timestamp: ' + now);

                var sqlValues = [
                    [2, nestInfo.temp * 10, now],
                    [3, nestInfo.setting * 10, now],
                    [4, nestInfo.hum * 10, now],
                    [5, nestInfo.heating, now]
                ];

                req.app.get('DB:pool')
                    .query('INSERT INTO measurement (`sensor_id`, `data`, `timestamp`) ' +
                        'VALUES ?;', [sqlValues], function(err, rows, fields){
                        if (err) { console.log(err); }
                    });

                res.send(nestInfo);
            }
        }

        request(options, callback);
    }
};

module.exports = nest;