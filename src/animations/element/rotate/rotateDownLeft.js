const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s rotateDownLeftIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s rotateDownLeftOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-rotate-down-left';
const rotateDownLeft = {creator, classname};

export {rotateDownLeft};
