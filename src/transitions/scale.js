(function (angular) {
  "use strict";

  angular.module('fx.transitions.scales', ['fx.transitions.create'])

  .animation('.shrink-in', ['SlideTransition', function (SlideTransition) {
    var effect = {
      from: {opacity: '0', transform: 'translateZ(0) scale(1.2)'},
      duration: 0.5
    };

    return new SlideTransition(effect);
  }])
  .animation('.shrink-out', ['SlideTransition', function (SlideTransition) {
    var effect = {
      to: {opacity: '0', transform: 'translateZ(0) scale(.8)'},
      duration: 0.5
    };

    return new SlideTransition(effect);
  }])
  .animation('.grow-in', ['SlideTransition', function (SlideTransition) {
    var effect = {
      from: {opacity: '0', transform: 'translateZ(0) scale(.8)'},
      duration: 0.5
    };

    return new SlideTransition(effect);
  }])
  .animation('.grow-out', ['SlideTransition', function (SlideTransition) {
    var effect = {
      to: {opacity: '0', transform: 'translateZ(0) scale(1.2)'},
      duration: 0.5
    };

    return new SlideTransition(effect);
  }]);
}(angular));