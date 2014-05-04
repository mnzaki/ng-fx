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
  }])

  .animation('.fx-zoom-down', ['ZoomAnimation', function (ZoomAnimation){
    var effect = {
      start: {opacity: 0, transform: 'scale(.1) translateY(-2000px)', animationTimingFunction: 'ease-in-out'},
      end: {opacity: 1, transform: 'scale(1) translateY(60px)', animationTimingFunction: 'ease-out'},
      animation: 'zoom-down'
    };

    return new ZoomAnimation(effect);
  }]);
}(angular));