var app = require('express')(),
    chart = require('./controller/chart');

app.get('/', (req, res)=>{
    res.render('index',{isAuthenticated: req.session.user});
});

app.get('/auth/success', function(req, res) {
    req.session.user = true;
    res.redirect('/');
});

app.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/');
});

app.get('/auth/error', function(req, res){
   console.log(">>> Error");
   res.redirect('/');
});

app.get('/data/:chart', chart.getAllData);

app.all("*",(req, res) => {
    res.redirect("/");
});

module.exports = app;