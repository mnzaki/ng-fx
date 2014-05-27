// Collect all the animations into one master module. this module is the main module

(function(angular){
  "use strict";
  angular.module('fx.animates',
    ['fx.animations.fades',
      'fx.animations.bounces',
      'fx.animations.rotations',
      'fx.animations.zooms'
      // 'fx.events.flip'
      ]
  );
  // angular.module('fx.directives',
  //   ['fx.directives.flips']
  // );

  angular.module('fx.animations', ['fx.animates'/*,'fx.directives'*/]);
}(angular));

