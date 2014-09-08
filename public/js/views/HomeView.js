define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/home.html'
], function($, _,  Backbone, HomeTemplate){

    var HomeView = Backbone.View.extend({

    	render:function () {
            return _.template(HomeTemplate, {});            
    	}

    });

    return HomeView;
});
