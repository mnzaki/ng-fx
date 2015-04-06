/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Using Angular's '.animate', all fade animations are created with javaScript.

  @RotateAnimation
    Constructor function that returns a new animation object that has all
    required methods for ngAnimate ex: this.enter(), this.leave(), etc

  @effect
    The actual animation that will be applied to the element, staggered
     first: the style to applied to the element 1/4 through the animtion
     mid: style to be applied to to the element 2/4 through the animation
     third: style to be applied to the element 3/4 through the animation
     end: style to be applied to the element when it's complete
     animation: the name of the animtion for the eventing system
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

*/

angular.module('fx.animations.zooms', ['fx.animations.zooms.factory'])

.animation('.fx-zoom-normal', ['ZoomAnimation', function (ZoomAnimation){
  var effect = {
    start: {opacity: 0, transform: 'scale(.3)'},
    end: {opacity: 1, transform: 'scale(1)'},
    animation: 'zoom-normal'
  };

  return new ZoomAnimation(effect);
}])

.animation('.fx-zoom-down', ['ZoomAnimation', function (ZoomAnimation){
  var effect = {
    start: {opacity: 0, transform: 'scale(.1) translateY(-2000px)'},
    end: {opacity: 1, transform: 'scale(1) translateY(0)'},
    animation: 'zoom-down'
  };

  return new ZoomAnimation(effect);
}])

.animation('.fx-zoom-up', ['ZoomAnimation', function (ZoomAnimation){
  var effect = {
    start: {opacity: 0, transform: "scale(.1) translateY(2000px)"},
    end: {opacity: 1, transform: "scale(1) translateY(0)"},
    animation: 'zoom-up'
  };

  return new ZoomAnimation(effect);
}])

.animation('.fx-zoom-right', ['ZoomAnimation', function (ZoomAnimation){
  var effect = {
    start: {opacity: 0, transform: 'scale(.1) translateX(2000px)'},
    end: {opacity: 1, transform: 'scale(1) translateX(0)'},
    animation: 'zoom-right'
  };

  return new ZoomAnimation(effect);
}])

.animation('.fx-zoom-left', ['ZoomAnimation', function (ZoomAnimation){
  var effect = {
    start: {opacity: 0, transform: 'scale(.1) translateX(-2000px)'},
    end: {opacity: 1, transform: 'scale(1) translateX(0)'},
    animation: 'zoom-left'
  };

  return new ZoomAnimation(effect);
}]);
