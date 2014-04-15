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