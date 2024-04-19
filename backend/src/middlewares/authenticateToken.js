const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    console.log("AUTH");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) 
        return res.sendStatus(401);

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED TOKEN", decodedToken);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.log("ERROR", error);
        return res.sendStatus(401);
    }
}

module.exports = authenticateToken;