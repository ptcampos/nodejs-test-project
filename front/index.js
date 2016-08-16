'use strict';

const express = require('express'),
    app = express();


// Mounting the API to the current version (path)
app.use('/', function (req, res) {
    res.send('Here be dragons');
});

app.listen(9001, function () {
    console.log(' The app is up on port: ', 9001);
});
