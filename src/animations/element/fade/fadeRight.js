import merge from 'lodash/object/merge';

const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s fadeRightIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s fadeRightOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-fade-right';
const fadeRight = {creator, classname}

export {fadeRight};
