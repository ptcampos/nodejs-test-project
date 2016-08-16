'use strict';

const express = require('express'),
    app = express();


// Mounting the API to the current version (path)
app.use('/', function (req, res) {
    res.send({});
});

app.listen(9000, function () {
    console.log(' The app is up on port: ', 9000);
});
