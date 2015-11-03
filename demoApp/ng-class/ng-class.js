angular.module('app.ngClass', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('ngClass', {
    url: '/ng-class',
    template: '<page-ng-class></page-ng-class>'
  });
})
.directive('pageNgClass', function() {
  return {
    replace: true,
    scope: {},
    controllerAs: 'vm',
    controller: function(Demo) {
      this.demo_config = Demo;
    },
    templateUrl: '/ng-class/ng-class-template.html'
  }
})
