define([
    'underscore',
	'backbone',
	'models/Product'
], function(_, Backbone, ProductModel){
	
	var Products = Backbone.Collection.extend({

        model: ProductModel,

        url: '/products',

    });

    return Products;
});