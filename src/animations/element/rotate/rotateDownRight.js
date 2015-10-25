const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s rotateDownRightIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s rotateDownRightOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-rotate-down-right';
const rotateDownRight = {creator, classname};

export {rotateDownRight};
