/*
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Using Angular's '.animate', all fade animations are created with javaScript.

    @BounceAnimation
      Constructor function that returns a new animation object that has all
      required methods for ngAnimate ex: this.enter(), this.leave(), etc

    @effect
      The actual animation that will be applied to the element, staggered
       first: the style to applied to the element 1/4 through the animtion
       mid: style to be applied to to the element 2/4 through the animation
       third: style to be applied to the element 3/4 through the animation
       end: style to be applied to the element when it's complete
       animation: the name of the animtion for the eventing system
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

*/

(function(){
  'use strict';
  
  angular.module('fx.animations.attentions', ['fx.animations.assist'])
  .animation('.fx-tada', ['Assist', function(Assist){
    return {
      addClass: function(element, classname, done){

        var effect = [
          // 0
          { time: 0.01, effect: { transform: 'scale3d(1,1,1)' } },
          // 10
          { time: 0.1, effect: { transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)' } },
          // 20
          { time: 0.1, effect: { transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)' } },
          // 30
          { time: 0.1, effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)' } },
          // 40
          { time: 0.1, effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)' } },
          // 50
          { time: 0.1, effect: { transform: 'sscale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)' } },
          // 60
          { time: 0.1, effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)' } },
          // 70
          { time: 0.1, effect: { transform: 'sscale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)' } },
          // 80
          { time: 0.1, effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)' } },
          // 90
          { time: 0.01, effect: { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)' } },
          // 100
          { time: 0.01, effect: { transform: ' scale3d(1, 1, 1)' } }
        ];
        
        var options = Assist.parseClassList(element);
        options.motion = 'addClass';
        options.animation = 'tada';
        // options.stagger = true;
        var eachTime = (options.duration / effect.length);
        console.log(eachTime);
        Assist.addTimer(options, element, done);
        
        var tada = new TimelineMax();
        //
        angular.forEach(effect, function(step, pos){
          step.easing = options.ease.easeInOut;
          if (pos !== 0 || effect[pos+1]) {
            step.time = eachTime;
          }
          tada = tada.to(element, step.time, step.effect);
        });
        
        // TweenMax.set(element, { opacity: '0' });
        // TweenMax.to(element, 3, { opacity: '1' });
      }
    };
  }]);
}());
