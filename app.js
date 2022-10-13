const express = require("express");
const { engine } = require("express/lib/application");
const { render, json } = require("express/lib/response");
const morgan = require("morgan");
const path = require("path");
const app = express();
const session = require('express-session'); 

app.use(session({
    secret: '123',
    resave: true,
    saveUninitialized: true 
}))

app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express(json));

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views/'));

app.use(require('./router/routes'));
app.use((err, req, res, next) => {
    res.send({ err: err.message });
});

app.listen(app.get('port'), () => {
    console.log("Se esta ultilizando el puerto",app.get('port'));
});