const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s rotateUpRightIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s rotateUpRightOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-rotate-up-right';
const rotateUpRight = {creator, classname};

export {rotateUpRight};
