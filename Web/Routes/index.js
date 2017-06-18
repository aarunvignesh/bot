
var app = require('express')(),
    bot = require('./bot');

app.use(bot);

module.exports = app;

