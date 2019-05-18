const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const vehicle_schema = mongoose.Schema({
    _id: { type: String, default: () => uuidv1()},
    name: String,
    created: {type: Date, default: () => Date.now()},
    type: {type: String, enum: ['Truck', 'Suv', 'Hybrid']},
})

module.exports = mongoose.model('Vehicle', vehicle_schema);