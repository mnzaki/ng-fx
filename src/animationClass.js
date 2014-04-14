angular.module('animations.create', [])

.factory('Animation', function(){
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
        inEffect.onComplete = done;
        TweenMax.set(element, outEffect);
        enter = TweenMax.to(element, duration, inEffect);
        return function (canceled){
          if(canceled){
            console.log('enter canceled', enter);

          }
        };
      };

      this.leave = function(element, done){
        outEffect.onComplete = done;
        TweenMax.set(element, inEffect);
        leave = TweenMax.to(element, duration, outEffectLeave);
        return function (canceled){
          if(canceled){
            console.log('leave canceled');
          }
        };
      };

      this.move = function(element, done){
        inEffect.onComplete = done;
        TweenMax.set(element, outEffect);
        move = TweenMax.to(element. duration, inEffect);
        return function (canceled){
          if(canceled){
            console.log('moved canceled');
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