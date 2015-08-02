const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s bounceDownIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s bounceDownOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-bounce-down';
const bounceDown = {creator, classname}

export {bounceDown};
