import jwt from "jsonwebtoken";

function authenticateToken(req, res, next){
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

export default authenticateToken;