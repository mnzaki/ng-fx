
angular.module('fx.animations.tada', ['fx.animations.assist'])
  .animation('.fx-tada', ['Assist', function(Assist){
    return {
      animate: function(element, classname, done){
        var effect = [
          // 0
          { effect: { transform: 'scale3d(1,1,1)' } },
          // 10
          { effect: { transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)' } },
          // 20
          { effect: { transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)' } },
          // 30
          { effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)' } },
          // 40
          { effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)' } },
          // 50
          { effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)' } },
          // 60
          { effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)' } },
          // 70
          { effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)' } },
          // 80
          { effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)' } },
          // 90
          { effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)' } },
          // 100
          { effect: { transform: ' scale3d(1, 1, 1)' } }
        ];

        var options = Assist.parseClassList(element);
        options.motion = 'addClass';
        options.animation = 'tada';

        var eachTime = (options.duration / effect.length);

        Assist.addTimer(options, element, done);

        var tada = new TimelineMax();
        angular.forEach(effect, function(step, pos){
          step.easing = options.ease.easeInOut;

          tada = tada.to(element, eachTime, step.effect);
        });
      }
    };
  }]);

