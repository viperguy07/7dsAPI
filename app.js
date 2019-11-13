const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const usersRoutes = require('./api/routes/users');

mongoose.connect(
    'mongodb+srv://7dsgApi_7666:'+ 
    process.env.MONGO_PW +
    '@aztk-cluster-frqjo.mongodb.net/test?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Oring, X-Requested-With, Content-Type, Accept, Authorization"
        );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATH, DELETE');
        return res.status(200).json({});
    }
    next();
})

// Routes that handle request
app.use('/users', usersRoutes);

// Handle Errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;