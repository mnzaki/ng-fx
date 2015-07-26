// import './bounce.styl';

const bounceNormal = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s bounceNormalIn linear'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s bounceNormalOut linear'
  };

  return $fxMakeAnimation(enterAnimation, leaveAnimation);
};

const animationClass = '.fx-bounce-normal';

bounceNormal.$inject = ['$fxMakeAnimation'];
export {bounceNormal, animationClass};
