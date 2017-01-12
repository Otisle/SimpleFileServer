var express = require('express');

var POST = require('./uploadController');
var GET = require('./downloadController');
var DELETE = require('./deleteController');

var router = express.Router();

router.post('/*', POST);

router.get('/*', GET);

router.get('/*', DELETE);

module.exports = router;