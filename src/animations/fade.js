var fades = angular.module('animations.fades', ['animations.create']);


fades.animation('.ef-fade-normal', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1},
    leave: {opacity: 0},
    duration: 0.6,
    animation: 'fade-normal'
  };

  return new FadeAnimation(effect);
});


fades.animation('.ef-fade-down', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.8,
    inverse: {opacity: 0, transform: 'translateY(20px)'},
    animation: 'fade-down'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-down-big', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-2000px)'},
    inverse: {opacity: 0, transform: 'translateY(2000px)'},
    duration: 0.8,
    animation: 'fade-down-big'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-left', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-20px)'},
    inverse: {opacity: 0, transform: 'translateX(20px)'},
    duration: 0.8,
    animation: 'fade-left'
  };
  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-left-big', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-2000px)'},
    inverse: {opacity: 0, transform: 'translateX(2000px)'},
    duration: 0.8,
    animation: 'fade-left-big'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-right', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(20px)'},
    inverse: {opacity: 0, transform: 'translateX(-20px)'},
    duration: 0.8,
    animation: 'fade-right'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-right-big', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(2000px)'},
    inverse: {opacity: 0, transform: 'translateX(-2000px)'},
    duration: 0.8,
    animation: 'fade-right-big'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-up', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform:'translateY(20px)'},
    inverse: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.8,
    animation: 'fade-up'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-up-big', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform:'translateY(2000px)'},
    inverse: {opacity: 0, transform: 'translateY(-2000px)'},
    duration: 0.8,
    animation: 'fade-up-big'
  };

  return new FadeAnimation(effect);
});