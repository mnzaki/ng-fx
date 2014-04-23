describe('Trigger feature', function(){
  var scope,
      element;
  beforeEach(module('fx.animations.assist'));
  beforeEach(module(function($controllerProvider){
    $controllerProvider.register('testController', function($scope){
      $scope.name = 'test';
    });
  }));

  it('should return a new animation instance', function(){
    inject(function($rootScope, $controller, $compile, Assist){
      scope = $rootScope.$new();
      $controller('testController', {
        $scope: scope
      });
      element = $compile('<div ng-controller="testController"class="fx-trigger">trigger</div>')(scope);
      $rootScope.$digest();
       spyOn(scope, '$emit');
      Assist.emit(element, 'fade-normal', 'enter');
      check(scope.$emit).toHaveBeenCalledWith('fade-normal enter');
    });
  });
});