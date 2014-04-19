angular.module('fx.animations.assist', [])


.factory('Assist', ['$filter', '$window', '$timeout', function ($filter, $window, $timeout){
  return {

    emit: function(element, name, trigger){

      var $scope = angular.element(element).scope();
      $scope.$emit(trigger);

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
      var time = options.stagger ? (options.duration * 3) * 1000 : options.duration * 1000;
      var timer = $timeout(function(){
        if(options.trigger){
          self.emit(element, options.animation, options.motion);
        }
      }, time).then(end);
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
angular.module('fx.animations.create', ['fx.animations.assist'])




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
      var start       = effect.first,
          mid         = effect.mid,
          third       = effect.third,
          end         = effect.end,
          fx_type     = effect.animation,
          timeoutKey  = '$$fxTimer';

      this.enter = function(element, done){
        var options = Assist.parseClassList(element);
        options.motion = 'enter';
        options.animation = fx_type;
        options.timeoutKey = timeoutKey;
        options.stagger = true;
        Assist.addTimer(options, element, done);
        var enter = new TimelineMax();
        enter.to(element, start);
        enter.to(element, options.duration, mid);
        enter.to(element, options.duration, third);
        enter.to(element, options.duration, end);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      };
      this.leave = function(element, done){
        var options = Assist.parseClassList(element);
        options.motion = 'leave';
        options.animation = fx_type;
        options.timeoutKey = timeoutKey;
        options.stagger = true;
        Assist.addTimer(options, element, done);
        var leave = new TimelineMax();
        leave.to(element, end);
        leave.to(element, options.duration, third);
        leave.to(element, options.duration, mid);
        leave.to(element, options.duration, start);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
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
    };
}]);


angular.module('fx.animations.fades', ['fx.animations.create'])


.animation('.fx-fade-normal', ['FadeAnimation', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1},
    leave: {opacity: 0},
    animation: 'fade-normal'
  };
  return new FadeAnimation(effect);
}])


.animation('.fx-fade-down', ['FadeAnimation', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-20px)'},
    inverse: {opacity: 0, transform: 'translateY(20px)'},
    animation: 'fade-down'
  };
  return new FadeAnimation(effect);
}])

.animation('.fx-fade-down-big', ['FadeAnimation', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-2000px)'},
    inverse: {opacity: 0, transform: 'translateY(2000px)'},
    animation: 'fade-down-big'
  };
  return new FadeAnimation(effect);
}])

.animation('.fx-fade-left', ['FadeAnimation', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-20px)'},
    inverse: {opacity: 0, transform: 'translateX(20px)'},
    animation: 'fade-left'
  };
  return new FadeAnimation(effect);
}])

.animation('.fx-fade-left-big', ['FadeAnimation', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-2000px)'},
    inverse: {opacity: 0, transform: 'translateX(2000px)'},
    animation: 'fade-left-big'
  };

  return new FadeAnimation(effect);
}])

.animation('.fx-fade-right', ['FadeAnimation', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(20px)'},
    inverse: {opacity: 0, transform: 'translateX(-20px)'},
    animation: 'fade-right'
  };

  return new FadeAnimation(effect);
}])

.animation('.fx-fade-right-big', ['FadeAnimation', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(2000px)'},
    inverse: {opacity: 0, transform: 'translateX(-2000px)'},
    animation: 'fade-right-big'
  };

  return new FadeAnimation(effect);
}])

.animation('.fx-fade-up', ['FadeAnimation', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform:'translateY(20px)'},
    inverse: {opacity: 0, transform: 'translateY(-20px)'},
    animation: 'fade-up'
  };

  return new FadeAnimation(effect);
}])

.animation('.fx-fade-up-big', ['FadeAnimation', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform:'translateY(2000px)'},
    inverse: {opacity: 0, transform: 'translateY(-2000px)'},
    animation: 'fade-up-big'
  };

  return new FadeAnimation(effect);
}]);
angular.module('fx.animations.bounces', ['fx.animations.create'])

.animation('.fx-bounce-normal', ['BounceAnimation', function (BounceAnimation){
  var effect = {
    first: {opacity: 0, transform: 'scale(.3)'},
    mid: {opacity: 1, transform: 'scale(1.05)'},
    third: {transform: 'scale(.9)'},
    end: {opacity: 1, transform: 'scale(1)'},
    animation: 'bounce-normal'
  };

  return new BounceAnimation(effect);
}])

.animation('.fx-bounce-down', ['BounceAnimation', function (BounceAnimation){
  var effect = {
    first: {opacity: 0, transform: 'translateY(-2000px)'},
    mid: {opacity: 1, transform: 'translateY(30px)'},
    third: {transform: 'translateY(-10px)'},
    end: {transform: 'translateY(0)'},
    animation: 'bounce-down'
  };

  return new BounceAnimation(effect);
}])

.animation('.fx-bounce-left', ['BounceAnimation', function (BounceAnimation){
  var effect = {
    first: {opacity: 0,  transform: 'translateX(-2000px)'},
    mid: {opacity: 1, transform: 'translateX(30px)'},
    third: {transform: 'translateX(-10px)'},
    end: {transform: 'translateX(0)'},
    animation: 'bounce-left'
  };

  return new BounceAnimation(effect);
}]);
angular.module('fx.animations',
  [
    'fx.animations.fades',
    'fx.animations.bounces'
  ]

);

