var express = require('express');
var MIME = require('mime');
var mongoose = require('mongoose');
var Files = require('../../model/schema');

var router = express.Router();

router.get('/:filename', function (req, res, next) {
    if (req.params.filename) {
        Files.findOne({ filename: req.params.filename }, function (error, file) {
            if (file) {
                console.log(file);
                let extension = MIME.extension(file.mimetype);

                res.json({
                    originalname: file.originalname,
                    mimetype: extension,
                    filename: file.filename,
                    size: file.size,
                    uploadedtime: file.uploadedtime
                });
            } else {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            }
        })
    }
})

router.get('/', function (req, res, next) {
    Files.find({}, function (error, files) {
        if (files) {
            // console.log(files);
            var fileList = [];
            Object.keys(files).forEach(function (key) {
                var file = files[key];
                let extension = MIME.extension(file.mimetype);
                file._id = undefined;
                file.__v = undefined;
                file.path = undefined;
                file.mimetype = extension;
                fileList.push(file);
            });
            
            res.json({
                status: 'SUCCESS',
                count: fileList.length,
                list: fileList
            });
        } else {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
    })
})

module.exports = router;