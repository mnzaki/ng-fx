/*!
 * ngFx.js is a concatenation of:
 * angular-animate.js and TweenMax.js
 */
/*!
 * ngFx.js is a concatenation of:
 * angular-animate.js and TweenMax.js
 */

/*!
 * Copyright 2014 Scott Moss
 * http://www.scottymoss.com
 *
 * A simple, beautiful animation library for angular
 * http://hendrixer.github.io
 *
 * By @Hendrixer
 *
 * Licensed under the MIT license.
 *
 */

(function(angular){
  "use strict";

  angular.module('fx.animations',
    ['fx.animations.fades',
      'fx.animations.bounces',
      'fx.animations.rotations',
      'fx.animations.zooms'
      ]
  );
  angular.module('fx.transitions',
    [
      'fx.transitions.slides',
      'fx.transitions.scales',
      'fx.transitions.rotations',
      'fx.transitions.specials',
      'fx.transitions.view'
    ]
  );
  angular.module('ngFx', ['fx.animations', 'fx.transitions', 'ngAnimate']);
}(angular));



