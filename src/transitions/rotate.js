(function (angular) {
  "use strict";

  angular.module('fx.transitions.rotations', ['fx.transitions.create'])

  .animation('.rotate-out-right', ['RotationTransition', function (RotationTransition) {
    var effect = {
      from: {transform: 'rotateY(15deg)', opacity: '.8'},
      to: {transform: 'scale(0.8) translateZ(-200px)', opacity: '0'},
      when: 'leave',
      duration: 0.5
    };

    return new RotationTransition(effect);
  }]);
}(angular));