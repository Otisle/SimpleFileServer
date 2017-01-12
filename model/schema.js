var mongoose = require('mongoose');

//Database Schema
var fileSchema = new mongoose.Schema({
    originalname: String,
    mimetype: String,
    filename: String,
    path: String,
    size: Number,
    uploadedtime: Number
});

var File = mongoose.model('files', fileSchema);

module.exports = File;