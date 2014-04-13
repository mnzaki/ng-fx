var fade = angular.module('animations.fade', [])


fade.animation('.fade', function(){
  var fadeOut,
      fadeIn,
      fadeMove;
  return {
    enter: function(element, done){
      TweenMax.set(element, {opacity: 0});
      fadeOut = TweenMax.to(element, 0.3, {opacity: 1, onComplete: done});
      return function(canceled){
        if(canceled){
          console.log('here');
          fadeOut.reverse();
          fadeOut.kill();
        } else {
          fadeOut.resume();
        }
      };
    },

    leave: function(element, done){
      TweenMax.set(element, {opacity: 1});
      TweenMax.to(element, 0.3, {opacity: 0, onComplete: done});
    },

    move: function(element, done){
      TweenMax.set(element, {opacity: 0.3});
      TweenMax.set(element, {opacity: 1, rotation: 30 , onComplete: done});
    }
  };
});
var animate = angular.module('animate',
  [
    'animate.fade'
  ]

);


var app = angular.module('app', ['ngAnimate', 'animations.fade']);

app.controller('MainController', ['$scope', function($scope){

}]);