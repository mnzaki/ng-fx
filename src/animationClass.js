angular.module('animations.create', [])

.factory('Animation', function($timeout){
  var getScope = function(e){
    return angular.element(e).scope();
  };
  var complete = function(element, name){
    var $scope = getScope(element);
    return function (){
      $scope.$emit(name);
    };
  };
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
        inEffect.onComplete = complete(element, effect.class);
        inEffect.paused = true;
        TweenMax.set(element, outEffect);
        enter = TweenMax.to(element, duration, inEffect);
        enter.play();
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
        outEffect.onComplete = done;
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
    }
  };
});