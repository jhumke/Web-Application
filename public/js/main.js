require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
    },
    paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
        text : '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text'
    }
});

require([
    'app'
], function (App) {
    var app = new App();
    app.start(); 
});
