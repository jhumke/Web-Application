define([
	'jquery',
	'underscore',
	'backbone',
	'collections/Products',
	'views/HomeView',
	'views/product/ProductListView'
], function($, _,  Backbone, ProductCollection, HomeView, ProductsView){

	var Router = Backbone.Router.extend({

		routes : {
			'products' : 'showProducts',
			'products/:category' : 'showProducts',
			'*default' : 'showHome'
		},

		changeView : function(view){
			function setView(view){
				if(this.currentView){
					this.currentView.close();
				}
				this.currentView = view;
				$('.container').html(view.render().el);
			}
			setView(view);
		},
		showHome : function() {

			var products = new ProductCollection();
			var that = this;

			products.fetch({
				success : function(collection, response) {
					var homeView = new HomeView({collection : collection});
					that.changeView(homeView);
				}
			});
		},
		showProducts : function(category) {
			var products = new ProductCollection();
			var that = this;

			if(category) {
				products.url += '/c/' + category 	
			}

			products.fetch({
				success : function(collection, response) {
					var productsView = new ProductsView({collection : collection});
					that.changeView(productsView);
				}
			});
		},
		fetchError : function(error){
		}
	});

	return Router;
});
