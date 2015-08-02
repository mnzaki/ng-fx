import {view} from './view';
import {element} from './element';

const animations = angular.module('ngFx.animations', [
  element,
  view
])

.name;

export {animations};
