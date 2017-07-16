var app = require('express')(),
    chart = require('./controller/chart');

app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/data/:chart', chart.getAllData);

module.exports = app;