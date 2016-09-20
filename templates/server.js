var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

exec('node ./twitter-proxy.js', function(error, stdout, stderr) {
	if (error !== null) {
        console.log('exec error: ', error);
    }
});


exec('node ./express.js', function(error, stdout, stderr) {
    if (error !== null) {
        console.log('exec error: ', error);
    }
    
});
