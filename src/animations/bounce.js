var bounces = angular.module('animations.bounces', ['animations.create']);

bounces.animation('.fx-bounce-normal', function (BounceAnimation){
  var effect = {
    first: {opacity: 0, transform: 'scale(.3)'},
    mid: {opacity: 1, transform: 'scale(1.05)'},
    third: {transform: 'scale(.9)'},
    end: {opacity: 1, transform: 'scale(1)'},
    animation: 'bounce-normal'
  };

  return new BounceAnimation(effect);
});

bounces.animation('.fx-bounce-down', function (BounceAnimation){
  var effect = {
    first: {opacity: 0, transform: 'translateY(-2000px)'},
    mid: {opacity: 1, transform: 'translateY(30px)'},
    third: {transform: 'translateY(-10px)'},
    end: {transform: 'translateY(0)'},
    animation: 'bounce-down'
  };

  return new BounceAnimation(effect);
});

bounces.animation('.fx-bounce-left', function (BounceAnimation){
  var effect = {
    first: {opacity: 0,  transform: 'translateX(-2000px)'},
    mid: {opacity: 1, transform: 'translateX(30px)'},
    third: {transform: 'translateX(-10px)'},
    end: {transform: 'translateX(0)'},
    animation: 'bounce-left'
  };

  return new BounceAnimation(effect);
});