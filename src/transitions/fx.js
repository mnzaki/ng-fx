
angular.module('fx.transitions.view', [])

.directive('fxAnimate', function($injector) {
  return {
    // priority: 1000,
    link: function($scope, $ele) {

      var $state, $route;

      function addAnimations(animations, ele) {
        angular.forEach(animations, function(animation, type) {
          if (type === 'ease') {
            animation = 'fx-easing-' + animation;
          }

          if (type === 'speed') {
            animation = 'fx-speed-' + animation;
          }
          ele.addClass(animation);
        });
      }

      if ($injector.has('$state')) {
        $state = $injector.get('$state');
      }

      if ($injector.has('$route')) {
        $route = $injector.get('$route');
      }


      var animations;
      if ($state && $state.current.animation && $route && $route.current){
          if ($route.current.$$route && $route.current.$$route.animation){
            throw new Error('You can only add animations on either $state or $route');
          }
      }

      if ($state) {
        animations = $state.current.animation;
      }

      if ($route && $route.current) {
        animations = $route.current.$$route.animation;
      }

      addAnimations(animations, $ele);
    }
  };
});
