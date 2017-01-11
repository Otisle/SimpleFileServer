var express = require('express');
var mime = require('mime');
var fs = require('fs');
var path = require('path');
var router = express.Router();

var download = router.route('/:filename')

download.get(function (req, res) {
    if (req.params.filename) {
        var fileName = req.params.filename;

        console.log(fileName);
        console.log(mime.lookup(fileName));
        console.log(path.join(process.cwd(), 'resource', fileName));

        //TODO: what is MIME?
        var mimeType = mime.lookup(fileName);

        res.writeHead(200, { 'Content-Type': mimeType });
        
        var fileStream = fs.createReadStream(path.join(process.cwd(), 'resource', fileName));

        //TODO: res檔名修正
        fileStream.on('data', function (data) {
            res.write(data);
        });

        fileStream.on('end', function () {
            res.end();
        });
    }
})

module.exports = router;
