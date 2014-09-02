define([
	'jquery',
	'backbone',
	'router'
], function($, Backbone, Router){

	var ApplicationModel = Backbone.Model.extend({

		start : function(){
			var router = new Router();
			Backbone.history.start();
		}
	});
	return ApplicationModel;
});