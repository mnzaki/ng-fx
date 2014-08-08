(function  (angular, TLM) {
  "use strict";

  angular.module('fx.transitions.specials', [])

  .animation('.fx-fall-out', function () {
    // var effect = {
    //   from: {}
    // };


    return {
      leave: function (el, done) {
        el.css('z-index', '9999');
        var page = new TLM({onComplete: done});
        page.to(el, {transform: 'rotateZ(0deg)'})
            .to(el, 0.1, {transform: 'rotateZ(10deg)'})
            .to(el, 0.3, {transform: 'rotateZ(17deg)'})
            .to(el, 0.5, {transform: 'rotateZ(15deg)'})
            .to(el, 0.2, {transform: 'translateY(100%) rotateZ(17deg)'});
      }
    };
    // return new SlideTransition(effect);
  });
}(angular, TimelineMax));