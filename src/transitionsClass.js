(function (angular, TLM) {
  "use strict";

  angular.module('fx.transitions.create', ['fx.transitions.assist', 'fx.animations.assist'])

  .factory('SlideTransition', ['TransAssist', 'Assist', function (TransAssist, Assist) {
    var slide;

    return function (effect) {

      if (effect.from) {
        this.enter = function (el, done) {
          var customs;
          cssMixin(el);

          customs = Assist.parseClassList(el, true);

          effect.from.ease = customs.ease.easeInOut;
          effect.duration = customs.speed;

          TransAssist.addTimer(el, effect.duration, done);

          slide = new TLM();

          slide.from(el, effect.duration, effect.from);
          return function (cancel) {
            if(cancel) {
              TransAssist.removeTimer(el);
            }
          };
        };

      } else if (!effect.from && effect.to) {
        this.leave = function (el, done) {
          var customs;
          cssMixin(el);

          customs = Assist.parseClassList(el, true);

          effect.to.ease = customs.ease.easeInOut;
          effect.duration = customs.speed;
          TransAssist.addTimer(el, effect.duration, done);


          slide = new TLM();

          slide.to(el, effect.duration, effect.to);

          return function (cancel) {
            if(cancel) {
              TransAssist.removeTimer(el);
            }
          };
          // el.css('position', 'absolute');
          // el.css('z-index', '9999');

          // slide = new TLM({onComplete: finish(done)});

          // slide.from(el, effect.duration, effect.from)
          //      .to(el, effect.duration, effect.to);

          // el.css('z-index', '9999');
          // var page = new TLM({onComplete: finish(done)});
          // page.to(el, {transform: 'rotateZ(0deg)'})
          //     .to(el, 0.2, {transform: 'rotateZ(10deg)'})
          //     .to(el, 0.2, {transform: 'rotateZ(17deg)'})
          //     .to(el, 0.4, {transform: 'rotateZ(15deg)'})
          //     .to(el, 0.2, {transform: 'translateY(100%) rotateZ(17deg)'});
        };
      }
    };
  }])
  .factory('RotationTransition', ['TransAssist', 'Assist','$compile', function (TransAssist, Assist, $compile) {
    var rotate;
    return function (effect) {
      this[effect.when] = function (el, done) {
        var customs, wrapper;

        wrapper = $compile('<div></div>')(el.scope());

        cssMixin(el);

        css3D(wrapper, el);

        angular.element(wrapper).append(el[0].outerHTML);
        console.log(wrapper, el);
        customs = Assist.parseClassList(el, true);

        effect.from.ease = customs.ease.easeOut;
        effect.duration = customs.duration;
        TransAssist.addTimer(el, effect.duration, done);
        rotate = new TLM();

        rotate.from(el, 1, effect.from)
              .to(el, 1, effect.to);

        return function (cancel) {
          if(cancel) {
            TransAssist.removeTimer(el);
          }
        };
      };
    };
  }]);

  function cssMixin (el, z) {
    el.css('position', 'absolute');
    z ? z === 'leave' ?
      el.css('z-index', '9999') : el.css('z-index', '8888') : function(){};
  }

  function css3D (parent, view) {
    var preservve = {
      'position': 'relative',
      width: '100%',
      height: '100%',
      '-webkit-perspective': '500px',
      '-moz-perspective': '500px',
      '-o-perspective': '500px',
      'perspective': '500px',
    };

    var trans = {
      overflow: 'hidden',
      '-webkit-backface-visibility': 'hidden',
      '-moz-backface-visibility': 'hidden',
      'backface-visibility': 'hidden',
      '-webkit-transform': 'translate3d(0, 0, 0)',
      '-moz-transform': 'translate3d(0, 0, 0)',
      'transform': 'translate3d(0, 0, 0),',
     ' -webkit-transform-style': 'preserve-3d',
      '-moz-transform-style': 'preserve-3d',
      'transform-style': 'preserve-3d'
    };
    parent.css(preservve);
    view.css(trans);
  }

  function calcTime  (duration, perc) {
    console.log(duration);
    return (duration * (perc/100));
  }

}(angular, TimelineMax));