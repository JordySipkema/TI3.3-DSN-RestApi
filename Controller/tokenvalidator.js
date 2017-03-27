var jwt = require('jwt-simple');

module.exports = function (req, res, next) {

    var token = (req.header('X-Access-Token')) || '';
    console.log(token);

    if (token) {
        try {
            var decoded = jwt.decode(token, process.env.APP_SECRET);

            // Check if token is from known user
            // for now ..
            var userName = process.env.REST_USER;

            if( decoded.iss == userName) {
                req.app.set("userid", decoded.iss);
                console.log("Userid: " + req.app.get('userid'));
                return next();
            }
            else {
                res.status(401);
                res.json({
                    "status": 401, "message": "Please identify yourself - (EOT)"
                });
            }
        }
        catch (err) {
            console.log("Authorization failed: " + err);
        }
    }

    res.status(401);
    res.json({
        "status": 401, "message": "Please identify yourself - (EOT)"
    });
};