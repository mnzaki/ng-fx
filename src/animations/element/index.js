import {bounceNormal, animationClass} from './bounce/bounce';

export const element = angular.module('ngFx.animations.element', [])
  .animation(animationClass, bounceNormal)
  .name;
