import merge from 'lodash/object/merge';

const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s fadeRightBigIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s fadeRightBigOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-fade-right-big';
const fadeRightBig = {creator, classname}

export {fadeRightBig};
