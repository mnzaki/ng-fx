(function (angular) {
  "use strict";
  angular.module('fx.events.flip', ['fx.animations.create'])

  .animation('.fx-flipY', ['Flip3d' ,function (Flip3d){
    var effect = {
      transform: {transform:'rotate3d(0,1,0,180deg)'},
      reset: {transform:'rotateY(0)'},
      axis: 'Y',
      duration: 0.8
    };
    return new Flip3d(effect);
  }])

  .animation('.fx-flipX', ['Flip3d' ,function (Flip3d){
    var effect = {
      transform: {transform:'rotate3d(1,0,0,180deg)'},
      reset: {transform:'rotateX(0)'},
      axis: 'X',
      duration: 0.8
    };
    return new Flip3d(effect);
  }])

  .animation('.fx-flipZ', ['Flip3d' ,function (Flip3d){
    var effect = {
      transform: {transform:'rotate3d(0,0,1,180deg)'},
      reset: {transform:'rotateZ(0)'},
      axis: 'Z',
      duration: 0.8
    };
    return new Flip3d(effect);
  }]);
}(angular));