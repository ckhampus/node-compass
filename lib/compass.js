module.exports.stylesheetCompiler = function (options) {
    options = options || {}

    return function (req, res, next) {
        var spawn = require('child_process').spawn;
        
        var compass = spawn('compass', ['compile'], {cwd: process.cwd()});

        compass.stdout.setEncoding('utf8');
        compass.stdout.on('data', function (data) {
            console.log(data);
        });
        
        compass.stderr.setEncoding('utf8');
        compass.stderr.on('data', function (data) {
            console.log(data);
        });
        
        compass.on('exit', function (code) {
            if (code !== 0) {
                next(new Error('Could not compile stylesheets.'));
            }

            next();
        });
    };
};
