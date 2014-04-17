angular.module('animations.create', ['animations.assist'])




.factory('FadeAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist){
  return function (effect){
    var inEffect        = effect.enter,
        outEffect       = effect.leave,
        outEffectLeave  = effect.inverse || effect.leave,
        duration        = effect.duration,
        enter,
        leave,
        move;

    this.enter = function(element, done){
      var options = Assist.parseClassList(element);
      var emit;
      options.trigger ? inEffect.onComplete = Assist.emit(element, effect.animation, 'enter') : inEffect.onComplete = done;
      inEffect.ease = $window[options.ease].easeOut;
      TweenMax.set(element, outEffect);
      enter = TweenMax.to(element, duration, inEffect);
      return function (canceled){
        if(canceled){
          $timeout(function(){
            angular.element(element).remove();
          }, 300);
        }
      };
    };

    this.leave = function(element, done){
      var options = Assist.parseClassList(element);
      options.trigger ? outEffectLeave.onComplete = Assist.emit(element, effect.animation, 'leave') : outEffectLeave.onComplete = done;
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
          if(canceled){
            $timeout(function(){
              angular.element(element).remove();
            }, 800);
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

