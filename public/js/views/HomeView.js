define([
        'jquery',
        'underscore',
        'backbone',
        'views/product/ProductListItemView',
        'text!templates/home.html'
], function($, _,  Backbone, ProductListItemView, HomeTemplate){

    var HomeView = Backbone.View.extend({

    	render:function () {
            $(this.el).html(_.template(HomeTemplate, {})); 

            var products = this.collection.models;
            
            $('#featured', this.el).append(new ProductListItemView({model: products[0] }).render().el);

            for (var i = 1; i < products.length; i++) {
                $('#items', this.el).append(new ProductListItemView({model: products[i]}).render().el);
            }
            
            return this;           
    	}

    });

    return HomeView;
});
