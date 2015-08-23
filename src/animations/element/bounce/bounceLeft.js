const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s bounceLeftIn',
  };

  let leaveAnimation = {
    keyframeStyle: '.1s bounceLeftOut',
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-bounce-left';
const bounceLeft = {creator, classname};
export {bounceLeft};
