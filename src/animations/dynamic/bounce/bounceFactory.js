
angular.module('fx.animations.bounces.factory', ['fx.animations.assist'])
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
      options.timeoutKey = Assist.timeoutKey;
      options.stagger = true;
      Assist.addTimer(options, element, done);
      var enter = new TimelineMax();
      enter.to(element, 0.01, start);
      enter.to(element, options.duration, mid);
      enter.to(element, options.duration, third);
      enter.to(element, options.duration, end);
      return function (canceled){
        if(canceled){
          var timer = element.data(Assist.timeoutKey);
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
        var bac = new TimelineMax();
        bac.to(element, startTime, end);
        bac.to(element, options.duration, third);
        bac.to(element, options.duration, mid);
        bac.to(element, options.duration, start);
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
        var rc = new TimelineMax();
        rc.to(element, startTime, start);
        rc.to(element, options.duration, mid);
        rc.to(element, options.duration, third);
        rc.to(element, options.duration, end);
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
}])

