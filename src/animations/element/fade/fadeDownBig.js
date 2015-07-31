import merge from 'lodash/object/merge';

const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s fadeDownBigIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s fadeDownBigOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-fade-down-big';
const fadeDownBig = {creator, classname}

export {fadeDownBig};
