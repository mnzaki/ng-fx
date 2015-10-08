import {bounces} from './bounce/bounce';
import {fades} from './fade/fade';
import {zooms} from './zoom/zoom';
import {lightSpeeds} from './lightSpeed/lightSpeed';

const elementModule = angular.module('ngFx.animations.element', []);

/**
 * register all animations to angular using
 * the `module.animation()` method
 */
[bounces, fades, zooms, lightSpeeds].forEach(animation => {
  animation.forEach(variant => {
    elementModule.animation(
      variant.classname,
      variant.creator
    );
  });
});

const element = elementModule.name;

export {element};
