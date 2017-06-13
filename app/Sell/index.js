
let output = require("./../Output"),
    moment = require("moment"),

theatreSlot = (detail) => {

    let slot = detail.slots,
        date = moment(slot.showDate).toDate();
    
    return output.elicitSlot('Theatre', slot, {
        theatreName: '',
        city: ''
    });
};

module.exports = {
    theatreSlot
};