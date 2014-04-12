var animations = angular.module('animations', ['ngAnimate'])


animations.animation('.fadeIn', function(){
  return {
    enter: function(element, done){
      jQuery(element).css({
        opacity: 0
      });
      jQuery(element).animate({
        opacity: 1
      }, 600, done);
    }
  };
});