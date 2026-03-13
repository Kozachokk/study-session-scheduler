import jwt from "jsonwebtoken";
import db from "./db.js"

export function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        console.log("token doesnt exits");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            res.status(403).send("Invalid or expired token!");
        }

        req.user = decoded;
        next();
    })
}

export function setTokenVersion(token, email){
    const incrementTokenVersion = db.prepare(`UPDATE student SET token_version = ? WHERE email = ?`);
    incrementTokenVersion.run(token + 1, email);
    console.log("Update token to: " + token);
}

export function generateJWTokens(sub, role, token_version){
    const payload = { user: sub, role: role, token_version: token_version };
    const accesstoken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '15m'
    });

    const refreshtoken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    return { accesstoken: accesstoken, refreshtoken: refreshtoken };
}