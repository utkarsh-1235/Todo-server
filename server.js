require("dotenv").config();
const express = require('express');
const app = new express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const errorMiddleware = require('./Middleware/error.middleware');
const dbConnect = require('./Config/db');
const authRoute = require('./Routers/auth.Route');
const taskRoute = require("./Routers/task.route")


app.use(express.json()); // Built-in middleware

app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true })); //Third-party middleware

app.use(cookieParser());   // Third-party middleware

app.use(morgan('dev'));

const logRequest = (req, res, next) => {
    console.log('Request body:', req.body); // Log request body if it's a POST request
    
    // Call next middleware or route handler
    next();
  };
  
  // Attach middleware globally to log all requests
  app.use(logRequest);


app.use('/api/v1/users',authRoute);
app.use('/api/v1/tasks',taskRoute);

  
app.all('*',(req, res)=>{
    res.status(400).json('OOPS 404 not found')
})

app.use(errorMiddleware);






require('dotenv').config()


const port = process.env.PORT || 4001;


app.listen(port,async ()=>{
    //database connected
    await dbConnect();
    console.log(`server is running at https://localhost/${port}`)
})

module.exports = app;
