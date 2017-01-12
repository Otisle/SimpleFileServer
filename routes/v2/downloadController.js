var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var Files = require('../../model/schema');

var router = express.Router();

router.get('/:filename', function (req, res, next) {
    if (req.params.filename) {
        Files.findOne({ filename: req.params.filename }, function (error, file) {
            if (file) {
                console.log(file);
                res.download(path.join(process.cwd(), 'resource', file.filename), file.originalname);
            } else {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            }
        })
    }
})

module.exports = router;