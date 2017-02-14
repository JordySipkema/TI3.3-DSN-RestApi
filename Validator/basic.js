var validator = {
    validateId: function(id, res, next){
        next = next !== undefined ? next : "nothing";
        // Next is an optional parameter

        // Validate the request:
        if (isNaN(id)) {
            res.status(400);
            res.json( { "status": 400,
                "statusText": "Bad Request",
                "message":"id parameter is required and should be numeric."
            });
        }

        if (typeof(next) == 'function') { next(); }
        // Todo: implement overwriting the message.
    }
};

module.exports = validator;