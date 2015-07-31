import merge from 'lodash/object/merge';

const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s fadeUpIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s fadeUpOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-fade-up';
const fadeUp = {creator, classname}

export {fadeUp};
