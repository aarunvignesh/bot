var express = require('express'),
    body = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    app = express(),
    routes = require('./Routes'),
    settings = require('./settings.json'),
    session = require('express-session'),
    passport = require('passport'),
    cookie = require('cookie-parser'),
    appAuthentication = require('./Shared/passport');

app.use(session({
    secret: 'moviebotAwsChallenge',
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure:false,
        maxAge:3 * 60 * 60 * 1000
    }
}));
app.use(cookie());
var passportInstance = passport;
app.use(passportInstance.initialize());
app.use(passportInstance.session());
appAuthentication(passportInstance);

app.get('/authenticate', passportInstance.authenticate('google', { 
    scope: 'email profile',
    successRedirect: '/auth/success',
	failureRedirect: '/auth/error'
}));

function dburlformatter(db){
    var dbstring = '';
    if(db.username && db.password){
        dbstring += db.username +':'+ db.password + '@';
    }
    dbstring += db.url + ':' + db.port + '/' + db.database;
    return 'mongodb://'+dbstring;
};

mongoose.connect(dburlformatter(settings.db));

mongoose.connection.on('connected',function(){
    console.log('Mongoose connected successfully');
});

app.use(body.urlencoded({extended: true}));
app.use(body.json());
app.set('views', path.resolve(__dirname,'Views'));
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(routes);

app.listen(settings.port,function(){
    console.log('----------------------');
    console.log('Server started at '+settings.port);
    console.log('----------------------');
});


