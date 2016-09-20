// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
app.use(express.static('angular'));
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    next(); 
});

router.get('/', function(req, res) {
	
    res.sendFile(path.join(__dirname + '/angular/index.html'));
});

app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Our server started at port : ' + port);
