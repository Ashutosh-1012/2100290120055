const mongoose = require('mongoose');

const numberWindowSchema = new mongoose.Schema({
    numbers: [Number]
});

const NumberWindow = mongoose.model('NumberWindow', numberWindowSchema);

module.exports = NumberWindow;
