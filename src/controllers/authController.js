const {Router} = require('express')
const jwt = require("jsonwebtoken");
const verifyToken = require('./verifyToken')
const user = require('../models/user')
const router = Router()
router.get('/', (req, res) => {
    res.sendFile('login.html', { root: __dirname + '/../../public' });
});

router.get('/register', (req, res) => {
    res.sendFile('register.html', { root: __dirname + '/../../public' });
});

router.post('/sinup', (req, res) => {

    console.log(`Post pagina de login ${req.body.username} `);
    console.log(`Post pagina de login ${req.body.password} `);
    
    if(`${req.body.username}` ===  user.username
           && `${req.body.password}` === user.password){
            console.log('Nombre: ' + `${req.body.username}` + ', Password: ' + `${req.body.password}`);
            const user = {
                nombre : `${req.body.username}`,
                password: `${req.body.password}`
            }
            jwt.sign({user: user}, 'secretkey', {expiresIn:'60s'}, (err, token) => { 
            console.log({token: token})
            res.sendFile('index.html', { root: __dirname + '/../../public' });
            });
    }
    else{
            return res.status(401).json({
                auth: false,
                message: 'No token provided'
            });
    }
    
});

router.post('/sinin', verifyToken, (req, res) => {

     jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendFile('error.html', { root: __dirname + '/../../public' });
        }else{
            res.sendFile('index.html', { root: __dirname + '/../../public' });
        }
    });

});


module.exports = router