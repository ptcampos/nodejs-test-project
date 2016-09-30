'use strict';

const path = require('path'),
	express = require('express'),
    app = express(),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

//require models....
require('./models/user.server.model'),
require('./models/time-record.server.model');

// Connect to MongoDB
var db = mongoose.connect('mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/work-report-app', function(err) {
	if (err) {
		console.log('Could not connect to MongoDB!');
	}
});

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'WORK REPORT',
    cookie: {
      secure: false
    },
    store: new MongoStore({
      mongooseConnection: db.connection,
      collection: 'sessions'
    })
}));

require('./config/passport-initialize.server.config')(app);

//require routes...
require('./routes/user.server.routes')(app);
require('./routes/time-record.server.routes')(app);

// Mounting the API to the current version (path)
app.get('/', function (req, res) {
    res.sendFile( path.resolve('front/views/index.html') );
});

app.use('/js', express.static( path.resolve('front/js') ));
app.use('/css', express.static( path.resolve('front/css') ));
app.use('/components', express.static( path.resolve('bower_components') ));
app.use('/views', express.static( path.resolve('front/views') ));

app.listen(9000, function () {
    console.log(' The app is up on port: ', 9000);
});
