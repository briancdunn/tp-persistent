var express = require('express');
var router = express.Router();
var models = require('../../models')
var Hotel = models.Hotel;
var Activity = models.Activity;
var Restaurant = models.Restaurant;
var Day = models.Day;

router.get('/',function(req,res,next){
	Day.find({}).exec()
	.then(function(days){
		res.json(days);
	})
})

router.get('/:id',function(req,res,next){
	Day.find({number: req.params.id}).exec()
	.then(function(day){
		console.log("Test")
		res.json(day);
	}).then(null,next);
})


router.delete('/:id',function(req,res,next){
	Day.remove({number: req.params.id})
	.then(console.log)
	.then(null,next)
})


router.post('/:id',function(req,res,next){
	//Add specific day
})

router.post('/:id/restaurants',function(req,res,next){

})

router.post('/:id/activities',function(req,res,next){

})

router.post('/:id/hotels',function(req,res,next){

})


module.exports = router;