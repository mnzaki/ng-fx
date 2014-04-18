angular.module('animations.assist', [])


.factory('Assist', ['$filter', '$window', '$timeout', function ($filter, $window, $timeout){
  return {

    emit: function(element, name, trigger){

      var $scope = angular.element(element).scope();
      $scope.$emit(trigger+name);

    },

    parseClassList: function(element){

      var list = element[0].classList,
          results = {trigger: false, duration: 0.3};
      angular.forEach(list, function (className){
        if(className.slice(0,9) === 'fx-easing'){
          var ease = $filter('cap')(className.slice(10));
          results.ease = $window[ease] ? ease : 'Elastic';
        }
        if(className === 'fx-trigger'){
          results.trigger = true;
        }
        if(className.slice(0,8) === 'fx-speed'){
          results.duration = parseInt(className.slice(9))/1000;
        }
      });
      return results;
    },

    addTimer: function(options, element, end){
      var self = this;
      var time = options.duration;
      var timer = $timeout(function(){
        if(options.trigger){
          self.emit(element, options.animation, options.motion);
        }
      }, time * 1000).then(end);
      element.data(options.timeoutKey, timer);
    },
    removeTimer: function(element, timeoutKey, timer){
      $timeout.cancel(timer);
      element.removeData(timeoutKey);
    }
  };
}])

.filter('cap', [function(){
  return function (input){
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
}]);