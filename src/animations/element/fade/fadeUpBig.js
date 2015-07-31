import merge from 'lodash/object/merge';

const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s fadeUpBigIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s fadeUpBigOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-fade-up-big';
const fadeUpBig = {creator, classname}

export {fadeUpBig};
