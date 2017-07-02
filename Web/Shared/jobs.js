var tickets = require('./../Models/tickets'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    mail = require('./mail');

module.exports = {
    findBuyers: function(document){

        var dayStartTime = moment(new Date(document.time)).startOf('day');

        console.log({
                        time:{
                                $lt: new Date(document.time), 
                                $gt: dayStartTime.toDate()
                        }, 
                        isenabled: true,
                        type:'buy',
                        //referCount:{$lt:5}, 
                        'slot.movie':document.slot.movie.toLowerCase(),
                        'slot.ticketcount': document.slot.ticketcount,
                        //userId:{$ne:document.userId}
        });
        tickets.find({
                        time:{
                                $lt: new Date(document.time), 
                                $gt:dayStartTime.toDate()
                        }, 
                        isenabled: true,
                        type:'buy',
                      //  referCount:{$lt:5}, 
                        'slot.movie':document.slot.movie.toLowerCase(),
                        'slot.ticketcount': document.slot.ticketcount,
                        //userId:{$ne:document.userId}
        })
        .sort({$natural: -1})
        .exec(function(error, result){
            console.log("No. of users Found : "+result.length);
            if(error){

            }
            else if(result.length > 0 && result.length < 10){
                if(result.length > 5){
                    result = result.splice(0, 5);
                    mail.sendEmail(result, document).then(() => {
                        tickets.update({_id:{$in: result.map( (value) => mongoose.Types.ObjectId(value._id)) }},{$inc:{referCount: 1}},{multi: true})
                        .exec(function(error, update_result){
                            console.log(update_result);
                        });
                        tickets.update({_id: mongoose.Types.ObjectId(document._id)},{$set:{referCount:5}})
                        .exec(function(error, update_result){
                            console.log(update_result);
                        });
                    });
                }
                else{
                    mail.sendEmail(result, document).then(() => {
                        tickets.update({_id:{$in: result.map( (value) => mongoose.Types.ObjectId(value._id)) }},{$inc:{referCount: 1}},{multi: true})
                        .exec(function(error, update_result){
                            console.log(update_result);
                        });
                        tickets.update({_id: mongoose.Types.ObjectId(document._id)},{$set:{referCount:result.length}})
                        .exec(function(error, update_result){
                            console.log(update_result);
                        });
                    });
                }
            }
            else if(result.length > 10){
               var zeroFirstIndex = result.findIndex(value => value.referCount == 0);
               if(((result.length-1) - zeroFirstIndex) > 5){
                    result = result.splice(zeroFirstIndex, 5);
                    mail.sendEmail(result, document).then(() => {
                        tickets.update({_id:{$in: result.map( (value) => mongoose.Types.ObjectId(value._id)) }},{$inc:{referCount: 1}},{multi: true})
                        .exec(function(error, update_result){
                            console.log(update_result);
                        });
                        tickets.update({_id: mongoose.Types.ObjectId(document._id)},{$set:{referCount:5}})
                        .exec(function(error, update_result){
                            console.log(update_result);
                        });
                    });
               }
               else{
                   result = result.splice(0, 5);
                   mail.sendEmail(result, document).then(() => {
                        tickets.update({_id:{$in: result.map( (value) => mongoose.Types.ObjectId(value._id)) }},{$inc:{referCount: 1}},{multi: true})
                        .exec(function(error, update_result){
                            console.log(update_result);
                        });
                        tickets.update({_id: mongoose.Types.ObjectId(document._id)},{$set:{referCount:5}})
                        .exec(function(error, update_result){
                            console.log(update_result);
                        });
                    });
               }
            }
            else{
                return;
            }
            
        });
    },


    findSellers : (document) => {
            var dayEndTime = moment(new Date(document.time)).endOf('day');
           
            console.log({
                            time:{
                                    $gt: document.time, 
                                    $lt: dayEndTime.toDate()
                            }, 
                            isenabled: true,
                            type:'sell',
                            referCount:{$lt:5}, 
                            'slot.movie':document.slot.movie.toLowerCase(),
                            'slot.ticketcount': document.slot.ticketcount,
                            //userId:{$ne:document.userId}
            });
            tickets.find({
                            time:{
                                    $gt: document.time, 
                                    $lt: dayEndTime.toDate()
                            }, 
                            isenabled: true,
                            type:'sell',
                            referCount:{$lt:5}, 
                            'slot.movie':document.slot.movie.toLowerCase(),
                            'slot.ticketcount': document.slot.ticketcount,
                            //userId:{$ne:document.userId}
            })
            .sort({$natural: -1})
            .exec(function(error, result){
                console.log("No. of users Found : "+result.length);

                updateReferCount = (seller) => {
                    tickets.update({_id: {$in:[ mongoose.Types.ObjectId(document._id), mongoose.Types.ObjectId(seller._id)]}},{$inc:{referCount: 1}})
                    .exec(function(error, update_result){
                        console.log(update_result);
                    });
                };

                if(error){
                    return;
                }
                else if(result.length > 0 && result.length < 10){
                    if(result.length > 5){
                        result = result.splice(0, 5);
                        result.forEach((seller) => {

                            mail.sendEmail([document], seller).then(() => {
                                updateReferCount(seller);
                            });
                        });
                    }
                    else{
                        result.forEach((seller) => {
                            mail.sendEmail([document], seller).then(() => {
                                updateReferCount(seller);
                            });
                        });
                    }
                }
                else if(result.length > 10){
                var zeroFirstIndex = result.findIndex(value => value.referCount == 0);
                    if(((result.length-1) - zeroFirstIndex) > 5){
                        result = result.splice(zeroFirstIndex, 5);
                        result.forEach((seller) => {
                            mail.sendEmail([document], seller).then(() => {
                                updateReferCount(seller);
                            });
                        });   
                    }
                    else{
                        result = result.splice(0, 5);
                        result.forEach((seller) => {
                            mail.sendEmail([document], seller).then(() => {
                                updateReferCount(seller);
                            });
                        });
                   
                    }
                }
                else{
                    return;
                }
                
            });
    }
};