angular.module('app', [
  'ngMaterial',
  'ngAnimate',
  'ng-fx',
  'ui.router',
  'app.ngShowHide',
  'app.ngIf',
  'app.ngClass',
  'app.ngRepeat'
  
])
.config(function($mdThemingProvider, $sceDelegateProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('cyan');
  $sceDelegateProvider.resourceUrlWhitelist([
    'https://ghbtns.com/**',
    'self'
  ]);
})
.factory('Demo', function() {
  return {
    stagger: 0,
    speed: 600,
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
        {name: 'ng-if', state: 'ngIf'},
        {name: 'ng-class', state: 'ngClass'},
        {name: 'ng-repeat', state: 'ngRepeat'}
        // {name: 'ng-switch', state: 'ngSwitch'},
        // {name: 'ng-messages', state: 'ngMessages'}
      ];
      
      this.demo_config = Demo;

    },
    templateUrl: `nav-list.html`
  };
})
.directive('hljs', function(Demo, $interpolate) {
  return {
    restrict: 'A',
    scope: true,
    compile: function(tElem, tAttr) {
      var interpolateFn = $interpolate(tElem.html(), true);
      tElem.html('');
      return function(scope, elem, attrs){
        
        scope.$watch(interpolateFn, function (value) {
          elem.html(hljs.highlight(attrs.lang, value).value);
        });
      }
    }
  }
})
.directive('promotionFooter', function() {
  return {
    restrict: 'E',
    scope: {
      github: '@',
      home: '@'
    },
    bindToController: true,
    templateUrl: 'promotion-footer.html',
    controllerAs: 'vm',
    controller: function() {
      this.githubStarsUrl = `https://ghbtns.com/github-btn.html?user=${this.github}&repo=ngFx&type=star&count=true&size=large`
    }
  }
});
