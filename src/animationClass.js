(function(angular, TweenMax, TimelineMax){
  "use strict";
  var timeoutKey = '$$fxTimer';
  angular.module('fx.animations.create', ['fx.animations.assist'])

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

      this.move = this.enter;

      this.addClass = function(element, className, done){
        if(className === 'ng-hide'){
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
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'leave';
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
          startTime   = 0.1;


      this.enter = function(element, done){
        var options = Assist.parseClassList(element);
        options.motion = 'enter';
        options.animation = fx_type;
        options.timeoutKey = timeoutKey;
        options.stagger = true;
        Assist.addTimer(options, element, done);
        var enter = new TimelineMax();
        enter.to(element, 0.01, start);
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
        leave.to(element, startTime, end);
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

      this.move = this.enter;

      this.addClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'enter';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          Assist.addTimer(options, element, done);
          var bac = new TimelineMax();
          bac.to(element, startTime, end);
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
          options.motion = 'leave';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          var rc = new TimelineMax();
          rc.to(element, startTime, start);
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
  }])

  .factory('RotateAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist){
    return function (effect){
      var start       = effect.start,
          end         = effect.end,
          leaveEnd    = effect.inverse,
          fx_type     = effect.animation;

      this.enter = function(element, done){
        var options = Assist.parseClassList(element);
            options.motion = 'enter';
            options.animation = fx_type;
            options.timeoutKey = timeoutKey;

        end.ease = options.ease.easeOut;
        Assist.addTimer(options, element, done);
        TweenMax.set(element, start);
        TweenMax.to(element, options.duration, end);
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

        leaveEnd.ease = options.ease.easeIn;
        Assist.addTimer(options, element, done);
        TweenMax.set(element, end);
        TweenMax.to(element, options.duration, leaveEnd);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      };

      this.move = this.enter;

      this.addClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'enter';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          Assist.addTimer(options, element, done);
          TweenMax.set(element, end);
          TweenMax.to(element, options.duration, start);
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
          options.motion = 'enter';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          Assist.addTimer(options, element, done);
          TweenMax.set(element, start);
          TweenMax.to(element, options.duration, end);
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

  .factory('ZoomAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist){
    return function (effect){
      var start       = effect.start,
          end         = effect.end,
          fx_type     = effect.animation;

      this.enter = function(element, done){
        var options             = Assist.parseClassList(element);
            options.motion      = 'enter';
            options.animation   = fx_type;
            options.timeoutKey  = timeoutKey;
        end.ease = options.ease.easeOut;
        Assist.addTimer(options, element, done);
        TweenMax.set(element, start);
        TweenMax.to(element, options.duration, end);
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
        var options             = Assist.parseClassList(element);
            options.motion      = 'lave';
            options.animation   = fx_type;
            options.timeoutKey  = timeoutKey;

        start.ease = options.ease.easeIn;
        Assist.addTimer(options, element, done);
        TweenMax.set(element, end);
        TweenMax.to(element, options.duration, start);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      };

      this.move = this.enter;

      this.removeClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'leave';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          Assist.addTimer(options, element, done);
          TweenMax.set(element, start);
          TweenMax.to(element, options.duration, end);
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

      this.addClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'enter';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          Assist.addTimer(options, element, done);
          TweenMax.set(element, end);
          TweenMax.to(element, options.duration, start);
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
  .factory('Flip3d', ['$window', function ($window){
    return function (effect){
      var axis = effect.axis;
      var flipType = 'fx-flip'+axis;
      this.addClass = function(el, className, done){
        var wrapper = angular.element(el.children()[0]);
        var myDone = function(){
          console.log('done');
          return done();
        };
        if(className === flipType){
          effect.transform.ease = $window.Bounce.easeOut;
          effect.transform.onComplete = myDone;
          TweenMax.to(wrapper, effect.duration, effect.transform);
        } else {
          done();
        }
      };

      this.removeClass = function(el, className, done){
        var wrapper = angular.element(el.children()[0]);
        var myDone = function(){
          console.log('done');
          return done();
        };
        if(className === flipType){
          effect.reset.ease = $window.Bounce.easeOut;
          effect.reset.onComplete = myDone;
          TweenMax.to(wrapper, effect.duration, effect.reset);
        } else {
          done();
        }
      };
    };
  }]);
}(angular, TweenMax, TimelineMax));

