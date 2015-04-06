
angular.module('fx.animations.pulse', ['fx.animations.assist'])
  .animation('.fx-pulse', ['Assist', function(Assist){
    return {
      animate: function(element, className, to, from, done){
        var effect = [

          { effect: { transform: 'scale3d(1,1,1)' }},
          { effect: { transform: 'scale3d(1.05, 1.05, 1.05)' }},
          { effect: { transform: 'scale3d(1, 1, 1)' }}

        ];

        var options = Assist.parseClassList(element);
        options.motion = 'addClass';
        options.animation = 'pulse';

        var eachTime = (options.duration / effect.length);

        Assist.addTimer(options, element, done);

        var pulse = new TimelineMax();
        angular.forEach(effect, function(step, pos){
          step.easing = options.ease.easeInOut;

          pulse = pulse.to(element, eachTime, step.effect);
        });
      }
    };
  }]);

