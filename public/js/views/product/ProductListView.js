define([
  'jquery',
  'underscore',
  'backbone',
  'views/product/ProductListItemView'
], function($, _, Backbone, ProductListItemView){
  var ProductListView = Backbone.View.extend({
    
    tagName: "div",

    render: function() {

        var products = this.collection.models;

        $(this.el).html('<div class="thumbnails"></div>');

        for (var i = 0; i < products.length; i++) {
            $('.thumbnails', this.el).append(new ProductListItemView({model: products[i]}).render().el);
        }

        return this;
    }

  });

  return ProductListView;

});