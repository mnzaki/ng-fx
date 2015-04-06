
angular.module('fx.animations.fades.factory', ['fx.animations.assist'])
  .factory('FadeAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist){
  return function (effect){
    var inEffect        = effect.enter,
        outEffect       = effect.leave,
        outEffectLeave  = effect.inverse || effect.leave,
        fx_type         = effect.animation;

    this.enter = function(element, done){
      var options = Assist.parseClassList(element);
      options.motion = 'enter';
      options.animation = fx_type;
      options.timeoutKey = Assist.timeoutKey;
      Assist.addTimer(options, element, done);
      inEffect.ease = options.ease.easeOut;
      TweenMax.set(element, outEffect);
      TweenMax.to(element, options.duration, inEffect);
      return function (canceled){
        var timer = element.data(timeoutKey);
        if(canceled){
          if(timer){
            Assist.removeTimer(element, Assist.timeoutKey, timer);
          }
        }
      };
    };

    this.leave = function(element, done){
      var options = Assist.parseClassList(element);
      options.motion = 'leave';
      options.animation = fx_type;
      options.timeoutKey = Assist.timeoutKey;
      Assist.addTimer(options, element, done);
      outEffectLeave.ease = options.ease.easeIn;
      TweenMax.set(element, inEffect);
      TweenMax.to(element, options.duration, outEffectLeave);
      return function (canceled){
        var timer = element.data(Assist.timeoutKey);
        if(canceled){
          if(timer){
            Assist.removeTimer(element, Assist.timeoutKey, timer);
          }
        }
      };
    };

    this.move = this.enter;

    this.addClass = function(element, className, done){
      if(className){
        var options = Assist.parseClassList(element);
        options.motion = 'enter';
        options.animation = fx_type;
        options.timeoutKey = Assist.timeoutKey;
        Assist.addTimer(options, element, done);
        TweenMax.to(element, options.duration, outEffectLeave);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, Assist.timeoutKey, timer);
            }
          }
        };
      } else {
        done();
      }
    };

    this.removeClass = function(element, className, done){
      if(className){
        var options = Assist.parseClassList(element);
        options.motion = 'leave';
        options.animation = fx_type;
        options.timeoutKey = Assist.timeoutKey;
        TweenMax.set(element, outEffect);
        TweenMax.to(element, options.duration, inEffect);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, Assist.timeoutKey, timer);
            }
          }
        };
      } else {
        done();
      }
    };
  };
}]);
