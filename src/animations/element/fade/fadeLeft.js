import merge from 'lodash/object/merge';

const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s fadeLeftIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s fadeLeftOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-fade-left';
const fadeLeft = {creator, classname}

export {fadeLeft};
