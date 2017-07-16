
var ticket = require("./../../../Models/tickets"),
    mongoose = require("mongoose"),
    moment = require("moment"),
    bluebird = require("bluebird");

var findMovieWithHighestBuyers = (type,options) => {
    return new bluebird((resolve, reject) => {
        ticket.aggregate(
           [
                {
                    $match:{
                            time: { $gt :  options.fromDate , $lt : options.toDate },
                            "slot.city": "chennai",
                            "type": type,
                            "isenabled":true
                        }
                },
                {$group:{_id:{"movie":"$slot.movie","type":"$slot.type"},hour:{$avg:{$hour:"$time"}}, count:{$sum:"$slot.ticketcount"}}},
                {$project:{"movie":"$_id.movie","type":"$_id.type","hour":"$hour",count:"$count","_id":false}},
                {$sort: {count:-1}},
                {$limit:1}
            ]
        ).exec((err, doc) => {
            if(err){
                reject({error:err});
            }
            else{
                resolve({type:type, result: doc, type: 'legend'});
            }
        });
    });
}

findTrend = (options) => {
    return new bluebird((resolve, reject) => {
        ticket.aggregate(
          [
                {
                    $match:{
                            time: { $gt :  options.fromDate , $lt : options.toDate },
                            "slot.city": "chennai"
                        }
                },
                {$group:{_id:{"movie":"$slot.movie","type":"$slot.type",
                        year : { $year : "$time" },        
                        month : { $month : "$time" },        
                        day : { $dayOfMonth : "$time" },
                 }, count:{$sum:"$slot.ticketcount"},date:{$min:"$time"}}},
                {$project:{"movie":"$_id.movie","type":"$_id.type",minDate:"$date"
                ,count:"$count",date:{
                    year: "$_id.year",
                    month: "$_id.month",
                    day: "$_id.day",
                },"_id":false}},
                {$sort: {count:-1}}
            ]
        ).exec((err, doc) => {
            if(err){
                reject({error:err});
            }
            else{
                resolve({result: doc, type: 'graph'});
            }
        });
    });
};

module.exports = {
    getAllData : (req, res) => {
        var fromDate = new Date(), toDate = moment(fromDate).add(5, "days").endOf("day").toDate();
        
        if(req.query.fromDate){
            try{
                fromDate = moment(req.query.fromDate).toDate();
            }
            catch(e){
                fromDate = new Date()
            }
        }

        if(req.query.fromDate){
            try{
                toDate = moment(req.query.toDate).endOf("day").toDate();
            }
            catch(e){
                toDate = moment(fromDate).add(5, "days").toDate();
            }
        
        }

        var jobs = [
                        findMovieWithHighestBuyers("buy",{fromDate,toDate}), 
                        findMovieWithHighestBuyers("sell",{fromDate,toDate}),
                        findTrend({fromDate,toDate})
                    ], 
                    resultData = [];
        bluebird.mapSeries(jobs, (data) => {
            resultData.push(data);
        },
        (data) => {
            resultData.push(data);
        })
        .catch(()=>{
            res.status(500).json(resultData);
        })
        .then(()=>{
            res.json(resultData);
        },
        ()=>{
            res.status(500).json(resultData);
        });
    }
};