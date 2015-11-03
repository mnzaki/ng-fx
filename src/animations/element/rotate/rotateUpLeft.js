const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s rotateUpLeftIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s rotateUpLeftOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-rotate-up-left';
const rotateUpLeft = {creator, classname};

export {rotateUpLeft};
