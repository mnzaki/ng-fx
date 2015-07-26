import {fxHelp} from './fxHelp';
import {fxMakeAnimation} from './fxMakeAnimation';

const config = ($animateProvider)=> {
  $animateProvider.classNameFilter(/fx-/);
};

config.$inject = ['$animateProvider'];

export const utils = angular.module('ngFx.utils', [])
  .factory('$$fx', fxHelp)
  .factory('$fxMakeAnimation', fxMakeAnimation)
  .name;
