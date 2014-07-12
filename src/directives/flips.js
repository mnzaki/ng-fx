(function(angular, TweenMax){
  "use strict";
  angular.module('fx.directives.flips', [])

  .directive('fxFlip', ['$animate', function($animate){
    function postlink(scope, el, attr){
      var front,
          back,
          wrapper = angular.element(el.children()[0]),
          events = attr.fxFlip.split(' '),
          axis = attr.axis.toUpperCase();

      angular.forEach(el.children().children(), function(child){
        child = angular.element(child);
        if(child.hasClass('fx-front')){front = child;}
        if(child.hasClass('fx-back')) {back = child;}
      });

      back.css({position: 'absolute', width: '100%', height: '100%'});
      front.css({position: 'absolute', width: '100%', height: '100%'});

      TweenMax.set(el, {perspective: 800, border: 'solid 2px black'});
      TweenMax.set(wrapper, {transformStyle: 'preserve-3d', width: '100%', height: '100%'});
      TweenMax.set(back, {transform: 'rotate3d(0,1,0,-180deg)'});
      TweenMax.set([back, front], {backfaceVisibility: 'hidden'});

      angular.forEach(events, function(){
        scope.$on('next', function(){
          if(el.hasClass('fx-flip'+axis)){
            $animate.removeClass(el, 'fx-flip'+axis);
          } else {
            $animate.addClass(el, 'fx-flip'+axis);
          }
        });
      });
    }
    return {
      replace: true,
      transclude: true,
      scope: true,
      template:
        '<div ng-transclude></div>',
      link: postlink
    };
  }]);
}(angular, TweenMax));
