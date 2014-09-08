define([
	'jquery',
	'backbone',
	'underscore'
	], function($, Backbone, _) {
	
	var Product = Backbone.Model.extend({

		urlRoot : '/products',
		idAttribute : '_id',

		defaults : {
			_id : null,
			name : "",
			price : "0.0",
			category : "",
			description : "",
			tags : [],
			imagePath : ""
		},

		initialize: function() {
			this.validate
		}

	});
	return Product;
});