const { validationResult } = require('express-validator')

function serverValidation(req, res, next) {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    next();
}

module.exports = serverValidation;