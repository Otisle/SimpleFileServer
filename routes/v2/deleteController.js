var express = require('express');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var Files = require('../../model/schema');

var router = express.Router();

router.delete('/:filename', function (req, res, next) {
    if (req.params.filename) {
        Files.findOne({ filename: req.params.filename }, function (error, file) {
            if (file) {
                console.log(file);
                Files.remove({ filename: req.params.filename }, function (err) {
                    if (err) {
                        return handleError(err);
                    } else {
                        fs.unlink(path.join(process.cwd(), 'resource', req.params.filename), function (err) {
                            if (err) {
                                return handleError(err)
                            } else {
                                res.json({
                                    status: 'SUCCESS'
                                });
                            }
                        })
                    }
                });
            } else {
                return handleError(err);
            }
        })
    }
})

module.exports = router;