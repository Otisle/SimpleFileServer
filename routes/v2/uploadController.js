var express = require('express');
var fs = require('fs');
var uuid = require('uuid-lib');
var multer = require('multer')
var mongoose = require('mongoose');
var Files = require('../../model/schema');

var router = express.Router();
var upload = multer({ dest: 'resource/' }).array('files', 100);

router.post('/', upload, function (req, res, next) {
    saveFiles(req, res, function (error, message) {
        var strStatus = '';

        if (!error) {
            strStatus = 'SUCCESS';
        } else {
            strStatus = 'ERROR';
        }

        res.json({
            status: strStatus,
            list: message
        });
    });
})

function saveFiles(req, res, cb) {
    var fileNameDict = {};

    Object.keys(req.files).forEach(function (key) {
        // console.log(req.files[key]);
        fileNameDict[req.files[key].originalname] = req.files[key].filename;
        // fileNameDict.push({
        //     key: req.files[key].originalname,
        //     value: req.files[key].filename
        // });

        new Files({
            originalname: req.files[key].originalname,
            mimetype: req.files[key].mimetype,
            filename: req.files[key].filename,
            path: req.files[key].path,
            size: req.files[key].size,
            uploadedtime: Math.floor(Date.now() / 1000)
        }).save(function (err) {
            if (err) {
                cb(true, ['Database saving ERROR']);
            } else {
                upload(req, res, function (err) {
                    if (err) {
                        cb(true, ['File saving ERROR']);
                    }
                })
            }
        });
    })
    cb(false, fileNameDict);
}

module.exports = router;