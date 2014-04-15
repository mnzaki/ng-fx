angular.module('animations.create', [])

.factory('Animation', function(){
  var getScope = function(e){
    return angular.element(e).scope();
  };
  var complete = function(element, name){
    console.log(element);
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
        TweenMax.set(element, outEffect);
        enter = TweenMax.to(element, duration, inEffect);
        return function (canceled){
          if(canceled){

          }
        };
      };

      this.leave = function(element, done){
        outEffect.onComplete = done;
        TweenMax.set(element, inEffect);
        leave = TweenMax.to(element, duration, outEffectLeave);
        return function (canceled){
          if(canceled){
            leave.resume();
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
var fades = angular.module('animations.fades', ['animations.create']);


fades.animation('.fade-normal', function (Animation){
  var effect = {
    enter: {opacity: 1},
    leave: {opacity: 0},
    duration: 0.3,
    class: 'fade-normal'
  };

  return new Animation.create(effect);
});


fades.animation('.fade-down', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-20px)'},
    duration: 0.3,
    inverse: {opacity: 0, transform: 'translateY(20px)'}
  };

  return new Animation.create(effect);
});

fades.animation('.fade-down-big', function (Animation){
  var effect = {
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(-2000px)'},
    inverse: {opacity: 0, transform: 'translateY(2000px)'},
    duration: 0.5
  };

  return new Animation.create(effect);
});
var animate = angular.module('animations',
  [
    'animations.fades'
  ]

);


var app = angular.module('app', ['ngAnimate', 'animations']);

app.controller('MainController', ['$scope', '$timeout', '$q', function($scope, $timeout){
  $scope.$on('fade-normal', function(){
    console.log('got the done');
  });
  var demo = $scope.demo = {};
  demo.cards = [];

  demo.mainAnimation = null;
  demo.animations = [
    'fade-normal',
    'fade-down',
    'fade-down-big'
  ];

  demo.addCards = function(animation){
    if(demo.cards && demo.cards.length){
      demo.cards = [];
    }
    demo.mainAnimation = animation;
    var pushToCards = function(data){
      return function (){
        demo.cards.push({'header': data, 'type': animation});
      };
    };
    var i   = 1,
        end = 10;
    for( ; i < end; i++){
      $timeout(pushToCards('Item: '+i), i * 200);
    }

  };

  demo.removeCard = function(index){
    demo.cards.splice(index, 1);
  };

  demo.clean = function(){
    var popFromCards = function(){
      return function(){
        demo.cards.pop();
      };
    };
    angular.forEach(demo.cards, function (card, index){
      $timeout(popFromCards(), index * 300);
    });
  };

}]);

app.directive('card', function(){
  return {
    restrict: 'E',
    scope: {
      title: '@'
    },
    transclude: true,
    replace: true,
    template:
    '<div class="card">'+
      '<h4 class="card-header">{{ title }}</h4>'+
      '<div class="card-content" ng-transclude></div>'+
    '</div>'
  };
});