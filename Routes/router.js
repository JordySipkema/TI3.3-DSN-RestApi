var express       = require('express');
var router        = express.Router();

var measurements  = require('./measurement.js');
var sensors       = require('./sensor.js');
var nest          = require('./nest.js');

// GET Routes = retrieve values
router.get('/api/measurements/', measurements.getAll);
router.get('/api/sensors/', sensors.getAll);
router.get('/api/sensors/:id/measurements/', measurements.getBySensorId);
router.get('/api/sensors/:id', sensors.get);
router.get('/api/nest/last', nest.last);

// POST Routes = insert values

// PUT Routes = update values

// DELETE Route = delete values


//router.get('/api/nest/fetch', require('./nest.js').fetch);

module.exports = router;