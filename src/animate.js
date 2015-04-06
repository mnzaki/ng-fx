/*!
* ngFx.js is a concatenation of:
* angular-animate.js and TweenMax.js
*/
/*!
* ngFx.js is a concatenation of:
* angular-animate.js and TweenMax.js
*/

/*!
* Copyright 2015 Scott Moss
*
*
* A simple, beautiful animation library for angular
* http://hendrixer.github.io
*
* By @Hendrixer
*
* Licensed under the MIT license.
*
*/

angular.module('fx.transitions',
  [
    'fx.transitions.slides',
    'fx.transitions.scales',
    'fx.transitions.rotations',
    'fx.transitions.specials',
    'fx.transitions.view'
  ]
);
angular.module('ngFx', ['fx.animations', 'fx.transitions']);




