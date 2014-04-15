var fades = angular.module('animations.fades', ['animations.create']);


fades.animation('.fade-normal', function (Animation){
  var effect = {
    enter: {opacity: 1, ease: Back.easeOut},
    leave: {opacity: 0, ease: Back.easeIn},
    duration: 0.6,
    class: 'fade-normal'
  };

  return new Animation.create(effect);
});


fades.animation('.fade-down', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)', ease: Back.easeOut},
    leave: {opacity: 0, transform: 'translateY(-20px)', ease: Back.easeIn},
    duration: 0.3,
    inverse: {opacity: 0, transform: 'translateY(20px)', ease: Back.easeOut}
  };

  return new Animation.create(effect);
});

fades.animation('.fade-down-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)', ease: Back.easeOut},
    leave: {opacity: 0, transform: 'translateY(-2000px)', ease: Back.easeIn},
    inverse: {opacity: 0, transform: 'translateY(2000px)', ease: Back.easeOut},
    duration: 0.5
  };

  return new Animation.create(effect);
});

fades.animation('.fade-left', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)', ease: Back.easeOut},
    leave: {opacity: 0, transform: 'translateX(-20px)', ease: Back.easeIn},
    inverse: {opacity: 0, transform: 'translateX(20px)', ease: Back.easeOut},
    duration: 0.5
  };
  return new Animation.create(effect);
});

fades.animation('.fade-left-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)', ease: Back.easeOut},
    leave: {opacity: 0, transform: 'translateX(-2000px)', ease: Back.easeIn},
    inverse: {opacity: 0, transform: 'translateX(2000px)', ease: Back.easeOut},
    duration: 0.5
  };

  return new Animation.create(effect);
});

fades.animation('.fade-right', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)', ease: Back.easeOut},
    leave: {opacity: 0, transform:'translateX(20px)', ease: Back.easeIn},
    inverse: {opacity: 0, transform: 'translateX(-20px)', ease: Back.easeOut},
    duration: 0.5
  };

  return new Animation.create(effect);
});

fades.animation('.fade-right-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)', ease: Back.easeOut},
    leave: {opacity: 0, transform:'translateX(2000px)', ease: Back.easeIn},
    inverse: {opacity: 0, transform: 'translateX(-2000px)', ease: Back.easeOut},
    duration: 0.5
  };

  return new Animation.create(effect);
});

fades.animation('.fade-up', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)', ease: Back.easeOut},
    leave: {opacity: 0, transform:'translateY(20px)', ease: Back.easeIn},
    inverse: {opacity: 0, transform: 'translateY(-20px)', ease: Back.easeOut},
    duration: 0.5
  };

  return new Animation.create(effect);
});

fades.animation('.fade-up-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)', ease: Back.easeOut},
    leave: {opacity: 0, transform:'translateY(2000px)', ease: Back.easeIn},
    inverse: {opacity: 0, transform: 'translateY(-2000px)', ease: Back.easeOut},
    duration: 0.5
  };

  return new Animation.create(effect);
});