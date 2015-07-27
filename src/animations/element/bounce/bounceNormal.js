const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s bounceNormalIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s bounceNormalOut'
  };

  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-bounce-normal';
const bounceNormal = {creator, classname}

export {bounceNormal};
