angular.module('app.ngIf', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('ngIf', {
    url: '/ng-if',
    template: '<page-ng-if></page-ng-if>'
  });
})
.directive('pageNgIf', function() {
  return {
    replace: true,
    scope: {},
    controllerAs: 'vm',
    controller: function(Demo) {
      this.demo_config = Demo;
      this.show = true;
    },
    templateUrl: '/ng-if/ng-if-template.html'
  }
})
