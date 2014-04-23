(function(angular, TweenMax, TimelineMax){
  "use strict";

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
        inEffect.ease = options.ease.easeOut;
        TweenMax.set(element, outEffect);
        TweenMax.to(element, options.duration, inEffect);
        return function (canceled){
          var timer = element.data(timeoutKey);
          if(canceled){
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
        Assist.addTimer(options, element, done);
        outEffectLeave.ease = options.ease.easeIn;
        TweenMax.set(element, inEffect);
        TweenMax.to(element, options.duration, outEffectLeave);
        return function (canceled){
          var timer = element.data(timeoutKey);
          if(canceled){
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
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

      this.addClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'addClass';
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
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'removeClass';
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
          var options = Assist.parseClassList(element);
          options.motion = 'leave';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          options.stagger = true;
          Assist.addTimer(options, element, done);
          var move = new TimelineMax();
          move.to(element, start);
          move.to(element, options.duration, mid);
          move.to(element, options.duration, third);
          move.to(element, options.duration, end);
          return function (canceled) {
            if(canceled){
              move.kill();
            }
          };

        };
        this.addClass = function(element, className, done){
          if(className === 'ng-hide'){
            var options = Assist.parseClassList(element);
            options.motion = 'beforeAddClass';
            options.animation = fx_type;
            options.timeoutKey = timeoutKey;
            Assist.addTimer(options, element, done);
            var bac = new TimelineMax();
            bac.to(element, end);
            bac.to(element, options.duration, third);
            bac.to(element, options.duration, mid);
            bac.to(element, options.duration, start);
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
          if(className === 'ng-hide'){
            var options = Assist.parseClassList(element);
            options.motion = 'removeClass';
            options.animation = fx_type;
            options.timeoutKey = timeoutKey;
            var rc = new TimelineMax();
            rc.to(element, start);
            rc.to(element, options.duration, mid);
            rc.to(element, options.duration, third);
            rc.to(element, options.duration, end);
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
  }]);
}(angular, TweenMax, TimelineMax));

