import merge from 'lodash/object/merge';

const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s fadeNormalIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s fadeNormalOut'
  };

  let addClassAnimation = merge({}, leaveAnimation);

  let removeClassAnimation = merge({}, enterAnimation);

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation,
    null,
    addClassAnimation,
    removeClassAnimation,
    true
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-fade-normal';
const fadeNormal = {creator, classname}

export {fadeNormal};
