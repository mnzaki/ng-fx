(function(angular){
  "use strict";

  angular.module('fx.animations.zooms', ['fx.animations.create'])

  .animation('.fx-zoom-normal', ['ZoomAnimation', function (ZoomAnimation){
    var effect = {
      start: {opacity: 0, transform: 'scale(.3)'},
      end: {opacity: 1, transform: 'scale(1)'},
      animation: 'zoom-normal'
    };

    return new ZoomAnimation(effect);
  }]);
}(angular));