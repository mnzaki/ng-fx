var app = angular.module('app', ['ngAnimate', 'animations', 'ui.bootstrap']);

app.controller('MainController', ['$scope', '$timeout', '$q', function($scope, $timeout, $q){

  $scope.demo = {};
  $scope.demo.cards = [];
  $scope.demo.ease = 'cubic';
  $scope.demo.speed = 500;
  $scope.demo.speeds = [100];
  getSpeeds();
  function getSpeeds(){
    for(var i = 200; i < 1500; i+=100){
      $scope.demo.speeds.push(i);
    }
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

  $scope.demo.easings = [
    'quad',
    'cubic',
    'quart',
    'quint',
    'strong',
    'back',
    'bounce',
    'circ',
    'elastic',
    'expo',
    'sine'
  ];


  $scope.demo.setSpeed = function(speed){
    $scope.demo.speed = speed;
  };

  $scope.demo.setEase = function(ease){
    $scope.demo.ease = ease;
  };

  var cleanOut;
  var playTime;

  function populate(animation){
    if(cleanOut){
      $scope.demo.stop();
    }

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
  }

  $scope.demo.addCards = function(animation){
    if($scope.demo.cards && $scope.demo.cards.length){
      $scope.demo.clean().then(function(){
        populate(animation);
      });
    } else {
      populate(animation);

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
        if(!$scope.demo.cards.length){

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
      cleanOut = $timeout(function(){
        $scope.demo.clean();
      }, $scope.demo.speed * 6);
      playTime = $timeout(function(){
        $scope.demo.play(++index);
      }, $scope.demo.speed * 14);
    }
  };

  $scope.demo.stop = function(){
    $timeout.cancel(cleanOut);
    $timeout.cancel(playTime);
  };

  $timeout(function(){
    $scope.demo.play(0);
  }, 1500);

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

