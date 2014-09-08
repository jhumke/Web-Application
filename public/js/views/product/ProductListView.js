define([
  'jquery',
  'underscore',
  'backbone',
  'models/Product',
  'text!templates/product/list.html'
], function($, _, Backbone, ProductModel, productsListTemplate){
  var ProductListView = Backbone.View.extend({
    
    el: $(".container"),

    render: function() {
        
          var data = {
            products: this.collection.models,
            _: _ 
          };

          var compiledTemplate = _.template( productsListTemplate, data );
          return compiledTemplate; 
      }

      

    });

  return ProductListView;
});