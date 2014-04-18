angular.module('animations.assist', [])


.factory('Assist', ['$filter', '$window', '$timeout', function ($filter, $window, $timeout){
  return {

    emit: function(element, name, trigger){

      var $scope = angular.element(element).scope();
      $scope.$emit(trigger+name);

    },

    parseClassList: function(element){

      var list = element[0].classList,
          results = {trigger: false, duration: 0.3};
      angular.forEach(list, function (className){
        if(className.slice(0,9) === 'fx-easing'){
          var ease = $filter('cap')(className.slice(10));
          results.ease = $window[ease] ? ease : 'Elastic';
        }
        if(className === 'fx-trigger'){
          results.trigger = true;
        }
        if(className.slice(0,8) === 'fx-speed'){
          results.duration = parseInt(className.slice(9))/1000;
        }
      });
      return results;
    },

    addTimer: function(options, element, end){
      var self = this;
      var time = options.duration;
      var timer = $timeout(function(){
        if(options.trigger){
          self.emit(element, options.animation, options.motion);
        }
      }, time * 1000).then(end);
      element.data(options.timeoutKey, timer);
    },
    removeTimer: function(element, timeoutKey, timer){
      $timeout.cancel(timer);
      element.removeData(timeoutKey);
    }
  };
}])

.filter('cap', [function(){
  return function (input){
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
}]);
angular.module('animations.create', ['animations.assist'])




.factory('FadeAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist){
  return function (effect){
    var inEffect        = effect.enter,
        outEffect       = effect.leave,
        outEffectLeave  = effect.inverse || effect.leave,
        fx_type         = effect.animation,
        timeoutKey      = '$$fxTimer';



    this.enter = function(element, done){
      var options = Assist.parseClassList(element);
      options.motion = 'enter';
      options.animation = fx_type;
      options.timeoutKey = timeoutKey;
      Assist.addTimer(options, element, done);
      inEffect.ease = $window[options.ease].easeOut;
      TweenMax.set(element, outEffect);
      TweenMax.to(element, options.duration, inEffect);

      return function (canceled){
        var timer = element.data(timeoutKey);
        if(timer){
          Assist.removeTimer(element, timeoutKey, timer);
        }
      };
    };

    this.leave = function(element, done){
      var options = Assist.parseClassList(element);
      options.motion = 'leave';
      options.animation = fx_type;
      options.timeoutKey = timeoutKey;
      Assist.addTimer(options, element, done);
      outEffectLeave.ease = $window[options.ease].easeIn;
      TweenMax.set(element, inEffect);
      TweenMax.to(element, options.duration, outEffectLeave);
      return function (canceled){
        var timer = element.data(timeoutKey);
        if(timer){
          Assist.removeTimer(element, timeoutKey, timer);
        }
      };
    };

    this.move = function(element, done){
      var options = Assist.parseClassList(element);
      options.motion = 'move';
      options.animation = fx_type;
      options.timeoutKey = timeoutKey;
      Assist.addTimer(options, element, done);
      TweenMax.set(element, outEffect);
      TweenMax.to(element, options.duration, inEffect);
      return function (canceled){
        if(canceled){
          var timer = element.data(timeoutKey);
          if(timer){
            Assist.removeTimer(element, timeoutKey, timer);
          }
        }
      };
    };

    this.beforeAddClass = function(element, className, done){
      if(className === 'ng-hide' && className.hide){
        var options = Assist.parseClassList(element);
        options.motion = 'enter';
        options.animation = fx_type;
        options.timeoutKey = timeoutKey;
        Assist.addTimer(options, element, done);
        TweenMax.to(element, options.duration, outEffectLeave);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      } else {
        done();
      }
    };

    this.removeClass = function(element, className, done){
      inEffect.onComplete = done;
      if(className === 'ng-hide' && className.show){
        var options = Assist.parseClassList(element);
        options.motion = 'enter';
        options.animation = fx_type;
        options.timeoutKey = timeoutKey;
        TweenMax.set(element, outEffect);
        TweenMax.to(element, options.duration, inEffect);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      } else {
        done();
      }
    };
  };
}])

.factory('BounceAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist){
    return function (effect){
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
    };
}]);


var fades = angular.module('animations.fades', ['animations.create']);


fades.animation('.fx-fade-normal', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1},
    leave: {opacity: 0},
    duration: 0.6,
    animation: 'fade-normal'
  };

  return new FadeAnimation(effect);
});


fades.animation('.fx-fade-down', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.8,
    inverse: {opacity: 0, transform: 'translateY(20px)'},
    animation: 'fade-down'
  };

  return new FadeAnimation(effect);
});

fades.animation('.fx-fade-down-big', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-2000px)'},
    inverse: {opacity: 0, transform: 'translateY(2000px)'},
    duration: 0.8,
    animation: 'fade-down-big'
  };

  return new FadeAnimation(effect);
});

fades.animation('.fx-fade-left', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-20px)'},
    inverse: {opacity: 0, transform: 'translateX(20px)'},
    duration: 0.8,
    animation: 'fade-left'
  };
  return new FadeAnimation(effect);
});

fades.animation('.fx-fade-left-big', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-2000px)'},
    inverse: {opacity: 0, transform: 'translateX(2000px)'},
    duration: 0.8,
    animation: 'fade-left-big'
  };

  return new FadeAnimation(effect);
});

fades.animation('.fx-fade-right', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(20px)'},
    inverse: {opacity: 0, transform: 'translateX(-20px)'},
    duration: 0.8,
    animation: 'fade-right'
  };

  return new FadeAnimation(effect);
});

fades.animation('.fx-fade-right-big', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(2000px)'},
    inverse: {opacity: 0, transform: 'translateX(-2000px)'},
    duration: 0.8,
    animation: 'fade-right-big'
  };

  return new FadeAnimation(effect);
});

fades.animation('.fx-fade-up', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform:'translateY(20px)'},
    inverse: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.8,
    animation: 'fade-up'
  };

  return new FadeAnimation(effect);
});

fades.animation('.fx-fade-up-big', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform:'translateY(2000px)'},
    inverse: {opacity: 0, transform: 'translateY(-2000px)'},
    duration: 0.8,
    animation: 'fade-up-big'
  };

  return new FadeAnimation(effect);
});
var bounces = angular.module('animations.bounces', ['animations.create']);

bounces.animation('.fx-bounce-normal', function (BounceAnimation){
  var effect = {
    first: {opacity: 0, transform: 'scale(.3)'},
    mid: {opacity: 1, transform: 'scale(1.05)'},
    third: {transform: 'scale(.9)'},
    end: {opacity: 1, transform: 'scale(1)'},
    duration: 0.2
  };

  return new BounceAnimation(effect);
});

bounces.animation('.fx-bounce-down', function (BounceAnimation){
  var effect = {
    first: {opacity: 0, transform: 'translateY(-2000px)'},
    mid: {opacity: 1, transform: 'translateY(30px)'},
    third: {transform: 'translateY(-10px)'},
    end: {transform: 'translateY(0)'},
    duration: 0.2
  };

  return new BounceAnimation(effect);
});

bounces.animation('.fx-bounce-left', function (BounceAnimation){
  var effect = {
    first: {opacity: 0,  transform: 'translateX(-2000px)'},
    mid: {opacity: 1, transform: 'translateX(30px)'},
    third: {transform: 'translateX(-10px)'},
    end: {transform: 'translateX(0)'},
    duration: 0.2
  };

  return new BounceAnimation(effect);
});
var animate = angular.module('animations',
  [
    'animations.fades',
    'animations.bounces'
  ]

);

