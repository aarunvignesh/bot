var express = require('express'),
    body = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    app = express(),
    routes = require('./Routes'),
    settings = require('./settings.json');

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


