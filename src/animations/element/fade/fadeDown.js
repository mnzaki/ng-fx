import merge from 'lodash/object/merge';

const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s fadeDownIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s fadeDownOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-fade-down';
const fadeDown = {creator, classname}

export {fadeDown};
