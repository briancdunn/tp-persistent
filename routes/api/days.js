var express = require('express'); 
var router = express.Router(); 
var models = require('../../models');
var Promise = require('bluebird'); 
var Hotel = models.Hotel; 
var Activity = models.Activity; 
var Restaurant = models.Restaurant; 
var Day = models.Day;

router.get('/',function(req,res,next){
	// Promise.all([
 //    Hotel.find(),
 //    Restaurant.find(),
 //    Activity.find()
 //    ])
	// .spread(function(hotels, restaurants, activities) {
 //    res.render('index', {
 //      all_hotels: hotels.sort(alphabetize),
 //      all_restaurants: restaurants.sort(alphabetize),
 //      all_activities: activities.sort(alphabetize)
 //    });
 //  })

	// Promise.all([])

	Day.find({}).populate('hotel activities restaurants').exec()
	.then(function(days){
		if(!days.length){
			return [Day.create({number: 1})]
		}else{
			return days
		}
	}).then(function(days){

		res.json(days.sort(function(a,b) {
			return a.number-b.number;
		}));
	})
});

router.get('/:id',function(req,res,next){
	Day.find({number: req.params.id}).exec()
	.then(function(day){
		console.log("Test")
		res.json(day);
	}).then(null,next);
});


router.delete('/:id',function(req,res,next){
	Day.remove({number: req.params.id})
	.then(function(info){
		return Day.find({number: {$gt: req.params.id}})
		// return info;
	})
	.then(function(daysArray) {
		var arrayOfPromises = daysArray.map(function(day){
					day.number--;
					return day.save();
		})
		return Promise.all(arrayOfPromises);
		// res.json(info);
	}).then(function(days){

		res.send(days);
	})
	.then(null,next)
});


router.post('/:id',function(req,res,next){
	Day.create({
		number: req.params.id
	})
	.then(function(day) {
		res.json(day);
	})
	.then(null, next);
});

router.post('/:dayId/restaurants/:restaurantName',function(req,res,next){
	Restaurant.findOne({name: req.params.restaurantName})
	.then(function(restaurant) {
		return Day.update({number: req.params.dayId},{ $push: { restaurants: restaurant._id }})
	})
	.then(function(day) {
		res.json(day);
	})
	.then(null,next);
});

router.post('/:dayId/activities/:activityName',function(req,res,next){
	Activity.findOne({ name: req.params.activityName })
	.then(function(activity) {
		return Day.update({number: req.params.dayId},{ $push: { activities: activity._id }})
	})
	.then(function(day) {
		console.log(day);
		res.json(day);
	})
	.then(null,next);
});

router.post('/:dayId/hotels/:hotelName',function(req,res,next){
	Hotel.findOne({ name: req.params.hotelName })
	.then(function(hotel) {
		return Day.update({number: req.params.dayId},{ $set: { hotel: hotel._id }})
	})
	.then(function(day) {
		res.json(day);
	})
	.then(null,next);
})

router.delete('/:dayId/restaurants/:restaurantName',function(req,res,next){
	Restaurant.findOne({name: req.params.restaurantName})
	.then(function(restaurant) {
		return Day.update({number: req.params.dayId},{ $pull: { restaurants: restaurant._id }})
	})
	.then(function(day) {
		res.json(day);
	})
	.then(null,next);
});

router.delete('/:dayId/hotels/:hotelName',function(req,res,next){
	Hotel.findOne({name: req.params.hotelName})
	.then(function(hotel) {
		return Day.update({number: req.params.dayId},{ $unset: { hotel: "" }})
	})
	.then(function(day) {
		res.json(day);
	})
	.then(null,next);
});

router.delete('/:dayId/activities/:activityName',function(req,res,next){
	Activity.findOne({name: req.params.activityName})
	.then(function(activity) {
		return Day.update({number: req.params.dayId},{ $pull: { activities: activity._id }})
	})
	.then(function(day) {
		res.json(day);
	})
	.then(null,next);
});


module.exports = router;