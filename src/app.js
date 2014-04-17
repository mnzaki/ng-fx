var app = angular.module('app', ['ngAnimate', 'animations']);

app.controller('MainController', ['$scope', '$timeout', '$q', function($scope, $timeout, $q){

  $scope.demo = {};
  $scope.demo.cards = [];
  $scope.demo.count = 0;
  function listeners(){
    angular.forEach($scope.demo.animations, function (className){
      $scope.$on(className, function(){
        $scope.$apply(function(){
          $scope.demo.count +=1;
        });
      });
    });
  }

  $scope.demo.mainAnimation = null;
  $scope.demo.animations = [
    'fade-normal',
    'fade-down',
    'fade-down-big',
    'fade-left',
    'fade-left-big',
    'fade-right',
    'fade-right-big',
    'fade-up',
    'fade-up-big',
    'bounce-normal',
    'bounce-down',
    'bounce-left'
  ];

  listeners();

  $scope.demo.addCards = function(animation){
    if($scope.demo.cards && $scope.demo.cards.length){
      $scope.demo.cards = [];
    }
      $scope.demo.populate(animation);
  };

  $scope.demo.populate = function(animation){
    $scope.demo.mainAnimation = animation;
    var pushToCards = function(data){
      return function (){
        $scope.demo.cards.push({'header': data, 'type': animation});
      };
    };
    var i   = 1,
        end = 10;
    for( ; i < end; i++){
      $timeout(pushToCards('Item: '+i), i * 300);
    }
  };

  $scope.demo.removeCard = function(index){
    $scope.demo.cards.splice(index, 1);
  };

  $scope.demo.erase = function(){
    $scope.demo.clean().then(function(){
      $scope.demo.mainAnimation = null;
    });
  };

  $scope.demo.clean = function(){
    var dfrd = $q.defer();
    var popCards = function(index){
      return function(){
        $scope.demo.cards.pop();
        if(index >= 8){

          dfrd.resolve(index);
        }
      };
    };
    angular.forEach($scope.demo.cards, function (card, index){
      $timeout(popCards(index), 400 * index);
    });
    return dfrd.promise;
  };

  $scope.demo.play = function(index){
    var animation = $scope.demo.animations[index];
    if(animation){
      $scope.demo.mainAnimation = animation;
      $scope.demo.addCards(animation);
      $timeout(function(){
        $scope.demo.clean();
      }, 4000);
      $timeout(function(){
        $scope.demo.play(++index);
      }, 7000);
    }
  };

  // $timeout(function(){
  //   $scope.demo.play(0);
  // }, 1500);

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

app.directive('remove', [ '$animate', function ($animate){
  function link(scope, element, attrs){
    scope.$on('fade-down', function(){
      console.log('in remove');
      element.remove();
    });
  }

  return {
    link: link
  };
}]);

