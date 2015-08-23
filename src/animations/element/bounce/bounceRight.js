const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s bounceRightIn',
  };

  let leaveAnimation = {
    keyframeStyle: '.1s bounceRightOut',
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-bounce-right';
const bounceRight = {creator, classname};
export {bounceRight};
