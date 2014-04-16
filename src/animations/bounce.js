var bounces = angular.module('animations.bounces', ['animations.create']);

bounces.animation('.bounce-normal', function (Animation){
  var effect = {
    first: {opacity: 0, transform: 'scale(.3)'},
    mid: {opacity: 1, transform: 'scale(1.05)'},
    third: {transform: 'scale(.9)'},
    end: {opacity: 1, transform: 'scale(1)'},
    duration: 0.2
  };

  return new Animation.bounce(effect);
});

bounces.animation('.bounce-down', function (Animation){
  var effect = {
    first: {opacity: 0, transform: 'translateY(-2000px)'},
    mid: {opacity: 1, transform: 'translateY(30px)'},
    third: {transform: 'translateY(-10px)'},
    end: {transform: 'translateY(0)'},
    duration: 0.2
  };

  return new Animation.bounce(effect);
});