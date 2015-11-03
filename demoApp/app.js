angular.module('app', [
  'ngMaterial',
  'ngAnimate',
  'ngFx',
  'ui.router',
  'app.ngShowHide'
])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('cyan');
})
.factory('Demo', function() {
  return {
    stagger: 0,
    speed: 300,
    ease: 'none',
    curves: [
      'none',
      'back',
      'expo',
      'circ',
      'quint',
      'quart',
      'cubic',
      'quad',
      'sine'
    ],
    animation: 'fx-light-speed',
    animations: [
      'fx-fade-normal',
      'fx-fade-down',
      'fx-fade-down-big',
      'fx-fade-left',
      'fx-fade-left-big',
      'fx-fade-right',
      'fx-fade-right-big',
      'fx-fade-up',
      'fx-fade-up-big',
      'fx-bounce-normal',
      'fx-bounce-down',
      'fx-bounce-left',
      'fx-bounce-up',
      'fx-bounce-right',
      'fx-rotate-up-left',
      'fx-rotate-up-right',
      'fx-rotate-down-left',
      'fx-rotate-down-right',
      'fx-zoom-normal',
      'fx-zoom-up',
      'fx-zoom-down',
      'fx-zoom-left',
      'fx-zoom-right',
      'fx-light-speed'
    ]
  };
})
.directive('navList', function() {
  return {
    scope: {},
    replace: true,
    controllerAs: 'vm',
    controller: function(Demo) {
      this.events = [
        {name: 'ng-show / ng-hide', state: 'ngShowHide'},
        {name: 'ng-if', state: 'ngIf'}
        // 'ng-if',
        // 'ng-class',
        // 'ng-repeat',
        // 'ng-switch',
        // 'ng-messages'
      ];
      
      this.demo_config = Demo;

    },
    templateUrl: `nav-list.html`
  };
})
.directive('codeExample', function() {
  return {
    scope: {},
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<md-card class="example"><pre class="language-{{lang}}"><code ng-transclude></code></pre></md-card>',
    link: function(scope, element, attr) {
      scope.lang = attr.lang;
      var code = element.find('code');
      code.ready(function() {
        Prism.highlightElement(code[0]);
      });
    }
  }
});
