angular.module('animations.create', [])

.factory('Animation', ['$timeout', '$window', function ($timeout, $window){
  var getScope = function(e){
    return angular.element(e).scope();
  };
  var complete = function(element, name){
    var $scope = getScope(element);
    return function (){
      $scope.$emit(name);
    };
  };

  var getEase = function(element){
    var reg = /(easing-)\w*\D\w*/;
    var classes = element[0].className.match(reg);
    var ease;
    if(classes){
      ease = classes[0].split('-').splice(1);
      ease = ease[0].split(' ')[0];
      return ease;
    }
    return ease;
  };
  var convertElement = function(element){
    return Array.prototype.slice.call(element);
  };
  return {
    fade: function(effect){
      var inEffect        = effect.enter,
          outEffect       = effect.leave,
          outEffectLeave  = effect.inverse || effect.leave,
          duration        = effect.duration,
          enter,
          leave,
          move;

      this.enter = function(element, done){
        var easeType = getEase(convertElement(element)).cap();
        inEffect.onComplete = complete(element, effect.class);
        inEffect.ease = $window[easeType].easeOut;
        TweenMax.set(element, outEffect);
        enter = TweenMax.to(element, duration, inEffect);
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
        var easeType = getEase(convertElement(element)).cap();
        outEffect.onComplete = done;
        outEffect.ease = $window[easeType].easeIn;
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
    },

    bounce: function(effect){
      var start     = effect.first,
          mid       = effect.mid,
          third     = effect.third,
          end       = effect.end,
          duration  = effect.duration;

      this.enter = function(element, done){
        end.onComplete = done;
        var enter = new TimelineMax();
        enter.to(element, start);
        enter.to(element, duration, mid);
        enter.to(element, duration, third);
        enter.to(element, duration, end);
        return function (canceled) {
          if(canceled){
            $timeout(function(){
              angular.element(element).remove();
            }, 800);
          }
        };
      };
      this.leave = function(element, done){
        start.onComplete = done;
        var leave = new TimelineMax();
        leave.to(element, end);
        leave.to(element, duration, third);
        leave.to(element, duration, mid);
        leave.to(element, duration, start);

        return function (canceled){
          if(canceled){

          }
        };
      };
      this.move = function(element, done){
        end.onComplete = done;
        var move = new TimelineMax();
        move.to(element, start);
        move.to(element, duration, mid);
        move.to(element, duration, third);
        move.to(element, duration, end);
        return function (canceled) {
          if(canceled){
            move.kill();
          }
        };

      };
      this.beforeAddClass = function(element, className, done){

      };
      this.removeClass = function(element, className, done){

      };
    }
  };
}]);

String.prototype.cap = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
var fades = angular.module('animations.fades', ['animations.create']);


fades.animation('.fade-normal', function (Animation){
  var effect = {
    enter: {opacity: 1},
    leave: {opacity: 0},
    duration: 0.6,
    class: 'fade-normal'
  };

  return new Animation.fade(effect);
});


fades.animation('.fade-down', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.8,
    inverse: {opacity: 0, transform: 'translateY(20px)'}
  };

  return new Animation.fade(effect);
});

fades.animation('.fade-down-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-2000px)'},
    inverse: {opacity: 0, transform: 'translateY(2000px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});

fades.animation('.fade-left', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-20px)'},
    inverse: {opacity: 0, transform: 'translateX(20px)'},
    duration: 0.8
  };
  return new Animation.fade(effect);
});

fades.animation('.fade-left-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-2000px)'},
    inverse: {opacity: 0, transform: 'translateX(2000px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});

fades.animation('.fade-right', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(20px)'},
    inverse: {opacity: 0, transform: 'translateX(-20px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});

fades.animation('.fade-right-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(2000px)'},
    inverse: {opacity: 0, transform: 'translateX(-2000px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});

fades.animation('.fade-up', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform:'translateY(20px)'},
    inverse: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});

fades.animation('.fade-up-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform:'translateY(2000px)'},
    inverse: {opacity: 0, transform: 'translateY(-2000px)'},
    duration: 0.8
  };

  return new Animation.fade(effect);
});
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
var animate = angular.module('animations',
  [
    'animations.fades',
    'animations.bounces'
  ]

);

