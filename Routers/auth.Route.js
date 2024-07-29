const express = require('express')

const authRoute = express.Router();


const {register, login,
       } = require('../Controllers/auth.Controller')


authRoute.post('/signup', register);
authRoute.post('/login', login);





module.exports = authRoute;