var app = angular.module('app', ['ngFx' ,'ui.bootstrap', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.tpl.html',
      animation: {
        enter: 'slide-in-left',
        leave: 'slide-out-left',
        ease: 'back',
        speed: 500
      }
    })
    .state('view', {
      url: '/view',
      templateUrl: 'templates/view.tpl.html',
      animation: {
        enter: 'slide-in-left',
        leave: 'slide-out-left',
        ease: 'back',
        speed: 500
      }
    });

    $urlRouterProvider.otherwise('/home');
});

app.controller('MainController', ['$scope', '$timeout', '$q', function($scope, $timeout, $q){
  $scope.$on('fade-normal:enter', function () {
    console.log('fade enter');
  });

  $scope.$on('fade-normal:leave', function () {
    console.log('fade-leave');
  });

  var cleanOut;
  var playTime;
  $scope.demo = {};
  $scope.demo.cards = [];
  $scope.demo.ease = 'back';
  $scope.demo.speed = 500;
  $scope.demo.speeds = [100];
  getSpeeds();
  function getSpeeds(){
    for(var i = 200; i < 1500; i+=100){
      $scope.demo.speeds.push(i);
    }
  }
  $scope.demo.mainAnimation = null;
  var animations = [
    'zoom-right',
    'zoom-left',
    'zoom-down',
    'zoom-up',
    'zoom-normal',
    'rotate-counterclock-up',
    'rotate-clock',
    'rotate-counterclock',
    'rotate-clock-left',
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
    'bounce-left',
    'bounce-up',
    'bounce-right'
  ];
  $scope.demo.animations = shuffle(animations);
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

  $scope.demo.clear = function(animation){
    $scope.demo.stop();
    var cache = $scope.demo.animations;
    $scope.animations = [];
    $scope.demo.animations = cache;
    $scope.demo.addCards(animation);
  };
  $scope.demo.setSpeed = function(speed){
    $scope.demo.speed = speed;
  };

  $scope.demo.setEase = function(ease){
    $scope.demo.ease = ease;
  };



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
      }, $scope.demo.speed * 6.5);
      playTime = $timeout(function(){
        $scope.demo.play(++index);
      }, $scope.demo.speed * 14.5);
    }
  };

  $scope.demo.stop = function(){
    $timeout.cancel(cleanOut);
    $timeout.cancel(playTime);
  };

  // $timeout(function(){
  //   $scope.demo.play(0);
  // }, 1500);

  function shuffle (obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    angular.forEach(obj, function(value) {
      rand = random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  }

  function random (min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }

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

app.directive('anchor', function(){
  return function ($scope){

    $scope.$watch('$parent.demo.mainAnimation', function(val){
      if($scope.animation === val){
        $scope.$emit('scroll',$scope.$parent.demo.animations.indexOf($scope.animation));
      }
    });
  };
});

app.directive('scroll', function(){
  return function ($scope, el){
    $scope.$on('scroll', function(index){
      var position = index.targetScope.$index;
      if(position > 1){
        var scrollWindow = el.prop('scrollHeight');
        var to = scrollWindow - (position * 20);
        el.prop('scrollTop', scrollWindow - to);
      }
    });
  };
});


