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
      start: {opacity: 0, transform: 'scale(.1) translateY(-2000px)'},
      end: {opacity: 1, transform: 'scale(1) translateY(0)'},
      animation: 'zoom-down'
    };

    return new ZoomAnimation(effect);
  }])

  .animation('.fx-zoom-up', ['ZoomAnimation', function (ZoomAnimation){
    var effect = {
      start: {opacity: 0, transform: "scale(.1) translateY(2000px)"},
      end: {opacity: 1, transform: "scale(1) translateY(0)"},
      animation: 'zoom-up'
    };

    return new ZoomAnimation(effect);
  }])

  .animation('.fx-zoom-right', ['ZoomAnimation', function (ZoomAnimation){
    var effect = {
      start: {opacity: 0, transform: 'scale(.1) translateX(2000px)'},
      end: {opacity: 1, transform: 'scale(1) translateX(0)'},
      animation: 'zoom-right'
    };

    return new ZoomAnimation(effect);
  }])

  .animation('.fx-zoom-left', ['ZoomAnimation', function (ZoomAnimation){
    var effect = {
      start: {opacity: 0, transform: 'scale(.1) translateX(-2000px)'},
      end: {opacity: 1, transform: 'scale(1) translateX(0)'},
      animation: 'zoom-left'
    };

    return new ZoomAnimation(effect);
  }]);
}(angular));