const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s bounceUpIn',
  };

  let leaveAnimation = {
    keyframeStyle: '.1s bounceUpOut',
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-bounce-up';
const bounceUp = {creator, classname};
export {bounceUp};
