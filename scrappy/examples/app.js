/*
		I am publishing this example for learning purposes in order to show how to use scrappy,
		www.BuyerTire.com does not exist but if it did, using this code may violate the terms of use of the site.
		Before scraping a real web site, make sure they allow it or ask for permission.
*/

var Scrappy = require('../scrappy.js'),
		cheerio = require('cheerio'),
		MongoClient = require('mongodb').MongoClient,
		assert = require('assert');

// This should be changed to point at your own mongo db
const mongourl = 'mongodb://localhost:3001/meteor';

var scrappy = new Scrappy(/* Optional */ function (proxyList) {
	proxyList.concat([
		'http://24.205.163.136:80',
		'http://216.218.147.196:1080',
		'http://107.151.152.218:80',
		]); 
});

var site = 'http://www.buyertire.com',
		path = '/tires/brands';

// Landing page
var makesModel = {
	locator: '.item-description',
	fields: {
		url: { find: 'a.chevron-right', type: 'href', transform: x => x+'/all' } // Link to next level
	}
};
// All models by brand
var modelsModel = {
	locator: '.item-container',
	fields: {
		url: { find: "a.btn-success.chevron-right", type: 'href' }, // Link to next level
		make: { find: "[itemprop='brand']", type: 'text' },
		model: { find: "[itemprop='name']", type: 'text' }
	}
};
// All tires by model
var wheelsModel = {
	locator: '.variant-item',
	fields: {
		size: { find: 'h3', type: 'text' },
		manref: { find: 'h4', type: 'text' },
		price: { find: 'h1', type: 'text', transform: x => x.replace('\\r\\n','').trim() },
		loadSpeedRating: { find: '.loadRatingTD', type: 'text' },
		color: { find: '.sidewallTD', type: 'text' },
		load: { find: '.loadTD', type: 'text' },
		tread: { find: '.treadTD', type: 'text' },
		href: { find: "a.blueButton", type: 'href' }
	}
};

MongoClient.connect(mongourl, function(err, db) {
	assert.equal(null,err);
	var wheels = db.collection('wheels'),
			prices = db.collection('prices');
	scrappy.scrap(site, path, [makesModel, modelsModel, wheelsModel], (err, obj) => {
		var wheel = {
			make: obj.make,
			model: obj.model,
			size: obj.size,
			manref: obj.manref,
			loadSpeedRating: obj.loadSpeedRating,
			color: obj.color,
			load: obj.load,
			tread: obj.tread
		};
		var price = {
			make: obj.make,
			model: obj.model,
			size: obj.size,
			shopref: 'buyertire',
			area: 'all',
			price: obj.price,
			href: obj.href
		};
		wheels.update({ make: wheel.make, model: wheel.model, size: wheel.size }, wheel, { upsert: true }, function(err, result) {
			assert.equal(err, null);
		});
		prices.update({ make: price.make, model: price.model, size: price.size, shopref: 'buyertire' }, price, { upsert: true }, function(err, result) {
			assert.equal(err, null);
		});
	});
});