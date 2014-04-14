var fades = angular.module('animations.fades', ['animations.create']);


fades.animation('.fade-normal', function (Animation){
  var effect = {
    enter: {opacity: 1},
    leave: {opacity: 0},
    duration: 0.5
  };

  return new Animation.create(effect);
});


fades.animation('.fade-down', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.3,
    inverse: {opacity: 0, transform: 'translateY(20px)'}
  };

  return new Animation.create(effect);
});

fades.animation('.fade-down-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-2000px)'},
    inverse: {opacity: 0, transform: 'translateY(2000px)'},
    duration: 0.5
  };

  return new Animation.create(effect);
  // return {
  //   enter: function(element, done){
  //     TweenMax.set(element, {opacity: 0, transform: 'translateY(-2000px)'});
  //     fdbEnter = TweenMax.to(element, 0.5, {opacity: 1, transform: 'translateY(0)', onComplete: done});
  //     return function (canceled){
  //       if(canceled){
  //         fdbEnter.kill();
  //       }
  //     };
  //   },

  //   leave: function(element, done){
  //     TweenMax.set(element, {opacity: 1, transform: 'translateY(0)'});
  //     fdbLeave = TweenMax.to(element, 0.5, {opacity: 0, transform: 'translateY(2000px)', onComplete: done});
  //     return function (canceled){
  //       if(canceled){

  //       }
  //     };
  //   }
  // };
});