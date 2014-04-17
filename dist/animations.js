angular.module('animations.assist', [])


.factory('Assist', function ($filter){
  return {

    emit: function(element, name, trigger){

      var $scope = angular.element(element).scope();
      return function (){
        $scope.$emit(trigger + name);
      };
    },

    parseClassList: function(element){
      var list = element[0].classList,
          results = {trigger: false, ease: 'Elastic'};
      angular.forEach(list, function (className){
        if(className.slice(0,9) === 'ef-easing'){
          results.ease = ($filter('cap')(className.slice(10)));
        }
        if(className === 'ef-trigger'){
          results.trigger = true;
        }
      });
      return results;
    }
  };
})

.filter('cap', function(){
  return function (input){
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
});
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


var fades = angular.module('animations.fades', ['animations.create']);


fades.animation('.ef-fade-normal', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1},
    leave: {opacity: 0},
    duration: 0.6,
    animation: 'fade-normal'
  };

  return new FadeAnimation(effect);
});


fades.animation('.ef-fade-down', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.8,
    inverse: {opacity: 0, transform: 'translateY(20px)'},
    animation: 'fade-down'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-down-big', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-2000px)'},
    inverse: {opacity: 0, transform: 'translateY(2000px)'},
    duration: 0.8,
    animation: 'fade-down-big'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-left', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-20px)'},
    inverse: {opacity: 0, transform: 'translateX(20px)'},
    duration: 0.8,
    animation: 'fade-left'
  };
  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-left-big', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-2000px)'},
    inverse: {opacity: 0, transform: 'translateX(2000px)'},
    duration: 0.8,
    animation: 'fade-left-big'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-right', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(20px)'},
    inverse: {opacity: 0, transform: 'translateX(-20px)'},
    duration: 0.8,
    animation: 'fade-right'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-right-big', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform:'translateX(2000px)'},
    inverse: {opacity: 0, transform: 'translateX(-2000px)'},
    duration: 0.8,
    animation: 'fade-right-big'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-up', function (FadeAnimation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform:'translateY(20px)'},
    inverse: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.8,
    animation: 'fade-up'
  };

  return new FadeAnimation(effect);
});

fades.animation('.ef-fade-up-big', function (FadeAnimation){
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

bounces.animation('.ef-bounce-normal', function (BounceAnimation){
  var effect = {
    first: {opacity: 0, transform: 'scale(.3)'},
    mid: {opacity: 1, transform: 'scale(1.05)'},
    third: {transform: 'scale(.9)'},
    end: {opacity: 1, transform: 'scale(1)'},
    duration: 0.2
  };

  return new BounceAnimation(effect);
});

bounces.animation('.ef-bounce-down', function (BounceAnimation){
  var effect = {
    first: {opacity: 0, transform: 'translateY(-2000px)'},
    mid: {opacity: 1, transform: 'translateY(30px)'},
    third: {transform: 'translateY(-10px)'},
    end: {transform: 'translateY(0)'},
    duration: 0.2
  };

  return new BounceAnimation(effect);
});

bounces.animation('.ef-bounce-left', function (BounceAnimation){
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

