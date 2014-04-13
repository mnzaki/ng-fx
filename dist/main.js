var fades = angular.module('animations.fades', []);


fades.animation('.fade-normal', function(){
  var fadeOut,
      fadeIn,
      fadeMove;
  return {
    enter: function(element, done){
      TweenMax.set(element, {opacity: 0});
      fadeIn = TweenMax.to(element, 0.5, {opacity: 1, onComplete: done});
      return function(canceled){
        if(canceled){
          console.log('enter canceled');

          fadeIn.kill();
        }
      };
    },

    leave: function(element, done){
      TweenMax.set(element, {opacity: 1});
      fadeOut = TweenMax.to(element, 0.3, {opacity: 0, onComplete: done});
      return function(canceled){
        if(canceled){
          // FIXME causes extra element to be appended to page if you cancel the leave animation
          // may be an issue with angular

        }
      };
    },

    move: function(element, done){
      TweenMax.set(element, {opacity: 0.3});
      fadeMove = TweenMax.to(element, 0.3, {opacity: 1, onComplete: done});
      return function(canceled){
        if(canceled){
          console.log('move canceled');
          fadeMove.kill();
        }
      };
    },
    beforeAddClass: function(element, className, done){
      if(className === 'ng-hide'){
        console.log('it does');
        TweenMax.to(element, 0.3, {opacity: 0, onComplete: done});
      } else {
        done();
      }
    },

    removeClass: function(element, className, done){
      if(className === 'ng-hide'){
        TweenMax.set(element, {opacity: 0});
        TweenMax.to(element, 0.3, {opacity: 1});
      } else {
        done();
      }
    }
  };
});


fades.animation('.fade-down', function(){
  var fadeDownEnter,
      fadeDownLeave,
      fadeDownMove;
  return {
    enter: function(element, done){
      TweenMax.set(element, {opacity: 0, transform: 'translateY(-20px)'});
      fadeDownEnter = TweenMax.to(element, 0.3, {opacity: 1, transform: 'translateY(0)', onComplete: done});
      return function(canceled){
        if(canceled){
          console.log('here in enter');
          fadeDownEnter.kill();
        }
      };
    },

    leave: function(element, done){
      TweenMax.set(element, {opacity: 1, transform: 'translateY(0)'});
      fadeDownLeave = TweenMax.to(element, 0.3, {opacity: 0, transform: 'translateY(20px)', onComplete: done});
      return function(canceled){
        if(canceled){

        }
      };
    },

    move: function(element, done){
      TweenMax.set(element, {opacity: 0.3});
      fadeDownMove = TweenMax.to(element, 0.2, {opacity: 1});
      return function(canceled){
        if(canceled){
          fadeDownMove.kill();
        }
      };
    },

    beforeAddClass: function(element, className, done){
      if(className === 'ng-hide'){
        TweenMax.to(element, 0.3, {opacity: 0, transform: 'translateY(20px)', onComplete: done});
      } else {
        done();
      }
    },

    removeClass: function(element, className, done){
      if(className === 'ng-hide'){
        TweenMax.set(element, {opacity: 0, transform: 'translateY(-20px)'});
        TweenMax.to(element, 0.3, {opacity: 1, transform: 'translateY(0)', onComplete: done});
      } else {
        done()
      }
    }
  };
})
var animate = angular.module('animations',
  [
    'animations.fades'
  ]

);


var app = angular.module('app', ['ngAnimate', 'animations']);

app.controller('MainController', ['$scope', '$timeout', '$q', function($scope, $timeout, $q){
  var demo = $scope.demo = {};
  demo.cards = [];
  demo.data = [
    'News',
    'Stocks',
    'Tweets',
    'Weather',
    'Blog',
    'Email',
    'Sports',
    'Messages',
    'Requests'
  ];
  demo.mainAnimation = null;
  demo.animations = [
    'fade-normal',
    'fade-down'
  ];

  demo.addCards = function(animation){
    if(demo.cards.length){
      demo.cards = [];
    }
    demo.mainAnimation = animation;
    var pushToCards = function(data){
      return function (){
        demo.cards.push({'header': data, 'type': animation});
      };
    };
    angular.forEach(demo.data, function (header, index){
      $timeout(pushToCards(header), index * 100);
    });
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
      $timeout(popFromCards(), index * 100);
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