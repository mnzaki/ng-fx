const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s demoNormalIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s demoNormalOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-demo';
const demo = {creator, classname};

export {demo};
