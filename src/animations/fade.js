var fades = angular.module('animations.fades', ['animations.create']);


fades.animation('.ef-fade-normal', function (Animation){
  var effect = {
    enter: {opacity: 1},
    leave: {opacity: 0},
    duration: 0.6
  };

  return new Animation.fade(effect);
});


fades.animation('.ef-fade-down', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.8,
    inverse: {opacity: 0, transform: 'translateY(20px)'},
    animation: 'fade-down'
  };

  return new Animation.fade(effect);
});

fades.animation('.ef-fade-down-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-2000px)'},
    inverse: {opacity: 0, transform: 'translateY(2000px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});

fades.animation('.ef-fade-left', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-20px)'},
    inverse: {opacity: 0, transform: 'translateX(20px)'},
    duration: 0.8,
    animation: 'fade-left'
  };
  return new Animation.fade(effect);
});

fades.animation('.ef-fade-left-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-2000px)'},
    inverse: {opacity: 0, transform: 'translateX(2000px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});

fades.animation('.ef-fade-right', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(20px)'},
    inverse: {opacity: 0, transform: 'translateX(-20px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});

fades.animation('.ef-fade-right-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(2000px)'},
    inverse: {opacity: 0, transform: 'translateX(-2000px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});

fades.animation('.ef-fade-up', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform:'translateY(20px)'},
    inverse: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});

fades.animation('.ef-fade-up-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform:'translateY(2000px)'},
    inverse: {opacity: 0, transform: 'translateY(-2000px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});