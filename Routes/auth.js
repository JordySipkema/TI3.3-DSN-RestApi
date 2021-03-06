var jwt = require('jwt-simple');

var auth = {
    login: function(req, res) {

        var username = req.body.username || '';
        var password = req.body.password || '';

        // For now
        var loginName = process.env.REST_USER;
        var loginPass = process.env.REST_PASS;

        // Check for empty body
        if( username == '' || password == '' )
        {
            res.status(401);
            res.json( { "status": 401,
                "message":"Please identify yourself"
            });
            return;
        }

        // Check for valid user/passwd combo
        if ((username == loginName) && (password == loginPass)) {
            var now = new Date();
            var expires = now.setHours(now.getDay() + 10);
            var token = jwt.encode({
                iss: username,
                exp: expires
            }, process.env.APP_SECRET);

            res.status = 200;
            res.json({
                token: token,
                expires: expires,
                user: username
            });
        }
        else {
            res.status(401);
            res.json({
                "status": 401,
                "message":"Please identify yourself!"
            });
        }
    }
};

module.exports = auth;