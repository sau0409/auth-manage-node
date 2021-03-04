require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authApis = require("./routes/authApi.js");
const dataApis = require("./routes/dataApi.js");
const jwt = require("jsonwebtoken");

//create express app
const app = express();

//setting up middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setting up routes
app.use('/auth', authApis)
app.use('/resources',autheticateToken, dataApis)

//check server status
app.get('/serverstatus', (req, res) => {
    console.log('checking server status')
    res.sendStatus(200);
    res.end();
});

//setting up webpages
app.use(express.static(__dirname+'/public'))
app.set('view-engine', 'ejs');
app.set('views', __dirname+'/public/views');
app.get('/', (req,res) => {
    if(req.query.userId) {
        res.render('index.ejs', req.query)
    }
    else {
        res.redirect('/signin')
    }
});
app.get('/signin', (req,res) => {
    res.render('signin.ejs', {test: 'saurabh'})
});
app.get('/signup', (req,res) => {
    res.render('signup.ejs', {test: 'saurabh'})
});
app.get('/deleteUser', (req,res) => {
    res.render('deleteUser.ejs', {test: 'saurabh'})
});


function autheticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        res.status(401);
        res.end();
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403);
        req.user = user;
        next();
    });
}



//starting server
const server = app.listen(process.env.PORT || 5000, ()=> console.log("Server started"));
