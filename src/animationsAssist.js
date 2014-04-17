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