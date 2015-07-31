import merge from 'lodash/object/merge';

const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s fadeLeftBigIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s fadeLeftBigOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-fade-left-big';
const fadeLeftBig = {creator, classname}

export {fadeLeftBig};
