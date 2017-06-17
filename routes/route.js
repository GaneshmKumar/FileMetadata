'use strict';

var express = require('express');
var multer  = require('multer');
var upload = multer({dest: __dirname + '../upload'});
var path = require('path');
var fs = require('fs');

var router = express.Router();

router.get('/', function (req, res) {
    res.set({'Content-Type': 'text/html'});
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

var fileSize = {};
router.post('/upload', upload.single('file'), function (req, res) {
    fileSize.size = req.file.size;
    console.log(req.file);
    fs.unlinkSync(path.join(__dirname + '../upload/' + req.file.filename));
    res.set({'Content-Type': 'application/json'});
    res.send(JSON.stringify(fileSize));
});

module.exports = router;