
var app = require('express')(),
    bot = require('./bot'),
    core = require('./core');

app.use(bot);
app.use(core);

module.exports = app;

