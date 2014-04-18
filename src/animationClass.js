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

