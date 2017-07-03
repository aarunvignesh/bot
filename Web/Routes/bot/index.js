var app = require('express')(),
    settings = require('./../../settings.json'),
    ticketCoordinator = require('./../../Shared/jobs'),
    shortid = require('shortid'),
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
    var body = req.body;
    body.uniqueId = shortid.generate();
    body.createdAt = new Date();
    var ticketSchema = new ticket(body);
    ticketSchema.save(function(err,doc){
        if(err){
            res.status(500).json({
                code:500,
                message:err
            }); 
        }
        else{
            switch(body.type.toLowerCase()){
                case 'sell':
                        ticketCoordinator.findBuyers(body);
                        break;
                case 'buy':
                        ticketCoordinator.findSellers(doc);
                        break;
            }
            res.status(200).json({
                code:200,
                id: doc.uniqueId,
                message:'Shiva successfully saved'
            });    
        }         
    });
});


app.post('/delete', function(req, res){
    var body = req.body;
    ticket.update({uniqueId: body.uniqueId, isenabled: true},{$set: {isenabled: false}})
        .exec(function(err, result){
            if(err){
                res.status(500).json(err)
            }
            else{
                res.status(200).json({
                    code: 200,
                    msg: 'Removed Successfully',
                    result : result
                });
            }
        });
});

module.exports = app;