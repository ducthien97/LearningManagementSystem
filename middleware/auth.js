const config = require("config");
const jwt = require("jsonwebtoken");

function auth (req, res, next){
    const token = req.header("x-auth-token");
    if (!token){
        return (res.status(401).json({msg : "No token, user not authorized"}))
    }
    try{
        const decoded = jwt.verify(token, config.get("jwtSecret"))
        req.user = decoded;
        next();
    }
    catch(event){
        res.status(400).json({msg: "not valid token"})
    }
}
module.exports = auth;