var express = require('express');
var router = express.Router();
var models = require('../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Promise = require('bluebird');
var Days = require('./api/days')

var alphabetize = function(a,b) {
    return a.name < b.name ? -1 : 1;
};

router.use('/api/day',Days)

router.get('/', function(req, res) {
  Promise.all([
    Hotel.find(),
    Restaurant.find(),
    Activity.find()
    ]).spread(function(hotels, restaurants, activities) {
      res.render('index', {
        all_hotels: hotels.sort(alphabetize),
        all_restaurants: restaurants.sort(alphabetize),
        all_activities: activities.sort(alphabetize)
      });
    })
})

module.exports = router;
