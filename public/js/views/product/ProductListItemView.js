define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/product/item.html'
], function($, _, Backbone, itemTemplate){
  
  var ProductListItemView =Backbone.View.extend({

	    tagName: "div",

	    initialize: function () {
	        this.model.bind("change", this.render, this);
	        this.model.bind("destroy", this.close, this);
	    },

	    render: function () {
	        $(this.el).html(_.template(itemTemplate, {product : this.model}));
	        return this;
	    }

	});

  return ProductListItemView;

});  