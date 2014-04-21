angular.module('MyApp', ['ngAnimate'])
  .animation('.enter-in', function() {
    return {
      enter : function(element, done) {
        jQuery(element).animate({
          opacity:1
        }, done);
      }
    }
  });