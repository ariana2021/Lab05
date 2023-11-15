const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader)
    if(typeof bearerHeader !== 'undefined'){
        bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendFile('error.html', { root: __dirname + '/../../public' });
    }
}

module.exports = verifyToken