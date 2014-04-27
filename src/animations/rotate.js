
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

  .animation('.fx-rotate-normal', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'center center', transform: 'rotate(-200deg)'},
      end: {opacity: 1, transformOrigin: 'center center', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'center center', transform: 'rotate(200deg)'},
      animation: 'rotate-normal'
    };
    return new RotateAnimation(effect);
  }]);

}(angular));
