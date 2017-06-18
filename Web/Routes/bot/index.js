var app = require('express')(),
    settings = require('./../../settings.json'),
    ticket = require('./../../Models/tickets');

app.all('/bot/*',function(req,res,next){
    
    if(req.headers['x-token'] == settings.token){
        next();
    }
    else{
        res.status(401).json({
            code: 401,
            message: 'Unauthorized User!!!'
        });
    }
});

app.post('/bot/:type',function(req, res){
    var body = req.body, 
    ticketSchema = new ticket({userId : body.userId, type: body.type, slot: body});
    ticketSchema.save(function(err,doc){
        if(err){
            res.status(500).json({
                code:500,
                message:err
            }); 
        }
        else{
            res.status(200).json({
                code:200,
                message:'Shiva successfully saved'
            });    
        }         
    });
});

module.exports = app;