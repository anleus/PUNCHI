const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Vacation = Schema({
    user: {
        type: Schema.Types.ObjectId,
        require: true
    },
    pending: {
        type: [Date]
    },
    left: {
        type: Number,
        required: true
    },
    past: {
        type: [Date]
    }
});

module.exports = mongoose.model('Vacation', Vacation, 'Vacation');