var bounces = angular.module('animations.bounces', ['animations.create']);

bounces.animation('.bounce-normal', function (Animation){
  var effect = {
    first: {opacity: 0, transform: 'scale(.3)'},
    mid: {opacity: 1, transform: 'scale(1.05)'},
    third: {transform: 'scale(.9)'},
    end: {opacity: 1, transform: 'scale(1)'},
    duration: 0.3
  };

  return new Animation.bounce(effect);
});