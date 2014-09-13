define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/home.html'
], function($, _,  Backbone, HomeTemplate){

    var HomeView = Backbone.View.extend({

    	render:function () {
            $(this.el).html(_.template(HomeTemplate, {})); 
            return this;           
    	}

    });

    return HomeView;
});
