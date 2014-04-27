// Collect all the animations into one master module. this module is the main module

(function(angular){
  "use strict";
  angular.module('fx.animations',
    ['fx.animations.fades',
      'fx.animations.bounces',
      'fx.animations.rotations']
      );
}(angular));

