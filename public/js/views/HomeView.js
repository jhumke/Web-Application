define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/home.html'
], function($, _,  Backbone, HomeTemplate){

    var HomeView = Backbone.View.extend({

    	initialize:function () {
            this.render();
    	},

    	render:function () {
            return _.template(HomeTemplate, {});            
    	}

    });
});
