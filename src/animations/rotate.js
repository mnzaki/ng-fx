
/*
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Using Angular's '.animate', all fade animations are created with javaScript.

    @BounceAnimation
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

(function(angular){
  "use strict";

  angular.module('fx.animations.rotations', ['fx.animations.create'])

  .animation('.fx-rotate-counterclock', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'center center', transform: 'rotate(-200deg)'},
      end: {opacity: 1, transformOrigin: 'center center', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'center center', transform: 'rotate(200deg)'},
      animation: 'rotate-counterclock'
    };
    return new RotateAnimation(effect);
  }])

  .animation('.fx-rotate-clock', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'center center', transform: 'rotate(200deg)'},
      end: {opacity: 1, transformOrigin: 'center center', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'center center', transform: 'rotate(-200deg)'},
      animation: 'rotate-clock'
    };
    return new RotateAnimation(effect);
  }])
  .animation('.fx-rotate-clock-left', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'left bottom', transform: 'rotate(-90deg)'},
      end: {opacity: 1, transformOrigin: 'left bottom', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'left bottom', transform: 'rotate(90deg)'},
      animation: 'rotate-clock-left'
    };
    return new RotateAnimation(effect);
  }])
  .animation('.fx-rotate-counterclock-right', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'right bottom', transform: 'rotate(90deg)'},
      end: {opacity: 1, transformOrigin: 'right bottom', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'right bottom', transform: 'rotate(-90deg)'},
      animation: 'rotate-counterclock-right'
    };
    return new RotateAnimation(effect);
  }])
  .animation('.fx-rotate-counterclock-up', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'left bottom', transform: 'rotate(90deg)'},
      end: {opacity: 1, transformOrigin: 'left bottom', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'left bottom', transform: 'rotate(-90deg)'},
      animation: 'rotate-counterclock-up'
    };
    return new RotateAnimation(effect);
  }])
  .animation('.fx-rotate-clock-up', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'right bottom', transform: 'rotate(-90deg)'},
      end: {opacity: 1, transformOrigin: 'right bottom', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'right bottom', transform: 'rotate(90deg)'},
      animation: 'rotate-clock-up'
    };
    return new RotateAnimation(effect);
  }]);

}(angular));