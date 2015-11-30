var mongoose = require('mongoose');

var DaySchema = new mongoose.Schema({
	number: Number,
	hotel: {type: mongoose.Schema.types.ObjectId, ref: 'Hotel'},
	restaurants: {type: mongoose.Schema.types.ObjectId, ref: 'Restaurant'},
	activities: {type: mongoose.Schema.types.ObjectId, ref: 'Activity'}
})

module.exports = mongoose.model('Day',DaySchema);