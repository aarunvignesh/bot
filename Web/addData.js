var shortId = require("shortid"),
tickets = require("./Models/tickets"),
mongoose = require("mongoose"),
Bluebird = require("bluebird"),
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

bookTickets = (index)=>{
    return new Bluebird((resolve, reject) => {
        var types = ["buy","sell"], 
        movies = ["spiderman homecoming", "dunkirk", "boss baby", "cars 3","wonder woman","despicable me 3", "baby driver","the fate of the furious"],
        theatres = ["palazzo cinemas", "sathyam cinemas", "pvr cinemas", "luxe cinemas", "inox cinemas"],
        sampleData = {
            "type" : "sell",
            "time" : new Date("2017-07-25T12:30:00.000Z"),
            "userId" : "d5w9yubonokyti6u7l792ulqkys7hmkj",
            "slot" : {
                "type" : "sell",
                "email" : "a.s.arunvignesh@gmail.com",
                "name" : "arun",
                "showDate" : "2017-06-22",
                "showTime" : "05:00",
                "city" : "chennai",
                "movie" : "shivam",
                "ticketcount" : 2,
                "theatre" : "shiva"
            },
            "isenabled" : true,
            "referCount" : 5
        };
        sampleData.type =  types[Math.ceil(Math.random() * 1000) % 2];
        sampleData.slot.type = sampleData.type;
        sampleData.slot.movie =  movies[Math.ceil(Math.random() * 1000) % 8];
        sampleData.slot.theatre =  theatres[Math.ceil(Math.random() * 1000) % 5];
        sampleData.uniqueId = shortId.generate();
        sampleData.createdAt = new Date();
        var ticketSchema = new tickets(sampleData);
        ticketSchema.save((err, doc)=>{
            resolve(doc);
        });
    });
};

var promise = [];
mongoose.connection.on('connected',function(){
    console.log('Mongoose connected successfully');
    for(var i=0;i<2000; i++){
       promise.push(bookTickets(i));
   }
   Bluebird.mapSeries(promise, function(doc){
       console.log(doc.slot.movie);
   });
});



