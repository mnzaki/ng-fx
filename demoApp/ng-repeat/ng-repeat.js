angular.module('app.ngRepeat', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('ngRepeat', {
    url: '/ng-repeat',
    template: '<page-ng-repeat></page-ng-repeat>'
  });
})
.directive('pageNgRepeat', function() {
  return {
    replace: true,
    scope: {},
    controllerAs: 'vm',
    controller: function(Demo) {
      this.demo_config = Demo;
      this.items = '000000000000'.split('').map(function(v, i) {
        return {num: i};
      });
      console.log(this.items)
    },
    templateUrl: '/ng-repeat/ng-repeat-template.html'
  }
})
