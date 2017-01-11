var express = require('express');
var fs = require('fs');
var multiparty = require('connect-multiparty');
var uuid = require('uuid-lib');

var router = express.Router();
var middleware = multiparty();

router.post('/', middleware, function (req, res) {
    var fileObj = req.files[Object.keys(req.files)[0]];

    fs.readFile(fileObj.path, function (err, data) {
        if (err) {
            fs.unlink(fileObj.path, function (err) { });

            return handleError(err);
        } else {
            //genarate file name with uuid
            var uuidFileName = uuid.create().value;
            var index = fileObj.originalFilename.lastIndexOf('.')
            var extension = fileObj.originalFilename.substring(index, fileObj.originalFilename.length)

            var newFileName = uuidFileName + extension
            
            fs.writeFile('resource/' + newFileName, data, function (error) { //把資料寫入檔案
                if (error) { //如果有錯誤，把訊息顯示並離開程式
                    console.log('檔案寫入錯誤');
                } else {
                    res.json({
                        old: fileObj.originalFilename,
                        new: newFileName
                    })
                }
                fs.unlink(fileObj.path, function (err) { });
            });
        }
    })
    console.log(req.body, req.files);
    // don't forget to delete all req.files when done

});

module.exports = router;