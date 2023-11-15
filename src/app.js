const express = require('express');
const router = require('./controllers/authController')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.all('/user',(req, res, next) => {
    console.log('Por aqui pasamos');
    next();
});

app.use('/',router)
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000,  http://localhost:3000/')
})