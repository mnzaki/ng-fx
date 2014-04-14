var app = angular.module('app', ['ngAnimate', 'animations']);

app.controller('MainController', ['$scope', '$timeout', '$q', function($scope, $timeout){
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