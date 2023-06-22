const jwt = require("jsonwebtoken");
const {secret} = require("./config");


module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        };
    
        try{
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                res.status(400).json({message: "user is not logged"})
            };
            const {roles: userRoles} = jwt.verify(token, secret);
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                };
                if (!hasRole) {
                    return res.status(400).json({message: "the user does not have access rights"})
                }
            })
            next()
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "user is not logged"})
        }
    }
};