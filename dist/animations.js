angular.module('animations.create', [])

.factory('Animation', function($timeout){
  var getScope = function(e){
    return angular.element(e).scope();
  };
  var complete = function(element, name){
    var $scope = getScope(element);
    return function (){
      $scope.$emit(name);
    };
  };
  return {
    create: function(effect){
      var inEffect        = effect.enter,
          outEffect       = effect.leave,
          outEffectLeave  = effect.inverse || effect.leave,
          duration        = effect.duration,
          enter,
          leave,
          move;

      this.enter = function(element, done){
        inEffect.onComplete = complete(element, effect.class);
        inEffect.paused = true;
        TweenMax.set(element, outEffect);
        enter = TweenMax.to(element, duration, inEffect);
        enter.play();
        return function (canceled){
          if(canceled){
            $timeout(function(){
              angular.element(element).remove();
            }, 300);
          } else {
            enter.resume();
          }
        };
      };

      this.leave = function(element, done){
        outEffect.onComplete = done;
        TweenMax.set(element, inEffect);
        leave = TweenMax.to(element, duration, outEffectLeave);
        return function (canceled){
          if(canceled){

          }
        };
      };

      this.move = function(element, done){
        console.log('move');
        inEffect.onComplete = done;
        TweenMax.set(element, outEffect);
        move = TweenMax.to(element. duration, inEffect);
        return function (canceled){
          if(canceled){

            move.kill();
          }
        };
      };

      this.beforeAddClass = function(element, className, done){
        outEffect.onComplete = done;
        if(className === 'ng-hide'){
          TweenMax.to(element, duration, outEffectLeave);
        } else {
          done();
        }
      };

      this.removeClass = function(element, className, done){
        inEffect.onComplete = done;
        if(className === 'ng-hide'){
          TweenMax.set(element, outEffect);
          TweenMax.to(element, duration, inEffect);
        } else {
          done();
        }
      };
    }
  };
});
var bounces = angular.module('animations.bounces', ['animations.create']);

// bounces.animation('.bounce-normal', function(){

// })
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
var animate = angular.module('animations',
  [
    'animations.fades'
  ]

);

